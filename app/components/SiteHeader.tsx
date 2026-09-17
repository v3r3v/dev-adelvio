"use client";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { advanceHeader, type HeaderScroll } from "./headerScroll";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";

const links = [
  ["#work", "The work"],
  ["#packages", "Packages"],
  ["#about", "The studio"],
] as const;

export function SiteHeader({ assetBase }: { assetBase: string }) {
  const { language, setLanguage, t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const header = ref.current;
    if (!header) return;
    // Cosmetic progressive enhancement, never a capability/interaction restriction.
    // Apple's native SwiftUI material is not a browser component.
    const apple = /Mac|iPhone|iPad|iPod/.test(navigator.platform);
    const blur = CSS.supports("backdrop-filter", "blur(1px)") || CSS.supports("-webkit-backdrop-filter", "blur(1px)");
    header.dataset.material = apple && blur ? "glass" : "solid";
    let frame = 0;
    let maximum = 1;
    let timer = 0;
    let motion: HeaderScroll = { y: Math.max(0, window.scrollY), compact: false, hidden: false, travel: 0, visibleSince: performance.now() };
    const update = () => {
      frame = 0;
      const result = advanceHeader(motion, window.scrollY, maximum, performance.now());
      motion = result.state;
      header.dataset.compact = String(motion.compact);
      header.dataset.hidden = String(motion.hidden);
      window.clearTimeout(timer);
      // One cancellable wake-up lets the floating state breathe even on a fast fling.
      if (result.wakeAfter) timer = window.setTimeout(schedule, result.wakeAfter);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      maximum = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      schedule();
    };
    const resize = new ResizeObserver(measure);
    resize.observe(document.body);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", measure);
    measure();
    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      delete header.dataset.material;
      delete header.dataset.hidden;
    };
  }, []);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    const wide = matchMedia("(min-width: 1101px)");
    const resize = () => {
      if (wide.matches) setMenuOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    wide.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      wide.removeEventListener("change", resize);
    };
  }, [menuOpen]);
  return (
    <header ref={ref} className="site-header wrap" data-menu-open={menuOpen}>
      <div className="header-shell">
        <a
          className="wordmark"
          href="#main"
          aria-label={t("Adelvio, home")}
          onClick={() => setMenuOpen(false)}
        >
          <Brand assetBase={assetBase} />
        </a>
        <nav className="desktop-navigation" aria-label={t("Main navigation")}>
          {links.map(([href, label]) => (
            <a href={href} key={href}>
              {t(label)}
            </a>
          ))}
          <a className="small-cta" href="#project">
            {t("Start a project")}{" "}
            <span aria-hidden="true">
              <Icon />
            </span>
          </a>
        </nav>
        <div className="header-tools">
          <ThemeToggle />
          <div
            className="language-switch"
            role="group"
            aria-label="Idioma / Language"
          >
            <button
              type="button"
              lang="es"
              aria-label="Cambiar a español"
              aria-pressed={language === "es"}
              onClick={() => setLanguage("es")}
            >
              ES
            </button>
            <button
              type="button"
              lang="en"
              aria-label="Switch to English"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
            >
              EN
            </button>
          </div>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={t(menuOpen ? "Close" : "Menu")}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span>{t(menuOpen ? "Close" : "Menu")}</span>
            <Icon name={menuOpen ? "minus" : "plus"} />
          </button>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          hidden={!menuOpen}
          aria-label={t("Mobile navigation")}
        >
          {[...links, ["#project", "Start a project"]].map(([href, label]) => (
            <a href={href} key={href} onClick={() => setMenuOpen(false)}>
              {t(label)}
              <Icon />
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
