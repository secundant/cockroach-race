import * as model from '../model';
import { useStore } from 'effector-react';
import { memo } from 'react';
import { Button } from 'ui/molecules';

export const SubmitMembersButton = memo(() => {
  const shown = useStore(model.$shown);
  const valid = useStore(model.$valid);

  if (!shown) return null;
  return (
    <Button disabled={!valid} className="w-full text-center">
      Утвердить команду
    </Button>
  );
});
