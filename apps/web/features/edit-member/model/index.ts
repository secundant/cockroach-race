import { createEvent, sample } from 'effector';
import { TeamModel } from '@/entities/team';
import { CockroachUpdates } from '@/features/edit-member/lib';

export const memberChanged = createEvent<Partial<CockroachUpdates>>();

sample({
  fn: ({ team, selected }, member) =>
    team.map(item => (item.id === selected ? { ...item, ...member } : item)),
  clock: memberChanged,
  source: { team: TeamModel.$team, selected: TeamModel.$selectedMemberId },
  target: TeamModel.$team
});
