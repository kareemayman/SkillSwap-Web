import { Explore } from "./pages/Explore/Explore";
import { ForgotPassword } from "./pages/ForgotPassword";
import LandingPage from "./pages/Landing Page/LandingPage";
import { Login } from "./pages/Login";
import Messages from "./pages/messages/Messages";
import ProfileReview from "./pages/Profile Review/ProfileReview";
import Register from "./pages/Register/Register";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "landing", element: <LandingPage /> },
  { path: "resetPassword", element: <ForgotPassword /> },
  { path: "profileReview", element: <ProfileReview /> },
  { path: "messages", element: <Messages /> },
  { path: "explore", element: <Explore></Explore>}
];

export default routes;
