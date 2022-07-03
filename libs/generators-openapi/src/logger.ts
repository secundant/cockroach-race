export class Logger {
  info(message: string, ...args: any[]) {
    console.info(` > `, message, ...args);
  }

  fatal(error: string | Error) {
    console.error(error);
  }
}

export const logger = new Logger();
