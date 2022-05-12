import { createEffect, sample } from 'effector';
import Router from 'next/router';

export const logInFx = createEffect(
  (_: { name: string; password: string }) =>
    new Promise(r => setTimeout(() => r('ok'), 100 + 300 * Math.random()))
);

const redirectFx = createEffect(() => Router.push('/'));

sample({
  clock: logInFx.done,
  target: redirectFx
});
