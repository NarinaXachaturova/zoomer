import React from "react";

import { useTranslation } from "react-i18next";

export default function InfoTerms() {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="container mx-auto py-5 w-[1000px] pb-[200px]">
      <h1 className="font-bold border-b-[2px] border-headerbg pb-[20px] mt-[50px]">
        {t("header.companyWebpageTerms")}
      </h1>
      <h1 className="mt-[20px] font-bold text-[18px] text-center">
        {t("header.preamble")}
      </h1>
      <div className="text-black text-[16px]">
        <h1 className="font-bold mt-[40px]">
          {" "}
          {t("header.currentTradingPolicy")}
        </h1>

        <p className="mt-[17px]">{t("header.currentTradingPolicyPurpose")}</p>

        <p className="mt-[17px]">{t("header.currentTradingPolicyDetails")}</p>

        <p className="mt-[17px]">{t("header.goodsDefinition")}</p>

        <p className="mt-[17px]">{t("header.goodsDefinitionDetails")}</p>
      </div>
    </div>
  );
}
