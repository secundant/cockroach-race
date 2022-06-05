import * as model from '../model';
import { useEvent, useStore } from 'effector-react';
import useTranslation from 'next-translate/useTranslation';
import { memo } from 'react';
import { Button } from 'ui/molecules';
import { TeamModel } from '@/entities/team';

export const AddMemberButton = memo(() => {
  const handleClick = useEvent(model.addMemberClicked);
  const teamIsFull = useStore(TeamModel.$teamIsFull);
  const { t } = useTranslation('team');

  if (teamIsFull) return null;

  return (
    <Button className="w-full text-center" onClick={handleClick}>
      {t('addMember')}
    </Button>
  );
});
