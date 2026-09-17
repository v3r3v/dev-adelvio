"use client";
import { useSyncExternalStore } from "react";
import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";

function subscribe(notify: () => void) {
  const storage = (event: StorageEvent) => {
    if (event.key !== "adelvio-theme" && event.key !== null) return;
    document.documentElement.dataset.theme = event.newValue === "dark" ? "dark" : "light";
    notify();
  };
  window.addEventListener("adelvio-theme-change", notify);
  window.addEventListener("storage", storage);
  return () => {
    window.removeEventListener("adelvio-theme-change", notify);
    window.removeEventListener("storage", storage);
  };
}
const snapshot = () => document.documentElement.dataset.theme === "dark";
const serverSnapshot = () => false;

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const { t } = useLanguage();
  const label = t(dark ? "Switch to light theme" : "Switch to dark theme");
  return <button type="button" className="theme-toggle" aria-label={label} title={label}
    onClick={() => {
      const theme = dark ? "light" : "dark";
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem("adelvio-theme", theme); } catch { /* Still works for this visit. */ }
      window.dispatchEvent(new Event("adelvio-theme-change"));
    }}>
    <Icon name={dark ? "sun" : "moon"} />
  </button>;
}
