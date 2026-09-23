import React, { act } from "react";
import { createRoot } from "react-dom/client";
import emailjs from "@emailjs/browser";
import App from "./App";
import Contact from "./components/Contact";
import Navbar from "./components/Navbar";

jest.mock("@emailjs/browser", () => ({ send: jest.fn() }));
jest.mock("./components/Reveal", () => ({ children, className }) => (
  <div className={className}>{children}</div>
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
  global.IS_REACT_ACT_ENVIRONMENT = true;
  global.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  emailjs.send.mockReset();
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
});
const render = (element) => act(() => root.render(element));
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
  const trigger = container.querySelector("button");
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
