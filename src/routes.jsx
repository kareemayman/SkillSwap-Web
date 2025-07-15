import { ForgotPassword } from "./pages/ForgotPassword";
import LandingPage from "./pages/Landing Page/LandingPage";
import { Login } from "./pages/Login";
import { Skills } from "./pages/Profile/Skills";
import Register from "./pages/Register/Register";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "landing", element: <LandingPage /> },
  { path: "resetPassword", element: <ForgotPassword /> },
  { path: "step2", element: <Skills></Skills>}
];

export default routes;
