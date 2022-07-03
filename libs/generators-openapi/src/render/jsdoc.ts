import { SchemaAst, SchemaOrRefAst } from '../types/ast';

export function renderSchemaJsDoc(ast: SchemaOrRefAst) {
  if (ast.astType === 'reference') return null;
  const { example, deprecated } = ast;
  const description = renderSchemaDescription(ast);

  if (!example && !deprecated && !description) {
    return null;
  }
  const exampleString = example ? String(example) : '';

  return stringify([
    [true, '/**'],
    [description || null, normalize(description || '') || ''],
    [deprecated, `* @deprecated ${normalize(deprecated?.toString()) || ''}`],
    [
      example,
      [
        `* @example ${
          exampleString === '[object Object]' ? JSON.stringify(example) : exampleString
        }`
      ]
    ],
    [true, '*/']
  ]);
}

function renderSchemaDescription({
  title,
  description,
  format,
  maxLength,
  minLength,
  minimum,
  maximum,
  pattern
}: SchemaAst) {
  return stringify([
    [title, [`* ${title}`, `* `]],
    [description, description?.split('\n').map(part => `* ${part}`) ?? []],
    [format, `* @format ${format}`],
    [minimum, `* @min ${minimum}`],
    [maximum, `* @max ${maximum}`],
    [pattern, `* @pattern ${pattern}`],
    [maxLength, `* - maxLength: ${maxLength}`],
    [minLength, `* - minLength: ${minLength}`]
  ]);
}

const normalize = (value?: string) => value?.replace(/\*\//g, '*\\/');
const stringify = (
  entries: Array<[string | null | undefined | number | boolean, string | string[]]>
) =>
  entries
    .filter(([value]) => value !== null && value !== undefined)
    .map(entry => entry[1])
    .flat()
    .join(`\n `);
