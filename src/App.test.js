import React, { act } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import App from "./App";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

jest.mock("@emailjs/browser", () => ({ send: jest.fn() }));
jest.mock("./components/Reveal", () => ({ children, className, delay, ...props }) => (
  <div className={className} {...props}>{children}</div>
));
jest.mock("framer-motion", () => {
  const React = require("react");
  return {
    MotionConfig: ({ children }) => <>{children}</>,
    motion: {
      div: React.forwardRef(({ children, ...props }, ref) => (
        <div ref={ref} {...props}>
          {children}
        </div>
      )),
    },
    useReducedMotion: () => true,
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: () => 0,
  };
});
let container;
let root;
beforeEach(() => {
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  global.IS_REACT_ACT_ENVIRONMENT = true;
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  emailjs.send.mockReset();
  localStorage.removeItem("aldemir-contact-next-send");
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});
const render = (element) => act(() => root.render(element));
it("keeps the same audio element through FAQ, 404 and home navigation", () => {
  window.matchMedia.mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  render(<App />);
  const audio = container.querySelector("audio");
  try {
    act(() => container.querySelector('footer a[href="/sss"]').click());
    expect(window.location.pathname).toBe("/sss");
    expect(container.querySelector("audio")).toBe(audio);
    const missingLink = document.createElement("a");
    missingLink.href = "/missing-page";
    container.querySelector(".App").appendChild(missingLink);
    act(() => missingLink.click());
    expect(container.querySelector("h1").textContent).toContain("Rotanın biraz");
    expect(container.querySelector("audio")).toBe(audio);
    act(() => container.querySelector('.hero-actions a[href="/"]').click());
    expect(container.querySelector("#services")).not.toBeNull();
    expect(container.querySelector("audio")).toBe(audio);
  } finally { window.history.replaceState({}, "", "/"); }
});
it("scrolls to the contact form after loading a cross-page contact link", () => {
  window.history.replaceState({}, "", "/#contact-form");
  const originalScroll = HTMLElement.prototype.scrollIntoView;
  const scroll = jest.fn();
  HTMLElement.prototype.scrollIntoView = scroll;
  try {
    render(<App />);
    act(() => window.dispatchEvent(new Event("load")));
    expect(scroll).toHaveBeenCalled();
    expect(document.activeElement.id).toBe("contact-form");
    expect(container.querySelectorAll('a[href="https://x.com/aldemirsoftware"]')).toHaveLength(2);
  } finally {
    HTMLElement.prototype.scrollIntoView = originalScroll;
    window.history.replaceState({}, "", "/");
  }
});
it("shows FAQ on its own space page and links it from the home footer", () => {
  render(<App />);
  expect(container.querySelector('footer a[href="/sss"]').textContent).toBe("S.S.S");
  expect(container.querySelector(".site-faq")).toBeNull();
  window.history.replaceState({}, "", "/sss");
  try {
    render(<App />);
    expect(container.querySelector(".faq-page .hero-space-scene")).not.toBeNull();
    expect(container.querySelectorAll(".site-faq details")).toHaveLength(5);
    expect(container.querySelector("h1").textContent).toContain("Sıkça sorulan");
  } finally {
    window.history.replaceState({}, "", "/");
  }
});
it("renders the shared space scene and home links for unknown URLs", () => {
  window.history.replaceState({}, "", "/olmayan-sayfa");
  try {
    render(<App />);
    expect(container.querySelector("h1").textContent).toContain("Rotanın biraz");
    expect(container.querySelector(".hero-space-scene")).not.toBeNull();
    expect(container.querySelector('.not-found a[href="/"]')).not.toBeNull();
    expect(container.querySelector("#services")).toBeNull();
  } finally {
    window.history.replaceState({}, "", "/");
  }
});
const click = (element) =>
  act(() => element.dispatchEvent(new MouseEvent("click", { bubbles: true })));
const key = (element, value) =>
  act(() =>
    element.dispatchEvent(
      new KeyboardEvent("keydown", { key: value, bubbles: true }),
    ),
  );

