import { Button, Typography } from "@telegram-apps/telegram-ui";
import { Rate } from "../../../types/Rate";
import { useCartStore } from "../../Cart";

export const CartButton = ({ rate }: { rate: Rate<true> }) => {
  const { decreasePurchase, increasePurchase, purchases } = useCartStore();
  const currentPurchase = purchases.find(({ type: { id } }) => id === rate.id);

  if (!currentPurchase) {
    return (
      <Button stretched onClick={() => increasePurchase(rate.id)}>
        Добавить
      </Button>
    );
  } else {
    return (
      <div>
        <Button size="l" mode="plain" onClick={() => decreasePurchase(rate.id)}>
          -
        </Button>
        <Typography>{currentPurchase.pieces}</Typography>
        <Button size="l" mode="plain" onClick={() => increasePurchase(rate.id)}>
          +
        </Button>
      </div>
    );
  }
};
