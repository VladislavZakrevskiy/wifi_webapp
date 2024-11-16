import { useEffect, useState } from "react";
import { useCartStore } from "../../../components/Cart";
import axios from "axios";
import { Rate } from "../../../types/Rate";
import { ACCESS_TOKEN_KEY } from "../../../types/localStorage.consts";

export const useGetInitRates = () => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setAllRates } = useCartStore();

  useEffect(() => {
    const getRates = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get<Rate<true>[]>(import.meta.env.VITE_API + "/rate", {
          headers: { Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}` },
        });
        if (res) {
          setAllRates(res.data);
        } else {
          setIsError(true);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    getRates();
  }, []);

  return { isError, isLoading };
};
