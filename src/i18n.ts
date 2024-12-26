import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

i18n
  .use(initReactI18next) 
  .use(LanguageDetector)
  .use(HttpApi) 
  .init({
    fallbackLng: "en", 
    detection: {
      order: ["cookie", "localStorage", "sessionStorage", "htmlTag", "navigator", "path", "subdomain"],
      caches: ["cookie"], 
    },
    backend: {
      loadPath: '/locale/{{lng}}/{{ns}}.json', 
    },
    react: {
      useSuspense: true,  
      bindI18n: "languageChanged loaded", 
      bindI18nStore: "added removed", 
    },
    saveMissing: true, 
    preload: ['en', 'ar'],
  });


export default i18n;