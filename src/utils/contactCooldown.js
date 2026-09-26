// Convenience protection for the browser UI; not a server-side security boundary.
export const CONTACT_COOLDOWN_MS = 15 * 60 * 1000;
export const CONTACT_COOLDOWN_KEY = 'aldemir-contact-next-send';
let fallbackUntil = 0;

export function remainingContactSeconds() {
  let until = fallbackUntil;
  try { until = Number(localStorage.getItem(CONTACT_COOLDOWN_KEY)) || 0; } catch {}
  return Number.isFinite(until) ? Math.max(0, Math.ceil((until - Date.now()) / 1000)) : 0;
}

export function startContactCooldown() {
  fallbackUntil = Date.now() + CONTACT_COOLDOWN_MS;
  try { localStorage.setItem(CONTACT_COOLDOWN_KEY, String(fallbackUntil)); } catch {}
  window.dispatchEvent(new Event('contact-cooldown'));
}

export function withContactLock(send) {
  // Serialize cooperating tabs, then recheck the persisted deadline inside the lock.
  return navigator.locks?.request
    ? navigator.locks.request('aldemir-contact-send', send)
    : send();
}
