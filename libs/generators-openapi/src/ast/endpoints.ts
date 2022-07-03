import { groupBy } from '../shared/core-utils';
import { ComponentsInfoAst, EndpointAst, EndpointsInfoAst } from '../types/ast';
import { createParameterAst } from './components/parameters';
import { OpenAPIV3 } from 'openapi-types';

export function createEndpointsInfoAst(
  input: OpenAPIV3.PathsObject,
  components: ComponentsInfoAst
): EndpointsInfoAst {
  const asList = Object.entries(input)
    .filter((entry): entry is [string, OpenAPIV3.PathItemObject] => Boolean(entry[1]))
    .flatMap(([path, pathItem]) =>
      METHODS_LIST.filter(method => Boolean(pathItem[method])).map(method =>
        createEndpointAst(path, method, pathItem, components)
      )
    );

  return {
    asList,
    asMap: new Map(Object.entries(groupBy(asList, endpoint => endpoint.path))),
    asDeepMap: new Map(
      Object.entries(groupBy(asList, endpoint => endpoint.path)).map(([path, endpoints]) => [
        path,
        new Map(endpoints.map(endpoint => [endpoint.method, endpoint]))
      ])
    )
  };
}

export function createEndpointAst(
  path: string,
  method: OpenAPIV3.HttpMethods,
  parent: OpenAPIV3.PathItemObject,
  components: ComponentsInfoAst
): EndpointAst {
  const operation = parent[method]!;
  const parameters = [...(parent.parameters ?? []), ...(operation.parameters ?? [])]
    .map(createParameterAst)
    .map(parameterOrRef => {
      if (parameterOrRef.astType === 'reference') {
        if (!components.parameters.asResolvedMap.has(parameterOrRef.value)) {
          throw new Error(`Not found parameter component "${parameterOrRef.value}"`);
        }
        return components.parameters.asResolvedMap.get(parameterOrRef.value)!;
      }
      return parameterOrRef;
    });

  return {
    path,
    method,
    ...operation,
    parameters: {
      asList: parameters,
      asMap: new Map(parameters.map(param => [param.name, param]))
    }
  };
}

export const METHODS_LIST = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace'
] as OpenAPIV3.HttpMethods[];
