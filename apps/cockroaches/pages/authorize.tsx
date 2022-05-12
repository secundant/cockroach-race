import { Paper } from 'ui/atoms';
import { Button, FieldLayout, Input } from 'ui/molecules';

export default function AuthorizePage() {
  return (
    <div className="min-h-screen bg-accent-500 px-10 py-12 flex flex-col">
      <div className="flex justify-end mb-4 flex-grow-0">
        <Button appearance="outline">Ru</Button>
      </div>
      <Paper className="flex flex-col justify-center items-center flex-1">
        <h1 className="text-xl mb-4">Вход/регистрация стадиона</h1>
        <div className="w-72 max-w-full space-y-4">
          <FieldLayout label="Название Стадиона" htmlFor="name">
            <Input id="name" placeholder="Введите название" className="w-full" />
          </FieldLayout>
          <FieldLayout label="Пароль" htmlFor="password">
            <Input id="password" type="password" placeholder="Введите пароль" className="w-full" />
          </FieldLayout>
        </div>
        <Button appearance="accent">Вход</Button>
      </Paper>
    </div>
  );
}
