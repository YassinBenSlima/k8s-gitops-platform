import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useTranslation } from '../../../node_modules/react-i18next';
import { motion } from 'framer-motion';
import { Globe2Icon } from 'lucide-react';
const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const languages = [
    {
      code: 'en',
      name: t('language.en'),
      flag: '🇬🇧'
    },
    {
      code: 'fr',
      name: t('language.fr'),
      flag: '🇫🇷'
    },
    {
      code: 'ar',
      name: t('language.ar'),
      flag: '🇸🇦'
    }];

  const currentLanguage = languages.find((lang) => lang.code === language);
  return (
    <div className="relative">
      <motion.button
        whileHover={{
          scale: 1.05
        }}
        whileTap={{
          scale: 0.95
        }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        aria-expanded={isOpen}>

        <Globe2Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{currentLanguage?.flag}</span>
      </motion.button>
      {isOpen &&
        <motion.div
          initial={{
            opacity: 0,
            y: 10
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          exit={{
            opacity: 0,
            y: 10
          }}
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">

          <div className="py-1">
            {languages.map((lang) =>
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`${language === lang.code ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100`}>

                <span className="mr-2">{lang.flag}</span>
                {lang.name}
              </button>
            )}
          </div>
        </motion.div>
      }
    </div>);

};
export default LanguageSelector;