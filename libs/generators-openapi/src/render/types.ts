import { normalizeName } from '../shared/normalize';
import {
  DocumentAst,
  MergedAst,
  ObjectPropertyAst,
  ObjectSchemaAst,
  PrimitiveSchemaAst,
  ReferenceAst,
  SchemaOrRefAst,
  UnknownSchemaAst
} from '../types/ast';
import { renderSchemaJsDoc } from './jsdoc';
import { OpenAPIV3 } from 'openapi-types';

export function renderDocumentTypeDefinitions({ schemas }: DocumentAst) {
  return Array.from(schemas.entries())
    .map(([name, ast]) =>
      [renderSchemaJsDoc(ast), renderSchemaTypeDefinition(normalizeName(name), ast)]
        .filter(Boolean)
        .join('\n')
    )
    .join('\n\n');
}

export function renderSchemaTypeDefinition(name: string, ast: SchemaOrRefAst) {
  if (ast.astType === 'enum' && ast.entries.length) {
    return definitionTemplate.enum(
      name,
      ast.entries.map(item => `${item.name} = ${wrapEnumValue(item.value)},`).join('\n')
    );
  }
  const type = renderSchemaTypeValue(ast);

  if (ast.astType === 'object' && !isEmptyObject(ast) && !ast.merged?.length) {
    return definitionTemplate.interface(name, type);
  }
  return definitionTemplate.type(name, type);
}

export function renderSchemaTypeValue(ast: SchemaOrRefAst, fallback = ''): string {
  switch (ast.astType) {
    case 'reference':
      return getReferenceName(ast);
    case 'enum':
      return ast.entries.map(entry => `"${entry.value}"`).join(' | ');
    case 'array':
      return ast.itemsAst
        ? `Array<${renderSchemaTypeValue(ast.itemsAst, 'unknown')}>`
        : 'unknown[]';
    default:
      const type = renderExtensibleType(ast, fallback);
      const merged = renderMerged(ast);

      return [merged, type].filter(Boolean).join(mergedSymbols.allOf);
  }
}

const mergeTypesValues = (types: string[], strategy: 'allOf' | 'oneOf' = 'allOf') =>
  types
    .map(type => type.trim())
    .filter(Boolean)
    .map(wrapBrackets)
    .join(mergedSymbols[strategy]);

const renderMerged = (ast: SchemaOrRefAst): string =>
  mergeTypesValues(ast.merged?.map(renderMergedItem) ?? []);

const renderMergedItem = (ast: MergedAst) =>
  ast.value
    .map(node => {
      const value = renderSchemaTypeValue(node);

      if (!value.trim()) {
        console.warn(`Empty merged type:`, node, ast);
      }
      return value;
    })
    .filter(Boolean)
    .map(wrapBrackets)
    .join(mergedSymbols[ast.type]);

/**
 * For these types we can provide self type + oneOf/allOf/anyOf
 */
function renderExtensibleType(
  ast: PrimitiveSchemaAst | ObjectSchemaAst | UnknownSchemaAst,
  fallback = ''
): string {
  switch (ast.astType) {
    case 'primitive':
      return typeScriptTypesMap[ast.type];
    case 'object':
      return renderObjectType(ast);
    default:
      return fallback;
  }
}

function renderObjectType(ast: ObjectSchemaAst) {
  const properties = Array.from(ast.propertiesAst)
    .sort(propertiesComparator)
    .map(renderProperty)
    .join('\n');
  const indexed = ast.indexed
    ? `[key: string | number]: ${
        ast.indexed === 'unknown'
          ? 'unknown'
          : mergeTypesValues([renderSchemaTypeValue(ast.indexed), 'unknown'], 'oneOf')
      };`
    : '';

  return properties || indexed
    ? [`{`, properties, indexed, `}`].filter(Boolean).join('\n')
    : '{ [key: string]: unknown }';
}

function renderProperty({ name, value }: ObjectPropertyAst) {
  const jsdoc = renderSchemaJsDoc(value);

  return `${jsdoc ? jsdoc + '\n' : ''}"${name}"${
    value.nullable ? '?' : ''
  }: ${renderSchemaTypeValue(value)};`;
}

function getReferenceName({ type, value }: ReferenceAst) {
  const name = normalizeName(value);

  switch (type) {
    case 'requestBodies':
      return `RequestBody${name}`;
    default:
      return name;
  }
}

const definitionTemplate = {
  interface(name: string, value: string) {
    return `export interface ${name} ${value}`;
  },
  enum(name: string, value: string) {
    return [`export enum ${name} {`, value, `}`].join('\n');
  },
  type(name: string, value: string) {
    return `export type ${name} = ${value};`;
  }
};
const typeScriptTypesMap: Record<Exclude<OpenAPIV3.NonArraySchemaObjectType, 'object'>, string> = {
  integer: 'number',
  number: 'number',
  boolean: 'boolean',
  string: 'string'
};
const mergedSymbols = {
  anyOf: ' | ',
  oneOf: ' | ',
  allOf: ' & '
};

const wrapBrackets = (value: string) => `(${value})`;
const wrapEnumValue = (value: string | number) =>
  typeof value === 'string' ? `"${value}"` : value;
const isEmptyObject = (ast: ObjectSchemaAst) => !ast.propertiesAst.length && !ast.indexed;

const propertiesComparator = (left: ObjectPropertyAst, right: ObjectPropertyAst) => {
  if (!left.value.nullable && right.value.nullable) {
    return -1;
  } else if (left.value.nullable && !right.value.nullable) {
    return 1;
  }

  return isAscending(left.name, right.name);
};
const isAscending = (a: string, b: string) => (a > b ? 1 : b > a ? -1 : 0);
