import { useSyncExternalStore } from "react";
import english from "./en.json";

const listeners = new Set();
let language = "tr";
try { language = localStorage.getItem("aldemir-language") === "en" ? "en" : "tr"; } catch { /* Storage may be unavailable in private browsing. */ }
const subscribe = listener => { listeners.add(listener); return () => listeners.delete(listener); };
const snapshot = () => language;
export function setLanguage(next) {
  if (!["tr", "en"].includes(next)) return;
  language = next;
  document.documentElement.lang = next;
  try { localStorage.setItem("aldemir-language", next); } catch { /* Keep the current session selection. */ }
  listeners.forEach(listener => listener());
}
export function translate(value, locale = language) {
  if (locale !== "en" || typeof value !== "string") return value;
  if (Object.prototype.hasOwnProperty.call(english, value)) return english[value];
  const normalized = value.replace(/\s+/g, " ").trim();
  if (Object.prototype.hasOwnProperty.call(english, normalized)) {
    return value.replace(/\S[\s\S]*\S|\S/, english[normalized]);
  }
  // Dynamic accessible labels combine a service/brand name with an action.
  for (const suffix of [" hakkında görüşelim", " web sitesini ziyaret et (yeni sekmede açılır)", " görselini büyüt", " görselini incele", " projenizi konuşalım", " hizmet afişi", " logosu"]) {
    if (value.endsWith(suffix)) return translate(value.slice(0, -suffix.length), locale) + english[suffix];
  }
  if (value.includes(": ")) return value.split(": ").map(part => translate(part, locale)).join(": ");
  return value;
}
export function useTranslation() {
  const locale = useSyncExternalStore(subscribe, snapshot, () => "tr");
  return { language: locale, t: value => translate(value, locale), setLanguage };
}
