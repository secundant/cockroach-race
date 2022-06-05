import { Paper } from 'ui/atoms';

import { MemberTypePreview, TeamMembersList } from '@/entities/team';

import { AddMemberButton } from '@/features/add-member';
import { AuthLogout } from '@/features/auth';
import { ChangeLanguageButton } from '@/features/change-language';
import { EditMemberForm } from '@/features/edit-member';
import { SubmitMembersButton } from '@/features/submit-members';

export default function HomeDearHomePage() {
  return (
    <div className="min-h-screen px-4 md:px-10 py-10 flex flex-col bg-blue-200 text-white">
      <div className="flex justify-end mb-6 flex-grow-0">
        <h1 className="text-xl font-bold mr-auto">Набор участников</h1>
        <div className="flex space-x-4">
          <ChangeLanguageButton />
          <AuthLogout />
        </div>
      </div>
      <div className="grid grid-cols-3 flex-1 gap-6 text-black">
        <Paper className="p-10">
          <EditMemberForm />
        </Paper>
        <Paper className="p-10 flex flex-col justify-between items-stretch">
          <MemberTypePreview />
          <SubmitMembersButton />
        </Paper>
        <Paper className="p-6 space-y-6">
          <TeamMembersList />
          <AddMemberButton />
        </Paper>
      </div>
    </div>
  );
}
