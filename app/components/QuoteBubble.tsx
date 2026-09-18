import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import { useSiteLinks } from "./siteLinks";

export function QuoteBubble({ assetBase }: { assetBase: string }) {
  const { t } = useLanguage();
  const links = useSiteLinks(assetBase);
  return <a className="quote-bubble" href={links.project} aria-label={t("Get a quote")}>
    <span className="quote-bubble-icon"><Icon name="message" /></span>
    <span>{t("Get a quote")}</span>
  </a>;
}
