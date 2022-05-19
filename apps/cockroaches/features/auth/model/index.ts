import { createEffect, sample } from 'effector';
import Router from 'next/router';

export const logInFx = createEffect(
  (_: { name: string; password: string }) =>
    new Promise(r => setTimeout(() => r('ok'), 100 + 300 * Math.random()))
);
export const logOutFx = createEffect(
  () => new Promise(r => setTimeout(() => r('ok'), 100 + 300 * Math.random()))
);

const redirectToHomeFx = createEffect(() => Router.push('/'));
const redirectToLoginPageFx = createEffect(() => Router.push('/auth'));

sample({
  clock: logInFx.done,
  target: redirectToHomeFx
});
sample({
  clock: logOutFx.done,
  target: redirectToLoginPageFx
});
