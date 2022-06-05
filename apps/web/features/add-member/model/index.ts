import { createEvent, sample } from 'effector';
import { TeamModel } from '@/entities/team';
import { Cockroach } from '@/entities/team/lib';

export const addMemberClicked = createEvent<void>();

const memberCreated = sample({
  fn: (): Cockroach => ({
    id: `item-${++id}`,
    color: '',
    label: '',
    type: 'faster',
    age: 0
  }),
  clock: addMemberClicked,
  filter: TeamModel.$teamIsFull.map(full => !full)
});

sample({
  clock: memberCreated,
  target: TeamModel.memberAdded
});
sample({
  clock: memberCreated.map(member => member.id),
  target: TeamModel.memberSelected
});

let id = 0;
