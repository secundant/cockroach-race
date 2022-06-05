import * as model from '../model';
import { useEvent, useList, useStore } from 'effector-react';
import useTranslation from 'next-translate/useTranslation';
import { memo } from 'react';
import { Icon, ListItem } from 'ui/atoms';

export const TeamMembersList = memo(() => {
  const handleSelect = useEvent(model.memberSelected);
  const selectedId = useStore(model.$selectedMemberId);
  const empty = useStore(model.$teamIsEmpty);
  const { t } = useTranslation('team');

  const membersListNode = useList(model.$team, {
    fn: item => (
      <ListItem
        className="px-2 py-4"
        onClick={() => handleSelect(item.id)}
        selected={item.id === selectedId}
      >
        <Icon name={item.type} className="text-[60px] mr-10" style={{ color: item.color }} />
        <span>{item.label || 'Новый участник'}</span>
      </ListItem>
    ),
    keys: [selectedId],
    getKey: item => item.id
  });

  return empty ? (
    <div className="h-1/2 text-center flex items-end justify-center text-lg">
      {t('teamIsEmpty')}
    </div>
  ) : (
    <div className="space-y-6">{membersListNode}</div>
  );
});
