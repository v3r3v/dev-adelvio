"use client";
/* eslint-disable @next/next/no-img-element -- Shared static assets. */
import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
export function ContactPage({ assetBase }: { assetBase: string }) {
 const { t } = useLanguage();
 return (
        <section className="founder-section contact-page wrap section-space" id="about">
          <figure className="founder-portrait reveal">
            <img
              src={assetBase + "profile_image.jpg"}
              alt={t("Jose Rodriguez, the person behind Adelvio")}
              width={800}
              height={800}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              {t("THE PERSON BEHIND ADELVIO")}{" "}
              <span aria-hidden="true">
                <Icon name="arrow-up-right" />
              </span>
            </figcaption>
          </figure>
          <div className="founder-copy reveal">
            <p className="eyebrow">{t("PERSONAL ATTENTION / PUERTO RICO")}</p>
            <h1>
              {t("Design thinking.")}
              <br />
              <span className="muted-heading">
                {t("Engineering")}
                <br />
                {t("at heart.")}
              </span>
            </h1>
            <p className="founder-intro">
              {t(
                "I’m Jose Rodriguez, the person behind Adelvio, an independent digital studio in Puerto Rico. I bring a computer engineering background to thoughtful web experiences, with clear communication and personal attention from the first conversation to the handoff.",
              )}
            </p>
            <p className="founder-degree">
              {t("B.S. in Computer Engineering")} <span>PUPR</span>
            </p>
            <div className="founder-working-note"><span className="eyebrow">{t("DIRECT BY DESIGN")}</span><p>{t("You speak with the person designing and building your website. We agree on the scope, review the preview together, and make the handoff clear.")}</p></div>
            <a
              className="founder-email"
              href="mailto:jose.rodriguez.velez@gmail.com"
            >
              jose.rodriguez.velez@gmail.com{" "}
              <span aria-hidden="true">
                <Icon name="arrow-up-right" />
              </span>
            </a>
            <a className="founder-phone" href="tel:+17874133348">
              (787) 413-3348{" "}
              <span aria-hidden="true">
                <Icon name="arrow-up-right" />
              </span>
            </a>
            <div className="social-links">
              <a
                href="https://www.linkedin.com/in/jose-g-rodriguez-velez/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn <Icon name="arrow-up-right" />
              </a>
              <a
                href="https://www.instagram.com/jose_rvelez/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram <Icon name="arrow-up-right" />
              </a>
            </div>
          </div>
        </section>
 );
}
