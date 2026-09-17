"use client";
import { useLanguage } from "../i18n/LanguageProvider";
import { Icon } from "./Icon";

export function WorkViewControl({ view, onChange }: { view: "desktop" | "mobile"; onChange: (value: "desktop" | "mobile") => void }) {
  const { t } = useLanguage();
  return <div className="work-view-control" role="group" aria-label={t("Inspect the concept")}>
    <span>{t("Explore the interface")}</span>
    <div>{(["desktop", "mobile"] as const).map(value => <button key={value} type="button" aria-pressed={view === value} onClick={() => onChange(value)}><Icon name={value === "desktop" ? "desktop" : "phone"} />{t(value === "desktop" ? "Desktop" : "Mobile")}</button>)}</div>
  </div>;
}
