export interface Cockroach {
  id: CockroachId;
  age: number;
  type: CockroachType;
  label: string;
  color: string;
}

export type CockroachId = string | number;
export type CockroachType = 'american' | 'faster' | 'fielder' | 'sprinter' | 'turkish';
