import { Paper } from 'ui/atoms';
import { MemberTypePreview, TeamMembersList } from '@/entities/team';
import { AddMemberButton } from '@/features/add-member';
import { ChangeLanguageButton } from '@/features/change-language';
import { EditMemberForm } from '@/features/edit-member';

export default function HomeDearHomePage() {
  return (
    <div className="min-h-screen px-4 md:px-10 py-10 flex flex-col bg-blue-200 text-white">
      <div className="flex justify-end mb-6 flex-grow-0">
        <h1 className="text-xl font-bold mr-auto">Набор участников</h1>
        <ChangeLanguageButton />
      </div>
      <div className="flex flex-1 gap-6 text-black">
        <Paper className="basis-1/3 p-6">
          <EditMemberForm />
        </Paper>
        <Paper className="basis-1/3 p-6">
          <MemberTypePreview />
        </Paper>
        <Paper className="basis-1/3 p-6 space-y-6">
          <TeamMembersList />
          <AddMemberButton />
        </Paper>
      </div>
    </div>
  );
}
