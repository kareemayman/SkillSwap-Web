import { useRoutes } from "react-router-dom";
import routes from "./routes";
import "./i18n";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const App = () => {
  const routing = useRoutes(routes);
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
    document.documentElement.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return routing;
};

export default App;
