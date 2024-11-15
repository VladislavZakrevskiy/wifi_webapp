import { Button, Caption, Divider, Title, Typography } from "@telegram-apps/telegram-ui";
import { useCartStore } from "../components/Cart";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { tg } from "../config/tg";

export const SubmitPage = () => {
  const { purchase } = useCartStore();
  const nav = useNavigate();

  useEffect(() => {
    tg.MainButton.onClick(() => nav("/payment"));
    tg.MainButton.text = "К оплате";
    tg.MainButton.show();
  }, [purchase]);

  return (
    <div className="p-3 ">
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex justify-between items-center">
          <Title>Корзина</Title>
          <Button onClick={() => nav("/ratemarket")}>Продолжить покупки</Button>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2 mt-3">
        <Caption>В корзине {purchase?.name}</Caption>
        <div className="grid grid-cols-[3fr_1fr] justify-start items-center">
          <Typography weight="2">Название</Typography>
          <Typography weight="2">Цена</Typography>
          <Typography>{purchase?.name}</Typography>
          <Typography>{purchase?.price}РУБ.</Typography>
        </div>
      </div>
    </div>
  );
};
