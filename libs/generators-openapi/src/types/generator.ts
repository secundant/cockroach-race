import { DocumentAst } from './ast';

export interface GeneratorPlugin {}

export interface GeneratorContext {
  entries: GeneratorEntry[];
}

export interface GeneratorEntry {
  documentAst: DocumentAst;
  path: string;
  name: string;
}
