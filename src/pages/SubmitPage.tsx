import { Button, Caption, Divider, Title, Typography } from "@telegram-apps/telegram-ui";
import { useCartStore } from "../components/Cart";
import { useGetPurchaseLength } from "./RateListPage/hooks/useGetCartLength";
import { useNavigate } from "react-router-dom";
import { IoChevronForward } from "react-icons/io5";

export const SubmitPage = () => {
  const { purchases } = useCartStore();
  const purchaseLength = useGetPurchaseLength();
  const nav = useNavigate();

  const getTranslationByNumber = () => {
    if (purchaseLength === 1) return "товар";
    if (purchaseLength === 2) return "товара";
    if (purchaseLength === 3) return "товара";
    if (purchaseLength === 4) return "товара";
    if (purchaseLength >= 5) return "товаров";
  };

  return (
    <div>
      <div className="flex flex-col gap-1">
        <div className="flex justify-between items-center">
          <Title>Корзина</Title>
          <Button onClick={() => nav("/ratemarket")}>Продолжить покупки</Button>
        </div>
        <Caption>
          {purchaseLength} {getTranslationByNumber()}
        </Caption>
        <Divider />
      </div>

      <div className="flex flex-col gap-2">
        <Caption>
          В корзине {purchaseLength} {getTranslationByNumber()}
        </Caption>
        <div className="grid grid-cols-[3fr_1fr_1fr] justify-start items-center">
          <Typography>Название</Typography>
          <Typography>Штук</Typography>
          <Typography>Цена</Typography>
          {purchases.map(({ pieces, type }) => (
            <>
              <Typography>{type.name}</Typography>
              <Typography>{pieces}</Typography>
              <Typography>{type.price}</Typography>
            </>
          ))}
        </div>
      </div>

      <Button after={<IoChevronForward />} size="l" stretched onClick={() => nav("/payment")}>
        К оформлению
      </Button>
    </div>
  );
};
