import { useEffect, useState } from "react";
import { Rate } from "../types/Rate";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Button, Caption, Spinner, Title, Typography } from "@telegram-apps/telegram-ui";
import { tg } from "../config/tg";
import { useCartStore } from "../components/Cart";
import { IoArrowBackSharp } from "react-icons/io5";
import { ACCESS_TOKEN_KEY } from "../types/localStorage.consts";

export const RateById = () => {
  const { id } = useParams<{ id: string }>();
  const [currentRate, setCurrentRate] = useState<Rate | null>(null);
  const [isLoading, setIsLaoding] = useState(false);
  const [isError, setIsError] = useState(false);
  const { purchase, setPurchase } = useCartStore();
  const nav = useNavigate();

  useEffect(() => {
    const getRateById = async () => {
      setIsLaoding(true);
      try {
        const res = await axios.get<Rate>(import.meta.env.VITE_API + "/rate/" + id, {
          headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` },
        });
        setCurrentRate(res.data);
      } catch (e) {
        console.log(e);
        setIsError(false);
      } finally {
        setIsLaoding(false);
      }
    };
    getRateById();
  }, [id]);

  useEffect(() => {
    if (purchase?.id === currentRate?.id) {
      tg.MainButton.onClick(() => nav("/submit"));
    } else {
      tg.MainButton.onClick(() => setPurchase(currentRate!.id));
    }
    tg.MainButton.text = purchase ? `Перейти к покупке` : "Добавить";
    tg.MainButton.show();
  }, [purchase, currentRate, setPurchase, nav]);

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
        <Typography>Ошибка! Простите, попробуйте обновить страницу</Typography>
        <Button onClick={() => location.reload()}>Обновить</Button>
      </div>
    );
  }

  return (
    <>
      <Button
        className="absolute top-2 left-3 w-10 h-10 flex justify-center items-center"
        onClick={() => nav("/ratemarket")}
      >
        <IoArrowBackSharp />
      </Button>
      <div className="p-3 flex flex-col gap-2">
        <img
          src={import.meta.env.VITE_IMAGE_BUCKET + currentRate?.image_url}
          style={{
            display: "block",
            objectFit: "cover",
            width: "100%",
          }}
        />
        <Title>{currentRate?.name}</Title>
        <Caption>{currentRate?.description}</Caption>
      </div>
    </>
  );
};
