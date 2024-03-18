import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

import global_en from "./locales/en/global.json";
import global_ka from "./locales/ka/global.json";

i18next.init({
  interpolation: { escapeValue: false },
  lng: "auto",
  fallbackLng: "en",
  resources: {
    en: {
      global: global_en,
    },
    es: {
      global: global_ka,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <I18nextProvider i18n={i18next}>
      <App />
      <ToastContainer />
    </I18nextProvider>
  </>
);
