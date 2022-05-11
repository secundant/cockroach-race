import { SpriteIcon } from 'ui/molecules';

export default function HomeDearHomePage() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="text-9xl rounded-3xl bg-gray-300 text-red-900 p-8 flex animate-pulse">
        <SpriteIcon name="faster" className="rotate-90" />
        <SpriteIcon name="american" />
        <SpriteIcon name="sprinter" className="-rotate-90" />
      </div>
    </div>
  );
}
