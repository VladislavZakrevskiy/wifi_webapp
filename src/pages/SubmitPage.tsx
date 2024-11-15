import { Button, Caption, Divider, Title, Typography } from "@telegram-apps/telegram-ui";
import { useCartStore } from "../components/Cart";
import { useNavigate } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

export const SubmitPage = () => {
  const { purchase } = useCartStore();
  const nav = useNavigate();

  return (
    <div className="p-3 ">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <Title>Корзина</Title>
          <Button onClick={() => nav("/ratemarket")}>Продолжить покупки</Button>
        </div>
      </div>

      <Divider className="my-3" />

      <div className="flex flex-col gap-2">
        <Caption>В корзине {purchase?.name}</Caption>
        <div className="grid grid-cols-[3fr_1fr] justify-start items-center">
          <Typography weight="2">Название</Typography>
          <Typography weight="2">Цена</Typography>
          <Typography>{purchase?.name}</Typography>
          <Typography>{purchase?.price}РУБ.</Typography>
        </div>
      </div>

      <Button
        className="mt-4"
        after={<IoChevronForward />}
        size="l"
        stretched
        onClick={() => nav("/payment")}
      >
        К оформлению
      </Button>
    </div>
  );
};
