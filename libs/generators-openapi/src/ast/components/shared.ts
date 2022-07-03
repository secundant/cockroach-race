import { ReferenceAst } from '../../types/ast';
import { ReferenceObject } from '../../types/openapi';

export function createAstFactory<Input extends {}, Output, Args extends any[]>(
  fn: (input: Input, ...args: Args) => Output
): (input: Input | ReferenceObject, ...args: Args) => Output | ReferenceAst {
  return function astFactory(input: Input | ReferenceObject, ...args: Args) {
    return isReference(input) ? createReferenceAst(input) : fn(input, ...args);
  };
}

export const isReference = <T extends {}>(value: T | ReferenceObject): value is ReferenceObject =>
  Object.hasOwn(value, '$ref');

export function createReferenceAst({ $ref }: ReferenceObject): ReferenceAst {
  const { type, value } = referenceRe.exec($ref)?.groups ?? {};

  return {
    astType: 'reference',
    type: type as any,
    value
  };
}

const referenceRe = /^#\/components\/(?<type>[a-z]*)\/(?<value>.*)$/;
