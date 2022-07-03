import { isEmptyObject, isString } from '../../shared/core-utils';
import { EnumEntry, SchemaOrRefAst } from '../../types/ast';

export function renderSchemaTypeDefinition(name: string, ast: SchemaOrRefAst) {
  if (ast.astType === 'enum') {
    return templates.enum.definition(name, ast.entries.map(templates.enum.value).join(',\n'));
  }
  const type = renderSchemaTypeValue(ast);

  if (ast.astType === 'object' && !isEmptyObject(ast) && !ast.merged?.length) {
    return templates.interface(name, type);
  }
  return templates.type(name, type);
}

const templates = {
  interface(name: string, value: string) {
    return `export interface ${name} ${value}`;
  },
  type(name: string, value: string) {
    return `export type ${name} = ${value};`;
  },
  enum: {
    definition(name: string, value: string) {
      return `export enum ${name} { ${value} }`;
    },
    value({ value, name }: EnumEntry) {
      return `${name} = ${renderEnumValue(value)}`;
    }
  }
};

const renderEnumValue = (value: string | number) => (isString(value) ? `"${value}"` : value);
