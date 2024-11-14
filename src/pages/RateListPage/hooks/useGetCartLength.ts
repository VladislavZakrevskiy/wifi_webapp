import { useMemo } from "react";
import { useCartStore } from "../../../components/Cart";

export const useGetPurchaseLength = () => {
  const { purchases } = useCartStore();

  const purchase_sum = useMemo(() => {
    if (!purchases) {
      return 0;
    }

    let summa = 0;
    for (let i = 0; i < purchases.length; i++) {
      summa += purchases[i].pieces;
    }
    return summa;
  }, [purchases]);

  return purchase_sum;
};
