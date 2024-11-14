import { useEffect, useState } from "react";
import { Rate } from "../types/Rate";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Caption,
  FixedLayout,
  Spinner,
  Title,
  Typography,
} from "@telegram-apps/telegram-ui";
import { tg } from "../config/tg";
import { useCartStore } from "../components/Cart";
import { IoArrowBackSharp } from "react-icons/io5";
import { useGetPurchaseLength } from "./RateListPage/hooks/useGetCartLength";
import { CartButton } from "../components/Rate";

export const RateById = () => {
  const { id } = useParams<{ id: string }>();
  const [currentRate, setCurrentRate] = useState<Rate | null>(null);
  const [isLoading, setIsLaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const { purchases, increasePurchase } = useCartStore();
  const nav = useNavigate();
  const purchaseRate = purchases?.find(({ type: { id } }) => currentRate?.id === id);
  const purchaseLength = useGetPurchaseLength();

  useEffect(() => {
    const getRateById = async () => {
      setIsLaoding(true);
      try {
        const res = await axios.get<Rate>(__API__ + "/rate/" + id);
        setCurrentRate(res.data);
      } catch (e) {
        console.log(e);
        setIsError(false);
      } finally {
        setIsLaoding(false);
      }
    };
    getRateById();
  }, []);

  useEffect(() => {
    tg.MainButton.onClick(() => increasePurchase(currentRate?.id || ""));
    tg.MainButton.text = purchases.length > 0 ? `Корзина (${purchaseLength})` : "Добавлить";
    tg.MainButton.show();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner size="l" />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <Typography color="#f00">Ошибка! Простите, попробуйте обновить страницу</Typography>
        <Button onClick={() => location.reload()}>Обновить</Button>
      </div>
    );
  }

  return (
    <div className="p-3 flex flex-col gap-2">
      <Button
        className="absolute top-4 left-0 w-10 h-10 flex justify-center items-center"
        onClick={() => nav("/ratemarket")}
      >
        <IoArrowBackSharp />
      </Button>
      <img
        src={__IMAGE_BUCKET__ + currentRate?.image_url}
        style={{
          display: "block",
          objectFit: "cover",
          width: "100%",
        }}
      />
      <Title>{currentRate?.name}</Title>
      <Caption>{currentRate?.description}</Caption>
      {purchaseRate && (
        <FixedLayout vertical="bottom">
          <div className="flex justify-between">
            <Typography>{currentRate!.price * purchaseRate.pieces} РУБ.</Typography>
            <CartButton rate={{ ...currentRate!, users: [] }} />
          </div>
        </FixedLayout>
      )}
      <Button onClick={() => increasePurchase(currentRate!.id)}>Добавить</Button>
    </div>
  );
};
