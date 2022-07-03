import { access, mkdir, readFile } from 'fs/promises';
import { dirname } from 'path';

export const exists = (path: string) =>
  access(path)
    .then(() => true)
    .catch(() => false);

export const ensureDir = (path: string): Promise<void> =>
  access(path).catch(() => ensureDir(dirname(path)).then(() => mkdir(path)));

export const readFileAsString = (path: string) => readFile(path, 'utf-8');
