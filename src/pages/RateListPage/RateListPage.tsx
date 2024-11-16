import { Button, IconButton, Input, Spinner, Typography } from "@telegram-apps/telegram-ui";
import { useFilterSortRates } from "./hooks/useFilterSortRates";
import { useGetInitRates } from "./hooks/useGetInitRates";
import { RateCard } from "../../components/Rate/ui/RateCard";
import { IoSearch } from "react-icons/io5";
import { FaSliders } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { RateFilterModal } from "../../components/Rate";
import { useCartStore } from "../../components/Cart";
import { tg } from "../../config/tg";
import { useNavigate } from "react-router-dom";

export const RateListPage = () => {
  const { purchase } = useCartStore();
  const { isError, isLoading } = useGetInitRates();
  const { currentRates, searchString, sortType, setSearchString, setSortStype } =
    useFilterSortRates();
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const nav = useNavigate();

  console.log(currentRates);

  useEffect(() => {
    if (purchase) {
      tg.MainButton.onClick(() => nav("/submit"));
      tg.MainButton.text = `Перейти к оформлению`;
      tg.MainButton.show();
    }
  }, [purchase, nav]);

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
    <div>
      <RateFilterModal
        currentSortType={sortType}
        isOpen={isSortModalOpen}
        onChange={(newSortType) => setSortStype(newSortType)}
        setIsOpen={setIsSortModalOpen}
      />
      <Input
        before={<IoSearch />}
        after={
          <IconButton onClick={() => setIsSortModalOpen((prev) => !prev)}>
            <FaSliders />
          </IconButton>
        }
        placeholder="Я ищу..."
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      <div className="p-2 grid grid-cols-2 gap-2 justify-center items-start">
        {currentRates.map((rate) => (
          <RateCard key={rate.id} rate={rate} />
        ))}
      </div>
    </div>
  );
};
