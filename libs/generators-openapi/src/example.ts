export async function example({ input }: { input: string[] }) {
  const reader = new Reader();
  const writer = new Writer();
  const logger = new Logger();
  const context = new Context();
  const compiler = new Compiler(context, reader);

  context.setLogger(logger);
  input.forEach(path => context.addSourcePath(path));
  await compiler.load();
}

interface Settings {
  input: string[];
}

interface Plugin {}
