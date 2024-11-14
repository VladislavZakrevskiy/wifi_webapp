import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@telegram-apps/telegram-ui/dist/styles.css";

createRoot(document.getElementById("root")!).render(<App />);
