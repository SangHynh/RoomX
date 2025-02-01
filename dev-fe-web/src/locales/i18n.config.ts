import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import vi from "@/locales/vi/common.json";
import en from "@/locales/en/common.json";

// Lấy ngôn ngữ từ localStorage, nếu không có thì mặc định là 'vi'
const savedLanguage = localStorage.getItem("language") || "vi";

i18next.use(initReactI18next).init({
  lng: savedLanguage,
  fallbackLng: "vi",
  resources: {
    en: {
      translation: en,
    },
    vi: {
      translation: vi,
    },
  },
  interpolation: { escapeValue: false },
});

export default i18next;