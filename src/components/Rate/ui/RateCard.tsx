import { FC } from "react";
import { Rate } from "../../../types/Rate";
import { Button, Card, Typography } from "@telegram-apps/telegram-ui";
import { useCartStore } from "../../Cart";

interface RateCardProps {
  rate: Rate<true>;
}

const CartButton = ({ rate }: { rate: Rate<true> }) => {
  const { decreasePurchase, increasePurchase, purchases } = useCartStore();
  const currentPurchase = purchases.find(({ type: { id } }) => id === rate.id);

  if (!currentPurchase) {
    return <Button onClick={() => increasePurchase(rate.id)}>Добавить</Button>;
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

export const RateCard: FC<RateCardProps> = ({ rate }) => {
  const { image_url, name, price, description } = rate;

  return (
    <Card>
      <Card.Chip readOnly>{price} РУБ.</Card.Chip>
      <img
        src={__IMAGE_BUCKET__ + image_url}
        style={{
          display: "block",
          height: 300,
          objectFit: "cover",
          width: 250,
        }}
      />
      <Card.Cell readOnly subtitle={description}>
        {name}
      </Card.Cell>
      <CartButton rate={rate} />
    </Card>
  );
};
