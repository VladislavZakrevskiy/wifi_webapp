import { useEffect, useState } from "react";
import { Rate } from "../types/Rate";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Caption,
  FixedLayout,
  IconButton,
  Spinner,
  Title,
  Typography,
} from "@telegram-apps/telegram-ui";
import { tg } from "../config/tg";
import { useCartStore } from "../components/Cart";
import { IoArrowBackSharp } from "react-icons/io5";
import { CartButton } from "../components/Rate";

export const RateById = () => {
  const { id } = useParams<{ id: string }>();
  const [currentRate, setCurrentRate] = useState<Rate | null>(null);
  const [isLoading, setIsLaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const { purchases, increasePurchase } = useCartStore();
  const nav = useNavigate();
  const purchaseRate = purchases.find(({ type: { id } }) => currentRate?.id === id);

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
    tg.MainButton.text = purchases.length > 0 ? `Корзина (${purchases.length})` : "Добавлена";
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
    <div className="p-3 flex flex-col">
      <IconButton className="absolute top-4 right-4" onClick={() => nav("/ratemarket")}>
        <IoArrowBackSharp />
      </IconButton>
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
    </div>
  );
};
