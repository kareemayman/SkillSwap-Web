import ChatScreen from "./pages/chat/ChatScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import { Explore } from "./pages/Explore/Explore";
import { ForgotPassword } from "./pages/ForgotPassword";
import LandingPage from "./pages/Landing Page/LandingPage";
import { Login } from "./pages/Login";
import Messages from "./pages/messages/Messages";
import { Skills } from "./pages/Profile/CreateProfile/Skills/Skills";
import ProfilePage from "./pages/Profile/ProfilePage";
import ProfileReview from "./pages/Profile/CreateProfile/Profile Review/ProfileReview";
import RateExperience from "./pages/rating/RateExperience";
import Register from "./pages/Register/Register";
import SearchScreen from "./pages/search/SearchScreen";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "landing", element: <LandingPage /> },
  { path: "resetPassword", element: <ForgotPassword /> },
  {
    path: "profile",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  // { path: "step2", element: <Skills></Skills> },
  { path: "profileReview", element: <ProfileReview /> },
  { path: "explore", element: <Explore></Explore> },
  { path: "messages", element: <Messages /> },
  { path: "explore", element: <Explore></Explore> },
  { path: "rate/:userId", element: <RateExperience /> },
  { path: "search", element: <SearchScreen /> },
  { path: "chat/:userId", element: <ChatScreen /> },
];

export default routes;
