import { AppRoot } from "@telegram-apps/telegram-ui";
import { ConfigProvider } from "./router/ConfigProvider";

function App() {
  return (
    <AppRoot>
      <ConfigProvider />
    </AppRoot>
  );
}

export default App;
