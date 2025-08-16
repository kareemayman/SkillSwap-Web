import { useRoutes } from "react-router-dom";
import AppRoutes from "./routes";
import "./i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import "./components/btn.css"

const App = () => {
  const routing = useRoutes(AppRoutes());
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return (
    <>
      <ThemeProvider> {routing}</ThemeProvider>
    </>
  );
};

export default App;
