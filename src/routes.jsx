import ChatScreen from "./pages/chat/ChatScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import Explore from "./pages/Explore/Explore";
import ForgotPassword from "./pages/ForgotPassword";
import LandingPage from "./pages/Landing Page/LandingPage";
import Login from "./pages/Login";
import Messages from "./pages/messages/Messages";
import ProfilePage from "./pages/Profile/ProfilePage";
import RateExperience from "./pages/rating/RateExperience";
import Register from "./pages/Register/Register";
import SearchScreen from "./pages/search/SearchScreen";
import Layout from "./layouts/Layout";
import AuthProtection from "./components/AuthProtection";
import { ScheduleSession } from "./pages/Schedule/ScheduleSession";
import Dashboard from "./pages/Dashboard/Dashboard";
import Trade from "./pages/Trade/Trade";
import About from "./pages/About";
import Terms from "./pages/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NotFound from "./pages/NotFound";

const AppRoutes = () => {
  const routes = [
    {
      element: <Layout />,
      children: [
        { path: "/", element: <LandingPage /> },
        {
          element: <ProtectedRoute />,
          children: [
            { path: "profile/:id", element: <ProfilePage /> },
            { path: "explore", element: <Explore /> },
            { path: "messages", element: <Messages /> },
            { path: "rate/:userId", element: <RateExperience /> },
            { path: "search", element: <SearchScreen /> },
            { path: "chat/:userId", element: <ChatScreen /> },
            {
              path: "schedule/:userId",
              element: <ScheduleSession></ScheduleSession>,
            },
            { path: "dashboard", element: <Dashboard /> },
            { path: "rate/:id", element: <RateExperience /> },
            { path: "trade/:id", element: <Trade /> },
            { path: "about", element: <About /> },
            { path: "terms", element: <Terms /> },
            { path: "privacy", element: <PrivacyPolicy /> },

          ],
        },
        {
          element: <AuthProtection />,
          children: [
            { path: "login", element: <Login /> },
            { path: "register", element: <Register /> },
            { path: "resetPassword", element: <ForgotPassword /> },
          ],
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ];

  return routes;
};

export default AppRoutes;
