import { Dispatch, FC, SetStateAction } from "react";
import { SortType } from "../types/SortType";
import { Cell, Modal, Radio } from "@telegram-apps/telegram-ui";

interface RateFilterModalProps {
  currentSortType: SortType;
  onChange: (newSortType: SortType) => void;

  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const RateFilterModal: FC<RateFilterModalProps> = ({
  currentSortType,
  onChange,
  isOpen,
  setIsOpen,
}) => {
  const onRadioChange = (sortType: SortType) => {
    onChange(sortType);
    setIsOpen(false);
  };

  return (
    <Modal open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
      <Cell
        Component="label"
        before={
          <Radio
            checked={currentSortType === "high_popularity"}
            onChange={() => onRadioChange("high_popularity")}
          />
        }
      >
        По возрастанию популярности
      </Cell>
      <Cell
        Component="label"
        before={
          <Radio
            checked={currentSortType === "low_popularity"}
            onChange={() => onRadioChange("low_popularity")}
          />
        }
      >
        По убыванию популярности
      </Cell>
      <Cell
        Component="label"
        before={
          <Radio
            checked={currentSortType === "high_price"}
            onChange={() => onRadioChange("high_price")}
          />
        }
      >
        По возрастанию цены
      </Cell>
      <Cell
        Component="label"
        before={
          <Radio
            checked={currentSortType === "low_price"}
            onChange={() => onRadioChange("low_price")}
          />
        }
      >
        По убыванию цены
      </Cell>
    </Modal>
  );
};
