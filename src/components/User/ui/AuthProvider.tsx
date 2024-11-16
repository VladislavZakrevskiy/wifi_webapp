import { FC, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../model/UserStore";
import { TgUser } from "../../../types/TGUser";
import { tg } from "../../../config/tg";
import axios from "axios";
import { Spinner } from "@telegram-apps/telegram-ui";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { initData, setInitData, setTGUser } = useUserStore();
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      try {
        setIsLoading(true);

        if (initData) {
          setIsLoading(false);
          setIsAuth(true);
          return;
        }
        const params = new URLSearchParams(tg.initData);
        const initDataObj: Record<string, string> = {};
        for (const [key, value] of params.entries()) {
          initDataObj[key] = value;
        }
        const hash = initDataObj.hash as string;

        setInitData(initDataObj);
        setTGUser(JSON.parse(initDataObj.user || "{}") as TgUser);

        delete initDataObj.hash;
        const dataCheckString = Object.keys(initDataObj)
          .sort()
          .map((key) => `${key}=${initDataObj[key]}`)
          .join("\n");

        const res = await axios.post(import.meta.env.VITE_API + "/auth/hash", { dataCheckString });
        const calculatedHash = res.data as { hash: string };

        if (calculatedHash.hash === hash) {
          setIsLoading(false);
          setIsAuth(true);
        } else {
          setIsLoading(false);
          setIsAuth(false);
          nav("/not-auth");
        }
      } catch (e) {
        alert(e);
        setIsLoading(false);
        setIsAuth(false);
        nav("/not-auth");
      }
    };
    authUser();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen">
        <Spinner size="m" />
      </div>
    );
  }

  if (isAuth) {
    return children;
  }
};
