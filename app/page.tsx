"use client";
import { useEffect, useState } from "react";
import { LanguageProvider, useLanguage } from "./i18n/LanguageProvider";
import { SiteHeader } from "./components/SiteHeader";
import { Brand } from "./components/Brand";
import { Icon } from "./components/Icon";
import { StudioHero, SystemStory, BookingDemo } from "./components/StudioExperience";
import { WorkViewControl } from "./components/WorkViewControl";
import { ConceptNotes } from "./components/StudioRefinements";
import { QuoteBubble } from "./components/QuoteBubble";
import { InquiryPage } from "./components/InquiryPage";
import { ContactPage } from "./components/ContactPage";
import { useSiteLinks } from "./components/siteLinks";
export type PublicPage = "home" | "contact" | "project";
export default function Home({ assetBase = "/", page = "home" }: { assetBase?: string; page?: PublicPage } = {}) {
 return <LanguageProvider page={page}><HomeContent assetBase={assetBase} page={page} /></LanguageProvider>;
}
function HomeContent({ assetBase, page }: { assetBase: string; page: PublicPage }) {
 const { t } = useLanguage();
 const links = useSiteLinks(assetBase);
 const [workView, setWorkView] = useState<"desktop" | "mobile">("desktop");
 useEffect(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.add("in-view"); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll(".reveal").forEach(el => { el.classList.add("will-reveal"); observer.observe(el); });
  return () => observer.disconnect();
 }, [page]);
 return <>
  <a className="skip-link" href="#main">{t("Skip to content")}</a>
  <SiteHeader assetBase={assetBase} page={page} />
  <main id="main">
   {page === "home" ? <>
    <StudioHero assetBase={assetBase} />
    <SystemStory assetBase={assetBase} />
        <section
          className="work-section"
          id="work"
          aria-labelledby="work-title"
        >
          <div className="wrap">
            <div className="work-heading reveal">
              <p className="eyebrow">{t("02 / SELECTED EXPLORATIONS")}</p>
              <h2 id="work-title">
                {t("The details make")}
                <br />
                <em>{t("the difference.")}</em>
              </h2>
              <p>
                {t("Two original concepts. Explore the design. Try the interaction.")}
              </p>
            </div>
            <article className="work-case">
              <div className="work-case-main">
              <div className="work-case-copy reveal">
                <span className="work-index">{t("01 / DESIGN STUDY")}</span>
                <h3>
                  {t("A presence.")}{" "}
                  <br />
                  {t("With personality.")}
                </h3>
                <p>
                  {t(
                    "A service website with a clear offer, a distinct identity and an easy way to get in touch.",
                  )}
                </p>
                <dl>
                  <div><dt>{t("BUSINESS TYPE")}</dt><dd>{t("Independent service business")}</dd></div>
                  <div>
                    <dt>{t("FOCUS")}</dt>
                    <dd>{t("Visual identity / Web experience")}</dd>
                  </div>
                  <div>
                    <dt>{t("STATUS")}</dt>
                    <dd>{t("Original design concept")}</dd>
                  </div>
                </dl>
              </div>
              <figure className="work-visual reveal" data-device={workView}>
                <WorkViewControl view={workView} onChange={setWorkView} />
                <div
                  className="concept-one"
                  aria-label={t("Editorial services website design concept")}
                >
                  <div className="showcase-browser">
                    <span>
                      <Icon name="window-dots" />
                    </span>
                    <span>{t("CONCEPT / SERVICES")}</span>
                    <span>
                      <Icon name="arrow-up-right" />
                    </span>
                  </div>
                  <div className="folio-nav">
                    <b>THE DETAIL.</b>
                    <span>
                      {t("Good care starts here")}{" "}
                      <Icon name="arrow-up-right" />
                    </span>
                  </div>
                  <div className="folio-body">
                    <div>
                      <span className="mini-kicker">
                        {t("A DIFFERENT PERSPECTIVE")}
                      </span>
                      <h3>
                        {t("Made to")}
                        <br />
                        <em>{t("stand out.")}</em>
                      </h3>
                      <span className="folio-button">
                        {t("Discover the details")}{" "}
                        <Icon name="arrow-up-right" />
                      </span>
                    </div>
                    <div className="folio-object">
                      <div />
                      <span>{t("AN EXPLORATION IN FORM")}</span>
                    </div>
                  </div>
                  <div className="folio-foot">
                    <span>{t("Considered design.")}</span>
                    <span>{t("From first look to next step.")}</span>
                  </div>
                </div>
                <div className="folio-mobile-preview" aria-hidden="true">
                  <span className="folio-mobile-rail"><b>THE DETAIL.</b><Icon name="menu" /></span>
                  <span className="mini-kicker">{t("Good care starts here")}</span>
                  <p>{t("Made to")}<br /><em>{t("stand out.")}</em></p>
                  <div className="folio-mobile-shape" />
                  <span className="folio-mobile-contact">{t("Let’s talk")} <Icon /></span>
                </div>
                <figcaption>
                  <span>{t("THE DETAIL / EDITORIAL WEBSITE CONCEPT")}</span>
                  <span>
                    {t("DESKTOP & MOBILE STUDY")} <Icon name="arrow-up-right" />
                  </span>
                </figcaption>
              </figure>
              </div>
              <ConceptNotes assetBase={assetBase} />
            </article>
            <div className="work-booking reveal">
              <BookingDemo assetBase={assetBase} />
              <div className="booking-case-caption">
                <div>
                  <span className="work-index">
                    {t("02 / INTERACTION STUDY")}
                  </span>
                  <h3>{t("A simpler next step.")}</h3>
                </div>
                <p>
                  {t("An appointment-led mobile experience.")}
                  <br />
                  {t("Tap a day and time to explore the details.")}
                </p>
              </div>
              <ConceptNotes booking assetBase={assetBase} />
            </div>
            <p className="showcase-disclaimer">
              {t(
                "These are original design concepts, not completed client projects. No client outcomes are implied.",
              )}
            </p>
          </div>
        </section>

    <section className="showcase-finale wrap">
     <p className="eyebrow">{t("YOUR NEXT CHAPTER")}</p>
     <h2>{t("What could we")} <em>{t("make for you?")}</em></h2>
     <a className="text-link" href={links.project}>{t("Start a project")} <Icon /></a>
    </section>
   </> : page === "contact" ? <ContactPage assetBase={assetBase} /> : <InquiryPage assetBase={assetBase} />}
  </main>
  <footer className="site-footer public-footer wrap">
   <a className="wordmark" href={links.home}><Brand assetBase={assetBase} /></a>
   <span>{t("Independent digital studio")} / Puerto Rico</span>
   <nav aria-label={t("Footer navigation")}><a href={links.contact}>{t("Contact")} <Icon /></a><a href={links.project}>{t("Start a project")} <Icon /></a></nav>
  </footer>
  {page !== "project" && <QuoteBubble assetBase={assetBase} />}
 </>;
}
