import { useRouter } from 'next/router';
import { memo, useRef, useState } from 'react';
import { ListBoxItem } from 'ui/atoms';
import { useEventCallback } from 'ui/hooks';
import { Button, Popover } from 'ui/molecules';

export const ChangeLanguageButton = memo(() => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);
  const handleSelect = useEventCallback((locale: string) => {
    router.replace({ pathname: router.pathname, query: router.query }, void 0, {
      locale
    });
    setOpen(false);
  });

  return (
    <>
      <Button ref={ref} appearance="outline" onClick={() => setOpen(true)}>
        {langByName[router.locale as any].label}
      </Button>
      <Popover
        open={open}
        anchorNode={ref.current}
        onClose={() => setOpen(false)}
        className="p-2 space-y-2"
        anchorOrigin={{
          vertical: 'start',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center'
        }}
      >
        {langs.map(lang => (
          <ListBoxItem
            selected={router.locale === lang.name}
            onClick={() => handleSelect(lang.name)}
            key={lang.name}
          >
            {lang.label}
          </ListBoxItem>
        ))}
      </Popover>
    </>
  );
});

const langs = [
  { name: 'ru', label: 'Русский' },
  { name: 'en', label: 'English' }
] as const;
const langByName = Object.fromEntries(langs.map(lang => [lang.name, lang]));
