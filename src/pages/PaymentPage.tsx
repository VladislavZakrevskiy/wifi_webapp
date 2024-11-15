import { Button, Cell, Divider, Radio, Title } from "@telegram-apps/telegram-ui";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { tg } from "../config/tg";

export const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState<"stars" | "tg_native">("tg_native");
  const nav = useNavigate();

  useEffect(() => {
    tg.MainButton.text = "Оплатить";
    tg.MainButton.onClick(() => {
      tg.sendData(JSON.stringify({ paymentMethod }));
      tg.close();
    });
    tg.MainButton.show();
  }, []);

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
        <div className="grid grid-cols-[3fr_1fr] justify-start items-center">
          <Cell
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
