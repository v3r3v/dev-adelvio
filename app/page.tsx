"use client";
import { LanguageProvider, useLanguage } from "./i18n/LanguageProvider";
import { SiteHeader } from "./components/SiteHeader";
import { Brand } from "./components/Brand";
import { Icon } from "./components/Icon";
import { QuoteBubble } from "./components/QuoteBubble";
import { InquiryPage } from "./components/InquiryPage";
import { ContactPage } from "./components/ContactPage";
import { FusionHome } from "./components/FusionHome";
import { useSiteLinks } from "./components/siteLinks";
export type PublicPage = "home" | "contact" | "project";
export default function Home({assetBase="/",page="home"}: {assetBase?:string;page?:PublicPage}={}) {
  return <LanguageProvider page={page}><HomeContent assetBase={assetBase} page={page}/></LanguageProvider>;
}
function HomeContent({assetBase,page}: {assetBase:string;page:PublicPage}) {
  const {t} = useLanguage();
  const links = useSiteLinks(assetBase);
  return <div className="adelvio-public" data-page={page}>
    <a className="skip-link" href="#main">{t("Skip to content")}</a>
    <SiteHeader assetBase={assetBase} page={page}/>
    <main id="main">{page==="home"?<FusionHome assetBase={assetBase}/>:page==="contact"?<ContactPage assetBase={assetBase}/>:<InquiryPage assetBase={assetBase}/>}</main>
    <footer className="site-footer public-footer wrap">
      <a className="wordmark" href={links.home}><Brand assetBase={assetBase}/></a>
      <span>{t("Independent digital studio")} / Puerto Rico</span>
      <nav aria-label={t("Footer navigation")}><a href={links.contact}>{t("Contact")} <Icon/></a><a href={links.project}>{t("Start a project")} <Icon/></a></nav>
    </footer>
    {page!=="project"&&<QuoteBubble assetBase={assetBase}/>}
  </div>;
}
