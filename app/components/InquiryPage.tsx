"use client";
import { useState } from "react";
import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import { useSiteLinks } from "./siteLinks";

export function InquiryPage({ assetBase }: { assetBase: string }) {
  const { t } = useLanguage();
  const links = useSiteLinks(assetBase);
  const [notice, setNotice] = useState("");
  function prepare(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = [
      "Adelvio — " + t("Project inquiry"), "",
      t("Your name") + ": " + form.get("name"),
      t("Email address") + ": " + form.get("email"),
      t("Phone (optional)") + ": " + form.get("phone"), "",
      t("Business name") + ": " + form.get("business"),
      t("Website or social link (optional)") + ": " + form.get("website"),
      t("Desired timing (optional)") + ": " + form.get("timing"), "",
      t("Tell us about your idea") + ":", String(form.get("idea")),
    ].join("\n");
    const action = ((event.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null)?.value;
    if (action === "download") {
      const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
      const link = document.createElement("a");
      link.href = url; link.download = "adelvio-project-inquiry.txt"; link.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice("Your inquiry is ready to save. Nothing has been sent.");
      return;
    }
    window.location.href = "mailto:jose.rodriguez.velez@gmail.com?subject=" + encodeURIComponent("Adelvio — " + t("Project inquiry") + " — " + form.get("business")) + "&body=" + encodeURIComponent(text);
    setNotice("Your email app will open a draft. Review and send it there. You can also save your inquiry and email it to Jose.");
  }
  return <section className="inquiry-page wrap" aria-labelledby="inquiry-title">
    <div className="inquiry-intro">
      <p className="eyebrow">{t("START A PROJECT")}</p>
      <h1 id="inquiry-title">{t("Every good thing")}<br /><em>{t("starts with an idea.")}</em></h1>
      <p>{t("Tell us what you have in mind. We’ll shape the scope around your business.")}</p>
      <a className="text-link" href={links.contact}>{t("Prefer a conversation?")} <Icon /></a>
      <div className="inquiry-art" aria-hidden="true"><span>01</span><i /><span>02</span><i /><Icon name="message" /></div>
    </div>
    <form className="inquiry-form" onSubmit={prepare} action="mailto:jose.rodriguez.velez@gmail.com" method="post" encType="text/plain" aria-label={t("Project inquiry")}>
      <fieldset><legend><span>01</span>{t("A little about you")}</legend>
        <div className="inquiry-fields">
          <label>{t("Your name")}<input name="name" autoComplete="name" required maxLength={100} /></label>
          <label>{t("Email address")}<input name="email" type="email" autoComplete="email" required maxLength={180} /></label>
          <label className="field-wide">{t("Phone (optional)")}<input name="phone" type="tel" autoComplete="tel" maxLength={40} /></label>
        </div>
      </fieldset>
      <fieldset><legend><span>02</span>{t("Your business & your idea")}</legend>
        <label>{t("Business name")}<input name="business" autoComplete="organization" required maxLength={150} /></label>
        <label>{t("Website or social link (optional)")}<input name="website" type="text" inputMode="url" maxLength={300} placeholder="https://" /></label>
        <label>{t("Tell us about your idea")}<textarea name="idea" required rows={5} maxLength={2500} placeholder={t("What do you do, what would you like to create, and what should it help your business achieve?")} /></label>
        <label>{t("Desired timing (optional)")}<input name="timing" maxLength={100} placeholder={t("A date, a season, or still exploring")} /></label>
      </fieldset>
      <p className="inquiry-privacy">{t("This form prepares an email draft. Your details are not submitted or saved to a database by this page.")}</p>
      <button className="button blue" type="submit" value="email">{t("Prepare my inquiry")} <Icon /></button>
      <button className="inquiry-download text-link" type="submit" value="download">{t("Save a copy instead")} <Icon name="arrow-down" /></button>
      <p className="inquiry-status" role="status">{notice ? t(notice) : t("Review the draft in your email app and send it when you’re ready.")}</p>
    </form>
  </section>;
}
