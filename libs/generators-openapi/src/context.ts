export class Context {
  private _phase: ExecutionPhase = ExecutionPhase.SOURCES_READING;
  private _sources = new Set<string>();

  get sources() {
    return Array.from(this._sources);
  }

  get phase() {
    return this._phase;
  }

  setPhase(phase: ExecutionPhase) {
    this._phase = phase;
  }

  addSourcePath(path: string) {
    this._sources.add(path);
  }
}

export enum ExecutionPhase {
  SOURCES_WAITING,
  SOURCES_READING,
  AST_BUILDING,
  AST_AGGREGATION,
  RENDER_COMPONENTS,
  RENDER_
}
