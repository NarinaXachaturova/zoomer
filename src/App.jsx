import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

/* Context */
import { CartProvider } from "./context/CartContext";
import { LikedProvider } from "./context/LikedContext";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./context/ThemeContext";

/* Layout */
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";

/* Pages */
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductsPage from "./pages/ProductsPage";
import Categories from "./components/categories/Categories";
import NavigationPage from "./pages/NavigationPage";
import PaymentPage from "./pages/PaymentPage";

import AboutUs from "./pages/Navigation/AboutUs";
import InfoTerms from "./pages/Navigation/InfoTerms";
import CorporateSales from "./pages/Navigation/CorporateSales";
import DeliveryService from "./pages/Navigation/DeliveryService";
import Career from "./pages/Navigation/InfoCareer";
import TradeIn from "./pages/Navigation/TradeIn";

export default function App() {
  const { t } = useTranslation("global");

  return (
    <ThemeProvider>
      <LikedProvider>
        <CartProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/categories" element={<NavigationPage />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/Terms-and-conditions" element={<InfoTerms />} />
              <Route path="/Corporate-Sales" element={<CorporateSales />} />
              <Route path="/Delivery-Service" element={<DeliveryService />} />
              <Route path="/Career" element={<Career />} />
              <Route path="/trade-in" element={<TradeIn />} />

              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </LikedProvider>
    </ThemeProvider>
  );
}
