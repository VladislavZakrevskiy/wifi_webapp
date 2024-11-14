import { createBrowserRouter } from "react-router-dom";
import { RateListPage } from "../pages/RateListPage";
import { PaymentPage } from "../pages/PaymentPage";
import { SubmitPage } from "../pages/SubmitPage";
import { NotAuth } from "../pages/NotAuth";
import { RateById } from "../pages/RateById";
import { AuthProvider } from "../components/User";

export const router = createBrowserRouter([
  {
    path: "/ratemarket",
    element: (
      <AuthProvider>
        <RateListPage />
      </AuthProvider>
    ),
  },
  {
    path: "/rate/:id",
    element: (
      <AuthProvider>
        <RateById />
      </AuthProvider>
    ),
  },
  {
    path: "/payment",
    element: (
      <AuthProvider>
        <PaymentPage />
      </AuthProvider>
    ),
  },
  {
    path: "/submit",
    element: (
      <AuthProvider>
        <SubmitPage />
      </AuthProvider>
    ),
  },
  {
    path: "/not-auth",
    element: <NotAuth />,
  },
]);
