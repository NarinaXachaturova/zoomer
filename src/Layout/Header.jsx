import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

/* Context */
import { useCart } from "../context/CartContext";

/* Hooks */
import useScrollDirection from "../hooks/UseScrollDirection";

/* Buttons */
import Search from "../components/search/Search";
import Button from "../components/button/Button";

/* Icons */
import Logo from "../assets/Images/Logo.svg";

import DotsIcon from "../components/icons/DotsIcon";
import Login from "../components/modals/Login";
import PhoneIcon from "../components/icons/PhoneIcon";
import CartIcon from "../components/icons/CartIcon";
import UserIcon from "../components/icons/UserIcon";

export default function Header() {
  const { t, i18n } = useTranslation("global");
  const navigate = useNavigate();
  const { cartProducts } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState();
  const scrollDirection = useScrollDirection();

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleLogin = () => setIsLoggedIn(true);
  const handleProfilePage = () => navigate("/profile");

  return (
    <header
      className={`sticky ${
        scrollDirection === "down" ? "-top-24" : "top-0"
      } transition-all duration-500 pb-[50px] z-50`}
    >
      <div className="bg-primary py-2 dark:bg-black">
        <div className="container flex items-center justify-between">
          <div className="flex gap-[10px]">
            <PhoneIcon />
            <span className="flex cursor-pointer transition-transform hover:scale-110 text-white font-bold text-[12px] dark:text-white">
              *7007 / +995 (32) 2 60 30 60
            </span>
          </div>

          <div className="text-[#faccbd] flex gap-4 text-[12px] font-bold">
            <Link to="/page1" className="hover:text-white dark:text-white">
              {t("header.shopPolicy")}
            </Link>
            <Link
              to="/installment"
              className="hover:text-white  dark:text-white"
            >
              {t("header.installment")}
            </Link>
            <Link to="/" className="hover:text-white dark:text-white">
              {t("header.career")}
            </Link>
            <Link to="/Trade-In" className="hover:text-white dark:text-white">
              {t("header.tradeIn")}
            </Link>
            <Link to="/" className="hover:text-white dark:text-white">
              {t("header.branches")}
            </Link>
            <Link to="/" className="hover:text-white dark:text-white">
              {t("header.allOffers")}
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-lightgrey dark:bg-black w-full lg:w-[100%] h-[70px] flex justify-center lg:h-[70px] items-center">
        <div className="container flex flex-row items-center justify-between">
          <div>
            <Link to="/">
              <img
                src={Logo}
                alt="Zoommer logo"
                className="lg:w-[151px] h-[40px] cursor-pointer sm:w-[120px] md:w-[130px]"
              />
            </Link>
          </div>
          <div className="flex gap-[25px]">
            <Link
              to="/categories"
              className="container flex flex-row items-center justify-between gap-[10px]"
            >
              <Button
                className="text-white bg-primary sm:w-[110px] sm:gap-1 lg:w-[130px] lg:gap-3"
                icon={<DotsIcon />}
              >
                {t("header.navigation")}
              </Button>
            </Link>

            <Search />

            <div className="flex items-center gap-4 relative">
              <Link to="/cart">
                <Button
                  className="bg-white text-black"
                  children={"კალათა"}
                  icon={<CartIcon width="22px" height="22px" />}
                >
                  {t("header.cart")}
                </Button>
              </Link>

              <span className="bg-primary text-white text-[15px] rounded-[50px] top-[-10px] right-[140px] w-[22px] h-[22px] relative text-center">
                {cartProducts.reduce((total, item) => total + item.count, 0)}
              </span>

              {localStorage.getItem("accessToken") ? (
                <Button
                  className="bg-white text-black sm:w-[90px] lg:w-[130px]"
                  children={"პროფილი"}
                  icon={<UserIcon />}
                  onClick={handleProfilePage}
                >
                  {t("header.profile")}
                </Button>
              ) : (
                <Button
                  className="bg-white text-black sm:w-[100px] lg:w-[130px]"
                  children={"შესვლა"}
                  icon={<UserIcon />}
                  onClick={handleShow}
                >
                  {t("header.login")}
                </Button>
              )}
              <Login
                showModal={showModal}
                handleClose={handleClose}
                onLoggedIn={handleLogin}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
