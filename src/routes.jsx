import ChatScreen from "./pages/chat/ChatScreen";
import { Explore } from "./pages/Explore/Explore";
import { ForgotPassword } from "./pages/ForgotPassword";
import LandingPage from "./pages/Landing Page/LandingPage";
import { Login } from "./pages/Login";
import Messages from "./pages/messages/Messages";
import ProfileReview from "./pages/Profile Review/ProfileReview";
import RateExperience from "./pages/rating/RateExperience";
import Register from "./pages/Register/Register";
import SearchScreen from "./pages/search/SearchScreen";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "landing", element: <LandingPage /> },
  { path: "resetPassword", element: <ForgotPassword /> },
  { path: "profileReview", element: <ProfileReview /> },
  { path: "messages", element: <Messages /> },
  { path: "explore", element: <Explore></Explore> },
  { path: "rate/:userId", element: <RateExperience /> },
  { path: "search", element: <SearchScreen /> },
  { path: "chat/:userId", element: <ChatScreen /> },

];

export default routes;
