import { useTranslation } from "../i18n/Language";
import React, { useState, useEffect, useRef } from "react";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import Brand from "./Brand";
import LanguageSwitcher from "./LanguageSwitcher";

const links = [
  ["services", "Uzmanlıklarımız"],
  ["projects", "İş Ortaklarımız"],
  ["about", "Hakkımızda"],
  ["tech", "Teknolojiler"],
];

export default function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const toggle = useRef(null);
  const header = useRef(null);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        }),
      { rootMargin: "-20% 0px -60% 0px" },
    );
    document
      .querySelectorAll("main > section[id]")
      .forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event) => {
      if (!header.current?.contains(event.target)) setOpen(false);
    };
    const resize = () => {
      if (window.innerWidth > 1000) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    window.addEventListener("resize", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className={`site-header ${scrolled ? "is-scrolled" : ""}`}
    >
      <nav className="container nav-inner" aria-label={t("Ana menü")}>
        <Brand />
        <div className="nav-end">
          <LanguageSwitcher />
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={t(open ? "Menüyü kapat" : "Menüyü aç")}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
        <div
          id="main-navigation"
          className={`nav-links ${open ? "is-open" : ""}`}
          onBlur={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget) &&
              event.relatedTarget !== toggle.current
            )
              setOpen(false);
          }}
        >
          {links.map(([id, label]) => (
            <a
              key={id}
              href={`#${id}`}
              className={active === id ? "is-active" : ""}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {t(label)}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            onClick={() => setOpen(false)}
          >{t("Birlikte çalışalım ")}<FiArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </nav>
    </header>
  );
}
