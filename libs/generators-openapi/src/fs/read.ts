import { readFile } from 'fs/promises';
import { Configuration, IncludedSourceConfiguration } from '../configuration';
import { load } from 'js-yaml';
import { OpenAPIV2, OpenAPIV3 } from 'openapi-types';
// @ts-expect-error no types
import swagger2openapi from 'swagger2openapi';

export async function loadDocuments({
  source: { include }
}: Configuration): Promise<LoadedDocument[]> {
  return Promise.all(
    include.map(async source => ({
      source,
      content: await loadDocument(source.absolute)
    }))
  );
}

async function loadDocument(path: string): Promise<OpenAPIV3.Document> {
  const content = await readFile(path, 'utf-8');
  const original = parseStringToDocument(content);

  original.info = Object.assign(
    {
      title: 'Title not provided',
      version: ''
    },
    original.info
  );

  if (isV3Document(original)) {
    return original;
  }
  original.paths ??= {};

  return new Promise((resolve, reject) => {
    swagger2openapi.convertObj(
      original,
      {
        warnOnly: true,
        refSiblings: 'preserve',
        rbname: 'requestBodyName'
      },
      (err: any, options: any) => {
        const schema = (err?.options?.openapi ?? options?.openapi) as OpenAPIV3.Document;

        if (!schema && err) {
          reject(err);
        }
        resolve(schema);
      }
    );
  });
}

function parseStringToDocument(value: string): AnyDocument {
  try {
    return JSON.parse(value);
  } catch (e) {
    try {
      return load(value) as AnyDocument;
    } catch (e) {
      throw new Error(
        `OpenAPI - File parsing error - ${e instanceof Error ? e.message : (e as any).toString()}`
      );
    }
  }
}

const isV3Document = (value: AnyDocument): value is OpenAPIV3.Document =>
  Object.hasOwn(value, 'openapi');

type AnyDocument = OpenAPIV3.Document | OpenAPIV2.Document;

export interface LoadedDocument {
  content: OpenAPIV3.Document;
  source: IncludedSourceConfiguration;
}
