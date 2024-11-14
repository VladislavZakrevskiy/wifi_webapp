import { Button, Title, Typography } from "@telegram-apps/telegram-ui";

export const NotAuth = () => {
  return (
    <div className="flex flex-col gap-3 justify-center items-center">
      <Title color="var(--tg-theme-text-color-error)">Вы заходите не с бота!</Title>
      <Typography>Перейдите в бота @{__BOT_USERNAME__}</Typography>
      <Button onClick={() => location.replace(`https://t.me/${__BOT_USERNAME__}`)}>Перейти</Button>
    </div>
  );
};