it("connects every internal navigation link to an existing section", () => {
  render(<App />);
  const links = [...container.querySelectorAll('a[href^="#"]')];
  expect(links.length).toBeGreaterThan(15);
  links.forEach((link) =>
    expect(container.querySelector(link.getAttribute("href"))).not.toBeNull(),
  );
  expect(container.querySelectorAll("h1")).toHaveLength(1);
  expect(
    container.querySelectorAll('svg[aria-label="Türk bayrağı"]'),
  ).toHaveLength(4);
});

it("closes the mobile menu on Escape and restores trigger focus", () => {
  render(<Navbar />);
  const trigger = container.querySelector(".menu-toggle");
  click(trigger);
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  key(document, "Escape");
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(document.activeElement).toBe(trigger);
  click(trigger);
  click(container.querySelector('a[href="#projects"]'));
  expect(trigger.getAttribute("aria-expanded")).toBe("false");
});

function fillForm() {
  for (const [name, value] of Object.entries({
    name: "Test Kullanıcı",
    email: "test@example.com",
    phone: "+905000000000",
    message: "Test proje açıklaması",
  })) {
    const input = container.querySelector(`[name="${name}"]`);
    const prototype =
      input.tagName === "TEXTAREA"
        ? HTMLTextAreaElement.prototype
        : HTMLInputElement.prototype;
    act(() => {
      Object.getOwnPropertyDescriptor(prototype, "value").set.call(
        input,
        value,
      );
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  }
}
const submit = () =>
  container
    .querySelector("form")
    .dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));

it("prevents duplicate sends and clears the form only after confirmed success", async () => {
  let resolve;
  emailjs.send.mockImplementation(
    () =>
      new Promise((done) => {
        resolve = done;
      }),
  );
  render(<Contact />);
  fillForm();
  act(() => {
    submit();
    submit();
  });
  expect(emailjs.send).toHaveBeenCalledTimes(1);
  expect(emailjs.send.mock.calls[0][2]).toMatchObject({
    name: "Test Kullanıcı",
    email: "test@example.com",
  });
  expect(container.querySelector("fieldset").disabled).toBe(true);
  await act(async () => resolve({ status: 200 }));
  expect(container.querySelector('[role="status"]').textContent).toContain(
    "Mesajınız iletildi",
  );
  expect(container.querySelector('[name="name"]').value).toBe("");
  expect(container.querySelector("fieldset").disabled).toBe(false);
});

