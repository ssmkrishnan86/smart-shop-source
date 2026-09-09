import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setLanguage } from '../../store/slices/settingsSlice';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const currentLang = useAppSelector((state) => state.settings.language);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    dispatch(setLanguage(lang));
  };

  return (
    <div className="relative flex items-center gap-1.5 text-sm font-medium">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        value={currentLang}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-transparent text-xs font-bold text-foreground focus:outline-none cursor-pointer"
      >
        <option value="en">EN</option>
        <option value="es">ES</option>
      </select>
    </div>
  );
};
