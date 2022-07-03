import { uniq } from '../lib/utils/shared';
import { readFileAsString } from './shared/fs';
import { load } from 'js-yaml';
import { OpenAPIV3 } from 'openapi-types';
// @ts-expect-error no types
import swagger2openapi from 'swagger2openapi';

export interface SwaggerSchema extends Record<string, any> {
  swagger: string;
}

export type UnknownSchema = OpenAPIV3.Document | SwaggerSchema;

interface PreparedSchemas {
  converted?: true;
  original: UnknownSchema;
  schema: OpenAPIV3.Document;
}

export class Parser {
  async parseFile(path: string) {
    return this.parse(await readFileAsString(path));
  }

  async parse(value: string) {
    const original = this.parseToUnknownSchema(value);
    const prepared = await this.prepare(original);

    this.patchSchema(prepared);
    return prepared.schema;
  }

  protected patchSchema({ original, schema }: PreparedSchemas) {
    for (const [path, methodsRecord] of Object.entries<any>(schema.paths)) {
      for (const [method, route] of Object.entries<any>(methodsRecord)) {
        const { consumers = [], produces = [], parameters = [] } = original.paths[path][method];

        route.parameters ??= [];
        route.consumers = uniq([...(route.consumers ?? []), ...consumers].filter(Boolean));
        route.produces = uniq([...(route.produces ?? []), ...produces].filter(Boolean));
        for (const parameter of parameters) {
          if (!route.parameters.some(parameterEq(parameter))) {
            route.parameters.push(parameter);
          }
        }
      }
    }
  }

  protected async prepare(original: UnknownSchema): Promise<PreparedSchemas> {
    original.info = {
      title: 'Title not provided',
      version: '',
      ...original.info
    };

    if (original.openapi) {
      return {
        schema: original as OpenAPIV3.Document,
        original
      };
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
          resolve({
            schema,
            original,
            converted: true
          });
        }
      );
    });
  }

  protected parseToUnknownSchema(value: string): UnknownSchema {
    try {
      return JSON.parse(value);
    } catch (e) {
      try {
        return load(value) as UnknownSchema;
      } catch (e) {
        throw new Error(
          `OpenAPI - File parsing error - ${e instanceof Error ? e.message : (e as any).toString()}`
        );
      }
    }
  }
}

const parameterEq = (left: any) => (right: any) => left.in === right.in && left.name === right.name;
