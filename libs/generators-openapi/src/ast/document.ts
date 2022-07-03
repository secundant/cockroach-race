import { DocumentAst } from '../types/ast';
import { createParametersInfoAst } from './components/parameters';
import { createRequestBodiesInfoAst } from './components/request-bodies';
import { createResponsesInfoAst } from './components/responses';
import { createSchemasInfoAst } from './components/schema';
import { createEndpointsInfoAst } from './endpoints';
import { OpenAPIV3 } from 'openapi-types';

export function createDocumentAst(original: OpenAPIV3.Document): DocumentAst {
  const { components: { schemas, parameters, responses, requestBodies } = {}, paths } = original;
  const components = {
    schemas: createSchemasInfoAst(schemas ?? {}),
    parameters: createParametersInfoAst(parameters ?? {}),
    responses: createResponsesInfoAst(responses ?? {}),
    requestBodies: createRequestBodiesInfoAst(requestBodies ?? {})
  };

  return {
    original,
    endpoints: createEndpointsInfoAst(paths, components),
    components
  };
}
