import { Button } from "@telegram-apps/telegram-ui";
import { Rate } from "../../../types/Rate";
import { useCartStore } from "../../Cart";

export const CartButton = ({ rate }: { rate: Rate<true> }) => {
  const { purchase, setPurchase, deletePurchase } = useCartStore();

  if (purchase?.id !== rate.id) {
    return (
      <Button stretched onClick={() => setPurchase(rate.id)}>
        Добавить
      </Button>
    );
  } else {
    return (
      <div className="flex justify-evenly items-center">
        <Button mode="bezeled" stretched onClick={() => deletePurchase()}>
          Убрать
        </Button>
      </div>
    );
  }
};
