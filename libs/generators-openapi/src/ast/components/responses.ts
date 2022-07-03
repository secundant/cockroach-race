import { ResponseAst, ResponseOrRefAst, ResponsesInfoAst } from '../../types/ast';
import { ReferenceObject } from '../../types/openapi';
import { createAstFactory } from './shared';
import { OpenAPIV3 } from 'openapi-types';

export function createResponsesInfoAst(
  input: Record<string, OpenAPIV3.ResponseObject | ReferenceObject>
): ResponsesInfoAst {
  const entries = Object.entries(input).map(([name, value]): [string, ResponseOrRefAst] => [
    name,
    createResponseAst(value)
  ]);

  return {
    asList: entries.map(entry => entry[1]),
    asMap: new Map(entries)
  };
}

export const createResponseAst = createAstFactory(
  (input: OpenAPIV3.ResponseObject): ResponseAst => ({
    ...input,
    astType: 'response'
  })
);
