import { ArraySchema, EnumSchema, ObjectSchema, PrimitiveSchema, ValueSchema } from './openapi';
import { OpenAPIV3 } from 'openapi-types';

/**
 * Prepared OpenApi structures
 */

/**
 * Document
 */

export interface DocumentAst {
  original: OpenAPIV3.Document;
  endpoints: EndpointsInfoAst;
  components: ComponentsInfoAst;
}

/**
 * Components
 */

export interface ComponentsInfoAst {
  schemas: SchemasInfoAst;
  responses: ResponsesInfoAst;
  parameters: ParametersInfoAst;
  requestBodies: RequestBodiesInfoAst;
}

// Components - Request body

export interface RequestBodiesInfoAst {
  asList: RequestBodyOrRefAst[];
  asMap: Map<string, RequestBodyOrRefAst>;
}

export type RequestBodyOrRefAst = RequestBodyAst | ReferenceAst;

export interface RequestBodyAst extends BaseSchemaAst<'requestBody'>, OpenAPIV3.RequestBodyObject {}

// Components - Response

export interface ResponsesInfoAst {
  asList: ResponseOrRefAst[];
  asMap: Map<string, ResponseOrRefAst>;
}

export type ResponseOrRefAst = ResponseAst | ReferenceAst;

export interface ResponseAst extends BaseSchemaAst<'response'>, OpenAPIV3.ResponseObject {}

/**
 * Endpoints
 */

export interface EndpointsInfoAst {
  asList: EndpointAst[];
  asDeepMap: Map<string, Map<OpenAPIV3.HttpMethods, EndpointAst>>;
  asMap: Map<string, EndpointAst[]>;
}

export interface EndpointAst extends Omit<OpenAPIV3.OperationObject, 'parameters'> {
  path: string;
  method: OpenAPIV3.HttpMethods;
  parameters: EndpointParametersAst;
}

export interface EndpointParametersAst {
  asList: ParameterAst[];
  asMap: Map<string, ParameterAst>;
}

/**
 * Components - Parameters
 */

export interface ParametersInfoAst {
  asTypesMap: Map<ParameterType, ParameterOrRefAst[]>;
  asList: ParameterOrRefAst[];
  asMap: Map<string, ParameterOrRefAst>;
  asResolvedMap: Map<string, ParameterAst>;
  required: string[];
}

export type ParameterOrRefAst = ParameterAst | ReferenceAst;

export interface ParameterAst extends BaseSchemaAst<'parameter'>, OpenAPIV3.ParameterObject {
  type: ParameterType;
}

export type ParameterType = 'query' | 'path' | 'header' | 'cookie';

/**
 * Components - schemas
 */

export interface SchemasInfoAst {
  asList: SchemaOrRefAst[];
  asMap: Map<string, SchemaOrRefAst>;
}

export type SchemaOrRefAst = SchemaAst | ReferenceAst;

export type SchemaAst =
  | EnumSchemaAst
  | ArraySchemaAst
  | ObjectSchemaAst
  | PrimitiveSchemaAst
  | UnknownSchemaAst;

export interface ReferenceAst extends BaseSchemaAst<'reference'> {
  type: keyof OpenAPIV3.ComponentsObject;
  value: string;
  nullable?: boolean;
}

export interface UnknownSchemaAst extends BaseSchemaAst<'unknown'>, ValueSchema {}

export interface PrimitiveSchemaAst extends BaseSchemaAst<'primitive'>, PrimitiveSchema {}

export interface ObjectSchemaAst extends BaseSchemaAst<'object'>, ObjectSchema {
  indexed?: false | 'unknown' | SchemaOrRefAst;
  propertiesAst: ObjectPropertyAst[];
}

export type ObjectPropertyAst = NamedEntry<SchemaOrRefAst>;

export interface ArraySchemaAst extends BaseSchemaAst<'array'>, ArraySchema {
  itemsAst: SchemaOrRefAst | null;
}

export interface EnumSchemaAst extends BaseSchemaAst<'enum'>, EnumSchema {
  entries: EnumEntry[];
}

export type EnumEntry = NamedEntry<string | number>;

export interface MergedAst {
  type: 'oneOf' | 'anyOf' | 'allOf';
  value: SchemaOrRefAst[];
}

export interface BaseSchemaAst<Type> {
  astType: Type;
  merged?: MergedAst[];
}

export interface NamedEntry<T> {
  name: string;
  value: T;
}
