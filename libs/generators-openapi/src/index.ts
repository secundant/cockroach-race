import { writeFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { createDocumentAst } from './ast';
import { logger } from './logger';
import { Parser } from './parser';
import { renderDocumentTypeDefinitions } from './render/types';
import { ensureDir, exists } from './shared/fs';

const PATH = resolve(process.cwd(), 'schemas', 'pb-1.json');
const DIST = resolve(process.cwd(), 'out', 'generators-openapi', 'api-2.ts');

console.log({ PATH, DIST });

async function main() {
  if (await exists(PATH)) {
    logger.info(`Reading ${PATH}`);
    const parser = new Parser();
    const openapiSchema = await parser.parseFile(PATH);
    const document = createDocumentAst(openapiSchema);
    const types = renderDocumentTypeDefinitions(document);

    await ensureDir(dirname(DIST));
    await writeFile(DIST, types, 'utf-8');
    console.log('> done');
  } else {
    logger.fatal(`Not found file ${PATH}`);
  }
}

main();
