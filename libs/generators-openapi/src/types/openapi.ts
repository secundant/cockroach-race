import { OpenAPIV3 } from 'openapi-types';

export type ParameterObject = OpenAPIV3.ParameterObject;

export type ReferenceObject = OpenAPIV3.ReferenceObject;
export type ArraySchema = OpenAPIV3.ArraySchemaObject;
export type ValueSchema = OpenAPIV3.NonArraySchemaObject;
export type Schema = ValueSchema | ArraySchema;
export type SchemaOrReference = Schema | ReferenceObject;

export interface ObjectSchema extends ValueSchema {
  type: 'object';
}

export interface PrimitiveSchema extends ValueSchema {
  type: 'string' | 'number' | 'integer' | 'boolean';
}

export interface EnumSchema extends ValueSchema {
  type: 'string' | 'number' | 'integer';
  enum: Array<string | number>;
  'x-enumNames'?: string[];
}
