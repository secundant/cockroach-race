import { groupBy } from '../../shared/core-utils';
import { ParameterAst, ParameterOrRefAst, ParametersInfoAst, ParameterType } from '../../types/ast';
import { ReferenceObject } from '../../types/openapi';
import { createAstFactory } from './shared';
import { OpenAPIV3 } from 'openapi-types';

export function createParametersInfoAst(
  input: Record<string, OpenAPIV3.ParameterObject | ReferenceObject>
): ParametersInfoAst {
  const entries = Object.entries(input).map(([name, parameter]): [string, ParameterOrRefAst] => [
    name,
    createParameterAst(parameter)
  ]);
  const asList = entries.map(entry => entry[1]);
  const parametersList = asList.filter<ParameterAst>(
    (item): item is ParameterAst => item.astType === 'parameter'
  );

  return {
    required: parametersList.filter(item => item.required).map(item => item.name),
    asList,
    asMap: new Map(entries),
    asResolvedMap: new Map(
      entries.filter((entry): entry is [string, ParameterAst] => entry[1].astType === 'parameter')
    ),
    asTypesMap: new Map(
      Object.entries(groupBy(parametersList, item => item.type)) as Array<
        [ParameterType, ParameterAst[]]
      >
    )
  };
}

export const createParameterAst = createAstFactory(
  (input: OpenAPIV3.ParameterObject): ParameterAst => ({
    ...input,
    astType: 'parameter',
    type: input.in.trim().toLowerCase() as ParameterType
  })
);
