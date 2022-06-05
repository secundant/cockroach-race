import * as model from '../model';
import { useEvent, useStore } from 'effector-react';
import useTranslation from 'next-translate/useTranslation';
import { memo, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from 'ui/molecules';
import { Select } from 'ui/organisms';
import { TeamModel } from '@/entities/team';
import { CockroachUpdates } from '@/features/edit-member/lib';
import { Form } from '@/shared/ui/atoms';
import { Field } from '@/shared/ui/molecules';

export const EditMemberForm = memo(() => {
  const form = useForm<CockroachUpdates>();
  const selectedMember = useStore(TeamModel.$selectedMember);
  const handleChange = useEvent(model.memberChanged);
  const { t } = useTranslation('team');

  const typesData = useMemo(
    () =>
      types.map(value => ({
        value,
        label: t(`common:cockroachType.${value}`)
      })),
    [t]
  );

  useEffect(() => {
    selectedMember && form.reset(selectedMember);
  }, [selectedMember?.id]);
  useEffect(() => form.watch(handleChange).unsubscribe, []);
  if (!selectedMember) return null;
  return (
    <Form form={form} onSubmit={console.log.bind(console, 'submit')} className="text-black">
      <Field t={t} name="label">
        <Input className="w-full" />
      </Field>
      <Field t={t} name="age">
        <Input type="number" className="w-full" />
      </Field>
      <Field t={t} name="color">
        <Input type="color" className="w-full" />
      </Field>
      <Field t={t} name="type">
        <Select className="w-full" data={typesData} />
      </Field>
    </Form>
  );
});

const types = ['american', 'faster', 'fielder', 'sprinter', 'turkish'];
