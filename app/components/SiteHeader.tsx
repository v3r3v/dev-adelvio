"use client";
import { Brand } from "./Brand";
import { ThemeToggle } from "./ThemeToggle";
import { advanceHeader, type HeaderScroll } from "./headerScroll";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./Icon";
import { useLanguage } from "../i18n/LanguageProvider";
import { useSiteLinks } from "./siteLinks";

export function SiteHeader({ assetBase, page = "home" }: { assetBase: string; page?: "home" | "contact" | "project" }) {
  const { language, setLanguage, t } = useLanguage();
  const routes = useSiteLinks(assetBase);
  const links = [[routes.work, "The work"], [routes.contact, "Contact"]] as const;
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
    // Clicking a button can retain DOM focus (and even :focus-visible after
    // keyboard use). Pin navigation only while the visitor is using a keyboard.
    let keyboard = header.matches(":has(:focus-visible)");
    const syncFocus = () => {
      header.dataset.keyboardFocus = String(keyboard && header.contains(document.activeElement));
    };
    const pointer = () => { keyboard = false; syncFocus(); };
    const key = (event: KeyboardEvent) => {
      if (["Shift", "Control", "Alt", "Meta"].includes(event.key)) return;
      keyboard = true;
      syncFocus();
    };
    const focusOut = (event: FocusEvent) => {
      header.dataset.keyboardFocus = String(keyboard && event.relatedTarget instanceof Node && header.contains(event.relatedTarget));
    };
    document.addEventListener("pointerdown", pointer, true);
    document.addEventListener("keydown", key, true);
    header.addEventListener("focusin", syncFocus);
    header.addEventListener("focusout", focusOut);
    syncFocus();
    let frame = 0;
    let maximum = 1;
    let height = 88;
    let motion: HeaderScroll = { y: Math.max(0, window.scrollY), closed: 0 };
    const update = () => {
      frame = 0;
      motion = advanceHeader(motion, window.scrollY, maximum, height);
      header.dataset.compact = String(motion.y > 52);
      header.dataset.hidden = String(motion.closed >= height);
      header.style.setProperty("--nav-close", `${motion.closed}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      height = header.offsetHeight;
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
      resize.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", measure);
      document.removeEventListener("pointerdown", pointer, true);
      document.removeEventListener("keydown", key, true);
      header.removeEventListener("focusin", syncFocus);
      header.removeEventListener("focusout", focusOut);
      delete header.dataset.keyboardFocus;
      delete header.dataset.material;
      delete header.dataset.hidden;
      header.style.removeProperty("--nav-close");
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
          href={routes.home}
          aria-label={t("Adelvio, home")}
          onClick={() => setMenuOpen(false)}
        >
          <Brand assetBase={assetBase} />
        </a>
        <nav className="desktop-navigation" aria-label={t("Main navigation")}>
          {links.map(([href, label]) => (
            <a href={href} key={href} aria-current={page === "contact" && href === routes.contact ? "page" : undefined}>
              {t(label)}
            </a>
          ))}
          <a className="small-cta" href={routes.project} aria-current={page === "project" ? "page" : undefined}>
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
          {[...links, [routes.project, "Start a project"]].map(([href, label]) => (
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
