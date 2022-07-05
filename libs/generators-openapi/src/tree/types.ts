import { OpenAPIV3 } from 'openapi-types';

/**
 * Aggregation
 */

export type AnyNode = AnySchemaNode | AnyParameterNode | DocumentParameterNode | DocumentSchemaNode;

export interface ComponentTypeToNode {
  schemas: SchemaNode;
  responses: null;
  parameters: ParameterNode;
  requestBodies: null;
}

/**
 * Document
 */

export interface DocumentNode extends TreeNode<'document'> {
  original: OpenAPIV3.Document;
  schemas: DocumentComponentsMap<DocumentSchemaNode>;
  parameters: DocumentComponentsMap<DocumentParameterNode>;
}

export type DocumentComponentsMap<T extends DocumentComponentNode<any, any>> = Map<string, T>;

export type DocumentParameterNode = DocumentComponentNode<'named-parameter', AnyParameterNode>;
export type DocumentSchemaNode = DocumentComponentNode<'named-schema', AnySchemaNode>;

export interface DocumentComponentNode<Name extends string, Value> extends TreeNode<Name> {
  name: string;
  value: Value;
}

/**
 * Parameters
 */

export type AnyParameterNode = ParameterNode | ReferenceParameterNode;
export type ReferenceParameterNode = ReferenceNode<'parameters'>;

export interface ParameterNode extends TreeNode<'parameter'> {
  original: OpenAPIV3.ParameterObject;
  name: string;
  type: ParameterType;
}

/**
 * Schemas
 */

export type AnySchemaNode = SchemaNode | ReferenceSchemaNode;
export type SchemaNode =
  | EnumSchemaNode
  | ArraySchemaNode
  | ObjectSchemaNode
  | PrimitiveSchemaNode
  | UnknownSchemaNode;
export type ReferenceSchemaNode = ReferenceNode<'schemas'>;

// == unknown ==

export type UnknownSchemaNode = BaseSchemaNode<'unknown', OpenAPIV3.NonArraySchemaObject>;

// == primitive ==

export type PrimitiveSchemaNode = BaseSchemaNode<
  PrimitiveSchemaType,
  OpenAPIV3.NonArraySchemaObject
>;

// == object ==

export interface ObjectSchemaNode extends BaseSchemaNode<'object', OpenAPIV3.NonArraySchemaObject> {
  properties: ObjectPropertyNode[];
  index: ObjectSchemaIndexType | null;
}

export type ObjectSchemaIndexType = AnySchemaNode | 'unknown';

export interface ObjectPropertyNode extends TreeNode<'property'> {
  name: string;
  value: AnySchemaNode;
  /**
   * foo: number | null;
   */
  nullable: boolean;
  /**
   * foo?: number;
   */
  optional: boolean;
}

// == array ==

export interface ArraySchemaNode extends BaseSchemaNode<'array', OpenAPIV3.ArraySchemaObject> {
  value: AnySchemaNode;
}

// == enum ==

export interface EnumSchemaNode extends BaseSchemaNode<'enum', OpenapiEnumObject> {
  properties: EnumSchemaProperty[];
}

export interface EnumSchemaProperty {
  name: string;
  value: string | number;
}

// == base ==

export interface BaseSchemaNode<Type extends SchemaType, Original extends OpenAPIV3.SchemaObject>
  extends TreeNode<'schema'> {
  schemaType: Type;
  original: Original;
  combined: SchemaCombinedInfo;
}

export interface SchemaCombinedInfo {
  included: SchemaCombinedType[];
  empty: boolean;
  value: SchemaCombinedRecord;
}

export type SchemaCombinedRecord = {
  [Type in SchemaCombinedType]: AnySchemaNode[];
};

/**
 * Core and shared
 */

export interface ReferenceNode<Type extends ComponentType = ComponentType> extends TreeNode<'ref'> {
  type: Type;
  name: string;
  resolved?: ComponentTypeToNode[Type];
  original: OpenAPIV3.ReferenceObject;
}

export interface TreeNode<Type> {
  nodeType: Type;
}

export type ParameterType = 'query' | 'path' | 'header' | 'cookie';

export type SchemaCombinedType = 'allOf' | 'anyOf' | 'oneOf';

export type SchemaType = PrimitiveSchemaType | 'enum' | 'array' | 'unknown';

export type PrimitiveSchemaType = 'object' | 'string' | 'number' | 'integer' | 'boolean';

export type ComponentType = Exclude<
  keyof Required<OpenAPIV3.ComponentsObject>,
  'securitySchemes' | 'headers' | 'callbacks' | 'links' | 'examples'
>;

/**
 * Openapi extensions
 */

export interface OpenapiEnumObject extends OpenAPIV3.NonArraySchemaObject {
  enum: Array<string | number>;
  'x-enumNames'?: string[];
}
