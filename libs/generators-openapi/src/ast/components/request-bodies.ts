import { RequestBodiesInfoAst, RequestBodyAst, RequestBodyOrRefAst } from '../../types/ast';
import { ReferenceObject } from '../../types/openapi';
import { createAstFactory } from './shared';
import { OpenAPIV3 } from 'openapi-types';

export function createRequestBodiesInfoAst(
  input: Record<string, OpenAPIV3.RequestBodyObject | ReferenceObject>
): RequestBodiesInfoAst {
  const entries = Object.entries(input).map(([name, value]): [string, RequestBodyOrRefAst] => [
    name,
    createRequestBodyAst(value)
  ]);

  return {
    asList: entries.map(entry => entry[1]),
    asMap: new Map(entries)
  };
}

export const createRequestBodyAst = createAstFactory(
  (input: OpenAPIV3.RequestBodyObject): RequestBodyAst => ({
    ...input,
    astType: 'requestBody'
  })
);
