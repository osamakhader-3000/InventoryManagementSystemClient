import { useTranslation } from 'react-i18next';

export type Translate = {
  T: (title: string) => string;
  ChangeLanguage: (lang: string) => void;
};

export function useTranslations(): Translate {
  const { t, i18n } = useTranslation();

  function changeLanguage(lang: string): void {
    i18n.changeLanguage(lang);
  }

  const T = (title: string): string => {
    return t(title);
  };

  return {
    T,
    ChangeLanguage: changeLanguage,
  };
}