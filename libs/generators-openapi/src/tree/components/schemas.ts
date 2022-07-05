import { Configuration } from '../../configuration';
import { normalizePascalCase } from '../../utils/normalize-string';
import { createReferenceFactory, isReference } from '../reference';
import {
  EnumSchemaProperty,
  ObjectPropertyNode,
  ObjectSchemaIndexType,
  OpenapiEnumObject,
  SchemaCombinedInfo,
  SchemaCombinedRecord,
  SchemaCombinedType,
  SchemaNode
} from '../types';
import { OpenAPIV3 } from 'openapi-types';

export function createTypedSchemaNode(
  original: OpenAPIV3.SchemaObject,
  configuration: Configuration
): SchemaNode {
  const combined = createSchemaCombinedInfo(original, configuration);
  const common = {
    nodeType: 'schema' as const,
    original: original as any,
    combined
  };

  if (isArraySchema(original)) {
    return {
      ...common,
      schemaType: 'array',
      value: createAnySchemaNode(original.items, configuration)
    };
  }
  if (isEnumSchema(original)) {
    return {
      ...common,
      schemaType: 'enum',
      properties: original.enum.map((value, index) => createEnumProperty(value, index, original))
    };
  }
  if (original.type === 'object') {
    return {
      ...common,
      schemaType: 'object',
      properties: Object.entries(original.properties ?? {}).map(([name, value]) =>
        createObjectPropertyNode(name, value, original, configuration)
      ),
      index: createObjectIndexType(original.additionalProperties, configuration)
    };
  }
  return {
    ...common,
    schemaType: original.type ?? 'unknown'
  };
}

export const createAnySchemaNode = createReferenceFactory<
  'schemas',
  OpenAPIV3.SchemaObject,
  SchemaNode
>(createTypedSchemaNode);

// == combined ==

function createSchemaCombinedInfo(
  original: OpenAPIV3.SchemaObject,
  configuration: Configuration
): SchemaCombinedInfo {
  const included = combinedFields.filter(
    type => Object.hasOwn(original, type) && original[type]!.length > 0
  );

  return {
    included,
    empty: included.length > 0,
    value: Object.fromEntries(
      combinedFields.map(type => [
        type,
        included.includes(type)
          ? original[type]!.map(combined => createAnySchemaNode(combined, configuration))
          : []
      ])
    ) as SchemaCombinedRecord
  };
}

// == object ==

function createObjectPropertyNode(
  name: string,
  value: OpenAPIV3.ReferenceObject | OpenAPIV3.SchemaObject,
  parent: OpenAPIV3.NonArraySchemaObject,
  configuration: Configuration
): ObjectPropertyNode {
  return {
    nodeType: 'property',
    name,
    value: createAnySchemaNode(value, configuration),
    nullable: isReference(value) ? false : Boolean(value.nullable),
    optional: parent.required?.includes(name) ?? true
  };
}

const createObjectIndexType = (
  value: OpenAPIV3.NonArraySchemaObject['additionalProperties'],
  configuration: Configuration
): ObjectSchemaIndexType | null =>
  value ? (value === true ? 'unknown' : createAnySchemaNode(value, configuration)) : null;

// == enum ==

const createEnumProperty = (
  value: string | number,
  index: number,
  schema: OpenapiEnumObject
): EnumSchemaProperty => ({
  name: getEnumPropertyName(schema['x-enumNames'] ? schema['x-enumNames'][index] : value),
  value: getEnumPropertyValue(value)
});

const getEnumPropertyValue = (value: string | number) =>
  typeof value === 'string' ? `"${value}"` : value;

const getEnumPropertyName = (value: string | number) =>
  normalizePascalCase(typeof value === 'string' ? value : `E_${value}`);

// == common ==

const isArraySchema = (schema: OpenAPIV3.SchemaObject): schema is OpenAPIV3.ArraySchemaObject =>
  schema.type === 'array';

const isEnumSchema = (schema: OpenAPIV3.NonArraySchemaObject): schema is OpenapiEnumObject =>
  Boolean(schema.enum) && Array.isArray(schema.enum) && schema.enum.length > 0;

const combinedFields: SchemaCombinedType[] = ['anyOf', 'allOf', 'oneOf'];
