import { ForgotPassword } from "./pages/ForgotPassword";
import LandingPage from "./pages/Landing Page/LandingPage";
import { Login } from "./pages/Login";
import Register from "./pages/Register/Register";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "landing", element: <LandingPage /> },
  { path: "resetPassword", element: <ForgotPassword /> },
];

export default routes;
