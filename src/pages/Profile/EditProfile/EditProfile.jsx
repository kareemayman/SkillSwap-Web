import React from "react";
import { useTranslation } from "react-i18next";

export default function EditProfile() {
  const { t } = useTranslation();

  return <div>{t("EditProfile")}</div>;
}
