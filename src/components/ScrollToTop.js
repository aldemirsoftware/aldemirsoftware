import { useTranslation } from "../i18n/Language";
import React, { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
export default function ScrollToTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    const update = () => setVisible(window.scrollY > window.innerHeight);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    visible && (
      <button
        className="scroll-to-top"
        type="button"
        aria-label={t("Sayfanın başına dön")}
        onClick={() =>
          window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
        }
      >
        <FiArrowUp aria-hidden="true" />
      </button>
    )
  );
}
