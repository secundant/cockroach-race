import { useStore } from 'effector-react';
import { memo } from 'react';
import { Button } from 'ui/molecules';
import { logOutFx } from '@/features/auth/model';

export const AuthLogout = memo(() => {
  const disabled = useStore(logOutFx.pending);

  return (
    <Button appearance="flat" onClick={() => logOutFx()} disabled={disabled}>
      Выйти
    </Button>
  );
});
