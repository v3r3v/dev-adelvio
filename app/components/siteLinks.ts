import { useLanguage } from "../i18n/LanguageProvider";

export function useSiteLinks(assetBase: string) {
  const { language } = useLanguage();
  const home = `${assetBase}?lang=${language}`;
  return { home, work: `${home}#work`, contact: `${assetBase}contact/?lang=${language}`, project: `${assetBase}start-project/?lang=${language}` };
}
