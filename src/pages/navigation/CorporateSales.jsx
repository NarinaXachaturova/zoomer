import React from "react";

import { useTranslation } from "react-i18next";

export default function AboutUs() {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="container mx-auto py-5 w-[1000px] pb-[200px]">
      <h1 className="font-bold border-b-[2px] border-headerbg pb-[20px] mt-[50px]">
        {t("header.corporateSales")}
      </h1>

      <h1 className="text-3xl font-bold text-center mt-[100px]">
        {t("header.corporateClients")}
      </h1>

      <p className="text-[#ff8b11] mt-[50px] mb-[60px] text-center">
        {t("header.personalManagerService")}
      </p>

      <div className="text-black text-[16px]">
        <p>{t("header.corporateClientsPersonalManagers")}</p>

        <p className="mt-[30px]">
          {t("header.corporateClientsPaymentOptions")}
        </p>

        <p className="mt-[30px]">{t("header.orderTechnicalEquipment")}</p>

        <p className="mt-[30px]">{t("header.orderDeliveryService")}</p>

        <h1 className="font-bold mt-[50px]">
          {t("header.thankYouForChoosingUs")}
        </h1>
      </div>
    </div>
  );
}
