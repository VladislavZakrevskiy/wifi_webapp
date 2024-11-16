import { AppRoot } from "@telegram-apps/telegram-ui";
import { ConfigProvider } from "./router/ConfigProvider";
import { useEffect } from "react";
import { tg } from "./config/tg";

function App() {
  useEffect(() => {
    console.log(tg);
  }, [tg]);

  return (
    <AppRoot>
      <ConfigProvider />
    </AppRoot>
  );
}

export default App;
