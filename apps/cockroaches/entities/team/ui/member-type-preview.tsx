import { useStore } from 'effector-react';
import { memo } from 'react';
import { Icon } from 'ui/atoms';
import * as model from '@/entities/team/model';

export const MemberTypePreview = memo(() => {
  const member = useStore(model.$selectedMember);

  if (!member) return null;
  return (
    <div
      className="flex items-center justify-center text-[120px] md:text-[240px]"
      style={{ color: member.color }}
    >
      <Icon name={member.type} />
    </div>
  );
});
