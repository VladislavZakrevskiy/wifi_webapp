import { FC } from "react";
import { Rate } from "../../../types/Rate";
import { useNavigate } from "react-router-dom";
import { CartButton } from "./CartButton";
import { Card } from "@telegram-apps/telegram-ui";

interface RateCardProps {
  rate: Rate<true>;
}

export const RateCard: FC<RateCardProps> = ({ rate }) => {
  const { image_url, name, price, description } = rate;
  const nav = useNavigate();

  return (
    <Card>
      <Card.Chip readOnly>{price} РУБ.</Card.Chip>
      <img
        onClick={() => nav("/rate/" + rate.id)}
        src={__IMAGE_BUCKET__ + image_url}
        style={{
          display: "block",
          objectFit: "cover",
          width: "100%",
        }}
      />
      <Card.Cell readOnly subtitle={description}>
        {name}
      </Card.Cell>
      <CartButton rate={rate} />
    </Card>
  );
};
