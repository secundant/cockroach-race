import { Cockroach } from '@/entities/team/lib';

export type CockroachUpdates = Omit<Cockroach, 'id'>;
