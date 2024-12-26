

import { useEffect } from "react";
import cookies from 'js-cookie'
import i18n from "./i18n";
import { useTranslation } from "react-i18next";


function Test() {
  const lng = cookies.get('i18next') || 'en'
  useEffect(()=>{
    window.document.dir = i18n.dir()
  },[lng])
  const { t } = useTranslation();

  return <div>
  <h2>{t('testKey')}</h2>
  <button onClick={()=>i18n.changeLanguage('ar')}>Ar</button>
  <button  onClick={()=>i18n.changeLanguage('en')}>En</button>
  </div>
}

export default Test