it("preserves the message after failure and offers an email alternative", async () => {
  emailjs.send.mockRejectedValue(new Error("Network error"));
  render(<Contact />);
  fillForm();
  await act(async () => submit());
  const feedback = container.querySelector('[role="status"]');
  expect(feedback.textContent).toContain("Mesajınız gönderilemedi");
  expect(feedback.querySelector("a").href).toBe(
    "mailto:info@aldemirsoftware.com",
  );
  expect(container.querySelector('[name="message"]').value).toBe(
    "Test proje açıklaması",
  );
  expect(container.querySelector('button[type="submit"]').disabled).toBe(false);
});
it("switches the entire site without replacing music or clearing the form, and keeps the language on FAQ", () => {
  window.matchMedia.mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  render(<App />);
  const audio = container.querySelector("audio");
  const name = container.querySelector('#name');
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
  act(() => { setter.call(name, 'Language test'); name.dispatchEvent(new Event('input', { bubbles: true })); });
  act(() => container.querySelector('[aria-label="English"]').click());
  expect(localStorage.getItem('aldemir-language')).toBe('en');
  expect(container.querySelector('.nav-contact').textContent).toContain("Let's work together");
  expect(container.querySelector('#name').value).toBe('Language test');
  expect(container.querySelector('audio')).toBe(audio);
  expect(container.querySelector('#services').textContent).toContain('Custom software');
  expect(container.querySelector('#tech').textContent).toContain('Our Visible Services');
  expect(container.querySelector('#contact').textContent).toContain('Send your message');
  act(() => container.querySelector('footer a[href="/sss"]').click());
  expect(container.querySelector('h1').textContent).toContain('Frequently asked');
  expect(container.querySelector('.site-faq').textContent).toContain('What software services do you offer?');
  expect(container.querySelector('audio')).toBe(audio);
  act(() => container.querySelector('[aria-label="Türkçe"]').click());
  expect(container.querySelector('h1').textContent).toContain('Sıkça sorulan');
  window.history.replaceState({}, '', '/');
});
it('supports German throughout home, FAQ and 404 while retaining the audio element', () => {
  window.matchMedia.mockReturnValue({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  render(<App />);
  const audio = container.querySelector('audio');
  try {
    act(() => container.querySelector('[aria-label="Deutsch"]').click());
    expect(localStorage.getItem('aldemir-language')).toBe('de');
    expect(document.documentElement.lang).toBe('de');
    expect(container.querySelector('.nav-contact').textContent).toContain('Zusammenarbeiten');
    expect(container.querySelector('#tech').textContent).toContain('Unsere sichtbaren Leistungen');
    expect(container.querySelector('#contact').textContent).toContain('Nachricht senden');
    expect(container.querySelector('.hero-description br')).toBeNull();
    act(() => container.querySelector('.hero-faq-link').click());
    expect(container.querySelector('.site-faq').textContent).toContain('Welche Softwareleistungen bieten Sie an?');
    const missingLink = document.createElement('a');
    missingLink.href = '/missing-german-page';
    container.querySelector('.App').appendChild(missingLink);
    act(() => missingLink.click());
    expect(container.querySelector('h1').textContent).toContain('vom Kurs abgekommen.');
    expect(container.querySelector('audio')).toBe(audio);
  } finally {
    act(() => container.querySelector('[aria-label="Türkçe"]').click());
    window.history.replaceState({}, '', '/');
  }
});
it('does not repeat initial anchor scrolling when loading finishes late', () => {
  window.history.replaceState({}, '', '/#home');
  const originalScroll = HTMLElement.prototype.scrollIntoView;
  const scroll = jest.fn();
  HTMLElement.prototype.scrollIntoView = scroll;
  const frame = jest.spyOn(window, 'requestAnimationFrame').mockImplementation(() => 1);
  try {
    render(<App />);
    const initialFrame = frame.mock.calls.map(([callback]) => callback).find(callback => callback.name === 'navigateInitially');
    expect(initialFrame).toBeDefined();
    act(() => initialFrame());
    expect(scroll).toHaveBeenCalledTimes(1);
    act(() => window.dispatchEvent(new Event('load')));
    expect(scroll).toHaveBeenCalledTimes(1);
    window.history.replaceState({}, '', '/#contact-form');
    act(() => window.dispatchEvent(new Event('hashchange')));
    expect(scroll).toHaveBeenCalledTimes(2);
  } finally {
    frame.mockRestore();
    HTMLElement.prototype.scrollIntoView = originalScroll;
    window.history.replaceState({}, '', '/');
  }
});

it("persists the 15 minute wait through remounts and permits sending at expiry", async () => {
  jest.useFakeTimers();
  emailjs.send.mockResolvedValue({ status: 200 });
  try {
    render(<Contact />);
    fillForm();
    await act(async () => submit());
    expect(container.querySelector('button[type="submit"]').disabled).toBe(true);
    expect(container.querySelector('#contact-cooldown').textContent).toContain('15:00');
    render(<div />);
    render(<Contact />);
    fillForm();
    await act(async () => submit());
    expect(emailjs.send).toHaveBeenCalledTimes(1);
    act(() => jest.advanceTimersByTime(15 * 60 * 1000));
    expect(container.querySelector('button[type="submit"]').disabled).toBe(false);
    await act(async () => submit());
    expect(emailjs.send).toHaveBeenCalledTimes(2);
  } finally { jest.useRealTimers(); }
});
it("syncs a cooldown written by another tab and blocks direct form submits", async () => {
  render(<Contact />);
  fillForm();
  act(() => {
    localStorage.setItem('aldemir-contact-next-send', String(Date.now() + 900000));
    window.dispatchEvent(new Event('storage'));
  });
  await act(async () => submit());
  expect(emailjs.send).not.toHaveBeenCalled();
  expect(container.querySelector('button[type="submit"]').disabled).toBe(true);
});
