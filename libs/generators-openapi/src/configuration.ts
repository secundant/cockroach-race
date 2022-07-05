import { join, resolve } from 'path';
import { normalizePascalCase } from './utils/normalize-string';

export function createConfiguration({
  cwd = process.cwd(),
  resolve: resolveConfig = {},
  sourceRoot = 'src',
  outputRoot = 'dist',
  include
}: UserConfiguration): Configuration {
  return {
    cwd,
    resolve: {
      schemaName: normalizePascalCase,
      responseName: name => `${normalizePascalCase(name)}Response`,
      parameterName: name => `${normalizePascalCase(name)}Param`,
      requestBodyName: name => `${normalizePascalCase(name)}RequestBody`,
      ...resolveConfig
    },
    output: {
      absolute: resolve(cwd, outputRoot),
      relativeToCwd: outputRoot
    },
    source: {
      absolute: resolve(cwd, sourceRoot),
      relativeToCwd: sourceRoot,
      include: include.map(relativeToSource => ({
        absolute: resolve(cwd, sourceRoot, relativeToSource),
        relativeToCwd: join(sourceRoot, relativeToSource),
        relativeToSource
      }))
    }
  };
}

export interface Configuration {
  cwd: string;
  resolve: ResolveConfiguration;
  output: {
    absolute: string;
    relativeToCwd: string;
  };
  source: {
    relativeToCwd: string;
    absolute: string;
    include: IncludedSourceConfiguration[];
  };
}

export interface IncludedSourceConfiguration {
  absolute: string;
  relativeToCwd: string;
  relativeToSource: string;
}

export interface UserConfiguration {
  cwd?: string;
  resolve?: Partial<ResolveConfiguration>;
  sourceRoot?: string;
  outputRoot?: string;

  include: string[];
}

export interface ResolveConfiguration {
  schemaName(name: string): string;
  responseName(name: string): string;
  parameterName(name: string): string;
  requestBodyName(name: string): string;
}
