import React, { useEffect, useState } from 'react';
import cookies from 'js-cookie';
import i18n from '../../i18n';
import { Box } from '@mui/system';
import { useSearchParams } from 'react-router-dom';

const ToggleButtonLang: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentLang = cookies.get('i18next') || 'en';
  const [language, setLanguage] = useState<'ar' | 'en'>(currentLang as 'ar' | 'en');

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
    cookies.set('i18next', newLanguage); 
    i18n.changeLanguage(newLanguage); 
    setSearchParams({ lang: newLanguage }); 
    document.documentElement.dir = i18n.dir(newLanguage); 
  };

  useEffect(() => {
    document.documentElement.dir = i18n.dir(language); 
  }, [language]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <button
        className={`language-toggle-btn ${language}`}
        onClick={toggleLanguage}
      >
        <span>{language == 'en' ? 'AR' : 'EN'}</span>
        <div className={`flag ${language === 'ar' ? 'english-flag' : 'egypt-flag'}`}></div>
      </button>
    </Box>
  );
};

export default ToggleButtonLang;
