import { useRouter } from 'next/router';
import { Icon } from 'ui/atoms';
import { Button } from 'ui/molecules';

export default function HomeDearHomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="text-[100px] rounded-3xl bg-gray-100 text-red-500 p-8 flex animate-pulse">
        <Icon name="faster" className="rotate-90" />
        <Icon name="american" />
        <Icon name="sprinter" className="-rotate-90" />
      </div>
      <Button appearance="flat" className="mt-12" onClick={() => router.push('/auth')}>
        Del
      </Button>
    </div>
  );
}
