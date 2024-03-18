import React from "react";
import { Link } from "react-router-dom";

import { useTheme } from "../context/ThemeContext";

import Toggle from "../components/button/ToggleButton";

/* Icons */
import footerlogo from "../assets/Images/footerlogo.svg";
import InstagramIcon from "../components/icons/InstagramIcon";
import TikTokIcon from "../components/icons/TikTokIcon";
import FacebookIcon from "../components/icons/FacebookIcon";
import YoutubeIcon from "../components/icons/YoutubeIcon";

import { useTranslation } from "react-i18next";

const socialMediaLinks = [
  {
    platform: "Facebook",
    url: "https://www.facebook.com/zoommerge/?ref=page_internal",
    icon: <FacebookIcon />,
  },
  {
    platform: "YouTube",
    url: "https://www.youtube.com/user/WwwZoommerGe",
    icon: <YoutubeIcon />,
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com/zoommer.ge/?hl=en",
    icon: <InstagramIcon />,
  },
  {
    platform: "TikTok",
    url: "https://www.tiktok.com/@zoommer.ge",
    icon: <TikTokIcon />,
  },
];

const Footer = () => {
  const { t, i18n } = useTranslation("global");

  const { isDarkMode } = useTheme();

  return (
    <footer className="bg-lightgrey dark:bg-black">
      <div className="container mx-auto py-14 px-6 mt-[170px]">
        <div className="grid md:grid-cols-12 grid-cols-1 gap-[60px]">
          <div className="lg:col-span-2 md:col-span-4 col-span-12 text-black">
            <h5 className="dark:text-white tracking-wide font-semibold text-[13px] border-b border-primary pb-[20px]">
              {t("header.shopPolicy")}
            </h5>

            <ul className="dark:text-white list-none mt-[30px] space-y-[23px] font-semibold text-[12px]">
              <li>
                <Link
                  to="/about-us"
                  className="transition-all duration-500 ease-in-out"
                >
                  {t("header.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/Terms-and-conditions"
                  className="transition-all duration-500 ease-in-out"
                >
                  {t("header.termsAndConditions")}
                </Link>
              </li>
              <li>
                <Link
                  to="/Corporate-Sales"
                  className="transition-all duration-500 ease-in-out"
                >
                  {t("header.corporateSales")}
                </Link>
              </li>
              <li>
                <Link
                  to="/Delivery-Service"
                  className="transition-all duration-500 ease-in-out"
                >
                  {t("header.deliveryService")}
                </Link>
              </li>
              <li>
                <Link
                  to="/Career"
                  className="transition-all duration-500 ease-in-out"
                >
                  {t("header.career")}
                </Link>
              </li>
              <li>
                <Link
                  to="/Trade-In"
                  className="transition-all duration-500 ease-in-out"
                >
                  {t("header.tradeIn")}
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 md:col-span-4 col-span-12 text-black">
            <div className="flex flex-col gap-[20px]">
              <h5 className="dark:text-white tracking-wide font-semibold text-[13px] border-b border-primary pb-[20px]">
                {t("header.followUs")}
              </h5>
              {socialMediaLinks.map((link, index) => (
                <div className="flex gap-[12px]" key={index}>
                  {link.icon}
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] cursor-pointer text-black dark:text-white font-medium"
                  >
                    {link.platform}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 md:col-span-4 col-span-12 text-black">
            <h5 className="dark:text-white tracking-wide font-semibold text-[13px] border-b border-primary pb-[20px]">
              {t("header.contact")}
            </h5>
            <ul className="dark:text-white list-none mt-6 space-y-[23px] font-semibold text-[12px]">
              <li className="flex gap-[10px]">
                <a
                  href="#"
                  className="transition-all duration-500 ease-in-out flex items-center space-x-2"
                >
                  <span>Info@zoommer.ge</span>
                </a>
              </li>
              <li className="flex gap-[10px]">
                <a
                  href="#"
                  className="transition-all duration-500 ease-in-out flex items-center space-x-2"
                >
                  <span>+995 (32) 2 60 30 60 / *7007</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-500 ease-in-out flex items-center space-x-2"
                >
                  <span>{t("header.branches")}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="transition-all duration-500 ease-in-out flex items-center space-x-2"
                >
                  Zoommer App
                </a>
              </li>
            </ul>
            <div className="mt-[110px]">
              <img
                src={footerlogo}
                alt="Footer logo"
                className="h-[28px] ml-[320px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-end pb-[20px] pr-[50px]">
        <div className=" bg-white p-2 rounded-[30px]">
          <button
            className="mr-[10px] font-bold"
            onClick={() => i18n.changeLanguage("en")}
          >
            EN
          </button>

          <button
            className="font-bold"
            onClick={() => i18n.changeLanguage("es")}
          >
            KA
          </button>
        </div>

        <div className="mt-2">
          <Toggle />
        </div>
      </div>

      <div className="border-[2px] border-white">
        <div className="md:text-left text-center container mx-auto py-7 px-6">
          <p className="mb-0 text-[#666666] text-[13px] font-semibold dark:text-white">
            {t("header.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
