import React from "react";

import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="container mx-auto py-5 w-[850px] pb-[200px]">
      <h1 className="font-bold border-b-[2px] border-headerbg pb-[20px] mt-[50px]">
        {t("header.aboutUs")}
      </h1>

      <h1 className="text-3xl font-bold text-center mt-[100px]">
        {t("header.aboutUs")}
      </h1>

      <p className="text-[#ff8b11] mb-[100px] text-center">
        {t("header.history")}
      </p>

      <div className="text-black text-[16px]">
        <p>{t("header.zoommerHistory")}</p>

        <p className="mt-[30px]">{t("header.companyExpansion")}</p>

        <p className="mt-[30px]">{t("header.productOffering")}</p>

        <p className="mt-[30px]">{t("header.georgianInvestment")}</p>
      </div>
    </div>
  );
}
