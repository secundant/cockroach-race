import { Configuration } from '../configuration';
import { ComponentType, ReferenceNode } from './types';
import { OpenAPIV3 } from 'openapi-types';

export function createReferenceFactory<Type extends ComponentType, T extends {}, R>(
  fn: (value: T, configuration: Configuration) => R
) {
  return function factory(
    value: T | OpenAPIV3.ReferenceObject,
    configuration: Configuration
  ): R | ReferenceNode<Type> {
    return isReference(value)
      ? createReferenceNode<Type>(value, configuration)
      : fn(value, configuration);
  };
}

export function createReferenceNode<Type extends ComponentType>(
  original: OpenAPIV3.ReferenceObject,
  configuration: Configuration
): ReferenceNode<Type> {
  const { type, name } = referenceRe.exec(original.$ref)?.groups ?? {};

  return {
    nodeType: 'ref',
    original,
    type: type as Type,
    name: resolveReferenceName(name, type as Type, configuration)
  };
}

export const isReference = <T extends {}>(
  value: T | OpenAPIV3.ReferenceObject
): value is OpenAPIV3.ReferenceObject => Object.hasOwn(value, '$ref');

export const resolveReferenceName = (
  name: string,
  type: ComponentType,
  { resolve }: Configuration
) => {
  switch (type) {
    case 'parameters':
      return resolve.parameterName(name);
    case 'responses':
      return resolve.responseName(name);
    case 'requestBodies':
      return resolve.requestBodyName(name);
    default:
      return resolve.schemaName(name);
  }
};

const referenceRe = /^#\/components\/(?<type>[a-z]*)\/(?<name>.*)$/;
