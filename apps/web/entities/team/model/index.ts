import { Cockroach } from '../lib';
import { combine, createEvent, createStore, restore } from 'effector';
import { CockroachId } from '@/entities/team/lib/types';

export const memberAdded = createEvent<Cockroach>();
export const memberRemoved = createEvent<CockroachId>();
export const memberSelected = createEvent<CockroachId | null>();

export const $team = createStore<Cockroach[]>([]);
export const $selectedMemberId = restore(memberSelected, null);
export const $selectedMember = combine($team, $selectedMemberId, (team, id) =>
  id ? team.find(member => member.id === id) ?? null : null
);

export const $teamIsEmpty = $team.map(team => team.length === 0);
export const $teamIsFull = $team.map(team => team.length === 5);

$team
  .on(memberRemoved, (team, id) => team.filter(item => item.id !== id))
  .on(memberAdded, (team, member) =>
    !team.includes(member) && team.length < 5 ? team.concat(member) : team
  );
