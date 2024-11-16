import { Button, Title, Typography } from "@telegram-apps/telegram-ui";
import { useNavigate } from "react-router-dom";

export const NotAuth = () => {
  const nav = useNavigate();

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center items-center p-5 gap-3 ">
        <Title color="var(--tg-theme-text-color-error)">Вы заходите не с бота!</Title>
        <Typography>Перейдите в бота @{import.meta.env.VITE_BOT_USERNAME}</Typography>
        <Button
          stretched
          // onClick={() => location.replace(`https://t.me/${import.meta.env.VITE_BOT_USERNAME}`)}
          onClick={() => nav("/ratemarket")}
        >
          Перейти
        </Button>
      </div>
    </div>
  );
};
