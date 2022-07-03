import {
  ArraySchemaAst,
  EnumSchemaAst,
  ObjectSchemaAst,
  PrimitiveSchemaAst,
  SchemaAst,
  SchemaOrRefAst,
  SchemasInfoAst
} from '../../types/ast';
import {
  ArraySchema,
  EnumSchema,
  ObjectSchema,
  PrimitiveSchema,
  Schema,
  SchemaOrReference
} from '../../types/openapi';
import { createAstFactory } from './shared';
import { OpenAPIV3 } from 'openapi-types';

export function createSchemasInfoAst(input: Record<string, SchemaOrReference>): SchemasInfoAst {
  const entries = Object.entries(input).map(([name, schema]): [string, SchemaOrRefAst] => [
    name,
    createSchemaAst(schema)
  ]);

  return {
    asList: entries.map(entry => entry[1]),
    asMap: new Map(entries)
  };
}

export const createSchemaAst = createAstFactory((schema: Schema) =>
  resolveDynamics(createTypedAst(schema))
);

function resolveDynamics<T extends SchemaAst>(ast: T): T {
  const includedMerged = mergedNames.filter(name => Boolean(ast[name]));

  if (includedMerged.length) {
    ast.merged = includedMerged.map(type => ({
      type,
      value: ast[type]!.map(createSchemaAst)
    }));
  }
  return ast;
}
function createTypedAst(schema: Schema): SchemaAst {
  if (isArraySchema(schema)) {
    return schemaFactory.array(schema);
  }
  if (isEnumSchema(schema)) {
    return schemaFactory.enum(schema);
  }
  switch (schema.type) {
    case 'object':
      return schemaFactory.object(schema as ObjectSchema);
    case 'string':
    case 'number':
    case 'boolean':
    case 'integer':
      return schemaFactory.primitive(schema as PrimitiveSchema);
    default:
      return {
        astType: 'unknown',
        ...schema
      };
  }
}

const schemaFactory = {
  primitive(schema: PrimitiveSchema): PrimitiveSchemaAst {
    return {
      astType: 'primitive',
      ...schema
    };
  },
  object(schema: ObjectSchema): ObjectSchemaAst {
    return {
      astType: 'object',
      indexed: schema.additionalProperties
        ? schema.additionalProperties === true
          ? 'unknown'
          : createSchemaAst(schema.additionalProperties)
        : false,
      propertiesAst: Object.entries(schema.properties ?? {}).map(([name, value]) => ({
        name,
        value: createSchemaAst({
          ...value,
          nullable: !isRequired(value as Schema, name, schema)
        })
      })),
      ...schema
    };
  },
  array(schema: ArraySchema): ArraySchemaAst {
    return {
      astType: 'array',
      itemsAst: schema.items ? createSchemaAst(schema.items) : null,
      ...schema
    };
  },
  enum(schema: EnumSchema): EnumSchemaAst {
    return {
      astType: 'enum',
      entries: schema.enum.map((value, index) => ({
        name: schema['x-enumNames'] ? schema['x-enumNames'][index] : value?.toString(),
        value
      })),
      ...schema
    };
  }
};

/**
 * TODO Separate nullable and required
 */
const isRequired = ({ nullable }: Schema, name: string, { required }: ObjectSchema) => {
  const requiredByParent = required ? required.includes(name) : false;

  return !nullable && requiredByParent;
};
const isArraySchema = (schema: Schema): schema is ArraySchema =>
  Boolean(schema.type === 'array' || Object.hasOwn(schema, 'items'));

const isEnumSchema = (schema: OpenAPIV3.NonArraySchemaObject): schema is EnumSchema =>
  Boolean(schema.enum) && Array.isArray(schema.enum) && schema.enum.length > 0;

const mergedNames = ['oneOf', 'anyOf', 'allOf'] as const;
