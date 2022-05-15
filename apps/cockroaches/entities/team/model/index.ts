import { getValidCount } from '../lib';
import { createStore, createEvent } from 'effector';

export const increment = createEvent();
export const decrement = createEvent();

export const $counter = createStore(0)
  .on(increment, prev => getValidCount(prev + 1))
  .on(decrement, prev => getValidCount(prev - 1));
