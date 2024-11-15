import { Button, Cell, Divider, Radio, Title } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tg } from "../config/tg";
import { useCartStore } from "../components/Cart";

export const PaymentPage = () => {
  const { purchase } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState<"stars" | "tg_native">("tg_native");
  const nav = useNavigate();

  const onSendData = () => {
    alert(JSON.stringify({ paymentMethod, purchase }));
    tg.sendData(JSON.stringify({ paymentMethod, purchase }));
  };

  useEffect(() => {
    tg.MainButton.text = "Оплатить";
    tg.MainButton.onClick(onSendData);
    tg.MainButton.show();
  }, [paymentMethod, purchase, onSendData]);

  return (
    <div className="p-3 ">
      <div className="flex flex-col gap-3 mb-3">
        <div className="flex justify-between items-center">
          <Title>Корзина</Title>
          <Button onClick={() => nav("/submit")}>Вернуться в корзину</Button>
        </div>
      </div>

      <Divider />

      <div className="flex flex-col gap-2 mt-3">
        <div className="flex flex-col w-full gap-1 justify-start items-center">
          <Cell
            className="w-full"
            Component="label"
            before={
              <Radio
                checked={paymentMethod === "stars"}
                onChange={() => setPaymentMethod("stars")}
              />
            }
          >
            Telegram Stars
          </Cell>
          <Cell
            className="w-full"
            Component="label"
            before={
              <Radio
                checked={paymentMethod === "tg_native"}
                onChange={() => setPaymentMethod("tg_native")}
              />
            }
          >
            Оплата картой
          </Cell>
        </div>
      </div>
    </div>
  );
};
