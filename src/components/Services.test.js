import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useReducedMotion } from "framer-motion";
import Services from "./Services";

jest.mock("framer-motion", () => ({ useReducedMotion: jest.fn() }));
jest.mock("./Reveal", () => ({ children, className }) => <div className={className}>{children}</div>);
let container;
let root;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  useReducedMotion.mockReturnValue(false);
  HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  HTMLDialogElement.prototype.close = function () { this.removeAttribute("open"); };
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => root.render(<Services />));
});
afterEach(() => { act(() => root.unmount()); container.remove(); });
const click = (element) => act(() => element.click());

it("opens the selected artwork, zooms it and restores focus and scrolling on Escape", () => {
  const trigger = container.querySelector('#solution-data .solution-expand');
  trigger.focus();
  click(trigger);
  expect(container.querySelector('dialog[open] img').getAttribute('src')).toBe('/images/data.jpg');
  expect(document.body.style.overflow).toBe('hidden');
  click(container.querySelector('[aria-label="Görsele yakınlaş"]'));
  expect(container.querySelector('.solution-preview-scroll').classList.contains('is-zoomed')).toBe(true);
  click(container.querySelector('[aria-label="Görseli ekrana sığdır"]'));
  expect(container.querySelector('.solution-preview-scroll').classList.contains('is-zoomed')).toBe(false);
  act(() => container.querySelector('dialog').dispatchEvent(new Event('cancel', { bubbles: false, cancelable: true })));
  expect(container.querySelector('dialog')).toBeNull();
  expect(document.body.style.overflow).toBe('');
  expect(document.activeElement).toBe(trigger);
});

it("keeps all six navigation targets and service descriptions available without opening a preview", () => {
  const links = [...container.querySelectorAll('.solution-navigation a')];
  expect(links).toHaveLength(6);
  links.forEach(link => {
    const feature = container.querySelector(link.getAttribute('href'));
    expect(feature.querySelector('h3').textContent.length).toBeGreaterThan(10);
    expect(feature.querySelectorAll('li')).toHaveLength(3);
    expect(feature.querySelector('.solution-cta').getAttribute('href')).toBe('#contact');
  });
});

it("only tilts artwork for a mouse when motion is allowed", () => {
  const stage = container.querySelector('.solution-stage');
  const frame = stage.querySelector('.solution-poster-frame');
  stage.getBoundingClientRect = () => ({ top: 0, left: 0, width: 400, height: 500 });
  const move = (pointerType) => act(() => {
    const event = new MouseEvent('pointermove', { bubbles: true, clientX: 300, clientY: 100 });
    Object.defineProperty(event, 'pointerType', { value: pointerType });
    stage.dispatchEvent(event);
  });
  move('touch');
  expect(frame.style.getPropertyValue('--tilt-y')).toBe('');
  move('mouse');
  expect(frame.style.getPropertyValue('--tilt-y')).toBe('1.5deg');
  useReducedMotion.mockReturnValue(true);
  act(() => root.render(<Services />));
  frame.style.removeProperty('--tilt-y');
  move('mouse');
  expect(frame.style.getPropertyValue('--tilt-y')).toBe('');
});
