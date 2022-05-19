import useUniversalLayoutEffect from '../use-universal-layout-effect';
import { useState } from 'react';

export function useId(staticId?: string) {
  const [uuid, setUuid] = useState('');

  useUniversalLayoutEffect(() => {
    setUuid(randomId());
  }, []);

  return staticId || uuid;
}

export function randomId() {
  return `mantine-${Math.random().toString(36).slice(2, 11)}`;
}
