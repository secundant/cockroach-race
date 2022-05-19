import { TeamModel } from '@/entities/team';

export const $shown = TeamModel.$team.map(team => team.length === 5);
export const $valid = TeamModel.$team.map(team => team.every(item => item.label && item.age));
