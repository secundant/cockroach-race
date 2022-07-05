import { Configuration } from '../configuration';
import { mapObjectToEntries } from '../utils/map-object';
import { createAnySchemaNode } from './components/schemas';
import { createReferenceFactory } from './reference';
import {
  AnyNode,
  DocumentComponentNode,
  DocumentComponentsMap,
  DocumentNode,
  ParameterNode,
  ParameterType
} from './types';
import { OpenAPIV3 } from 'openapi-types';

export function createDocumentNode(
  original: OpenAPIV3.Document,
  configuration: Configuration
): DocumentNode {
  return {
    nodeType: 'document',
    original,
    schemas: createSchemasMap(original.components?.schemas, configuration),
    parameters: createParametersMap(original.components?.parameters, configuration)
  };
}

function createDocumentComponentsMapFactory<NodeType extends string, Value, Node extends AnyNode>(
  nodeType: NodeType,
  nodeFactory: (value: Value, configuration: Configuration) => Node,
  resolveName: (name: string, configuration: Configuration) => string
) {
  return function componentsMapFactory(
    record: Record<string, Value> = {},
    configuration: Configuration
  ): DocumentComponentsMap<DocumentComponentNode<NodeType, Node>> {
    const components = new Map(
      mapObjectToEntries(record, (name, value) => ({
        nodeType,
        name: resolveName(name, configuration),
        value: nodeFactory(value, configuration)
      }))
    );

    /**
     * Resolves all references. Required for merge specific rules (ex. nullable)
     * { foo: { $ref: bar }, bar: { $ref: baz }, baz: { ... } }
     * becomes
     * { foo: { ..., resolved: baz }, bar: { ..., resolved: baz }, ... }
     */
    const resolveNext = (node: Node): Node => {
      if (node.nodeType === 'ref') {
        if (node.resolved) {
          return node.resolved as any;
        }
        if (components.has(node.name)) {
          node.resolved = resolveNext(components.get(node.name) as any) as any;
          return node.resolved as any;
        }
        throw new Error(`Not found "${node.name}" reference at "${node.type}"`);
      }
      return node;
    };

    for (const { value } of components.values()) {
      resolveNext(value);
    }

    return components;
  };
}

const createSchemasMap = createDocumentComponentsMapFactory(
  'named-schema',
  createAnySchemaNode,
  (name, configuration) => configuration.resolve.schemaName(name)
);
const createParametersMap = createDocumentComponentsMapFactory(
  'named-parameter',
  createReferenceFactory<'parameters', OpenAPIV3.ParameterObject, ParameterNode>(
    (original: OpenAPIV3.ParameterObject) => ({
      nodeType: 'parameter',
      name: original.name,
      type: original.in.trim().toLowerCase() as ParameterType,
      original
    })
  ),
  (name, configuration) => configuration.resolve.schemaName(name)
);
