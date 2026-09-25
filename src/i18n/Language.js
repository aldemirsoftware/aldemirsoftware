import { useSyncExternalStore } from "react";
import english from "./en.json";
import german from "./de.json";
const dictionaries = { en: english, de: german };

const listeners = new Set();
let language = "tr";
try { const saved = localStorage.getItem("aldemir-language"); language = ["en", "de"].includes(saved) ? saved : "tr"; } catch { /* Storage may be unavailable in private browsing. */ }
const subscribe = listener => { listeners.add(listener); return () => listeners.delete(listener); };
const snapshot = () => language;
export function setLanguage(next) {
  if (!["tr", "en", "de"].includes(next)) return;
  language = next;
  document.documentElement.lang = next;
  try { localStorage.setItem("aldemir-language", next); } catch { /* Keep the current session selection. */ }
  listeners.forEach(listener => listener());
}
export function translate(value, locale = language) {
  const dictionary = dictionaries[locale];
  if (!dictionary || typeof value !== "string") return value;
  if (Object.prototype.hasOwnProperty.call(dictionary, value)) return dictionary[value];
  const normalized = value.replace(/\s+/g, " ").trim();
  if (Object.prototype.hasOwnProperty.call(dictionary, normalized)) {
    return value.replace(/\S[\s\S]*\S|\S/, dictionary[normalized]);
  }
  // Dynamic accessible labels combine a service/brand name with an action.
  for (const suffix of [" hakkında görüşelim", " web sitesini ziyaret et (yeni sekmede açılır)", " görselini büyüt", " görselini incele", " projenizi konuşalım", " hizmet afişi", " logosu"]) {
    if (value.endsWith(suffix)) return translate(value.slice(0, -suffix.length), locale) + dictionary[suffix];
  }
  if (value.includes(": ")) return value.split(": ").map(part => translate(part, locale)).join(": ");
  return value;
}
export function useTranslation() {
  const locale = useSyncExternalStore(subscribe, snapshot, () => "tr");
  return { language: locale, t: value => translate(value, locale), setLanguage };
}
