import React, { useEffect, useState, createContext, useContext } from 'react';
import i18n from '../i18n';
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  isRTL: boolean;
};
const defaultContext: LanguageContextType = {
  language: 'fr',
  setLanguage: () => {},
  isRTL: false
};
const LanguageContext = createContext<LanguageContextType>(defaultContext);
export const useLanguage = () => useContext(LanguageContext);
export const LanguageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [language, setLanguageState] = useState(i18n.language || 'fr');
  const [isRTL, setIsRTL] = useState(language === 'ar');
  const setLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguageState(lang);
    setIsRTL(lang === 'ar');
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    // Add RTL-specific styles when Arabic is selected
    if (lang === 'ar') {
      document.body.classList.add('rtl');
    } else {
      document.body.classList.remove('rtl');
    }
  };
  useEffect(() => {
    setLanguage(language);
  }, [language]);
  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        isRTL
      }}>

      {children}
    </LanguageContext.Provider>);

};