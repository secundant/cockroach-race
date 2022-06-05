import { allSettled, fork, Scope, Unit } from 'effector';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { appStarted } from '@/shared/lib/effector-next/model';

export interface GetStatePropsParams {
  unit: Unit<any>;
  scope?: Scope;
  context: GetServerSidePropsContext | GetStaticPropsContext;
}

export async function getStateProps({ context, scope, unit }: GetStatePropsParams) {
  scope = scope ?? fork();

  await allSettled(appStarted, { scope });
  await allSettled(unit, { scope });
}
