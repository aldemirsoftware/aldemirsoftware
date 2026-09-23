import React, { act } from "react";
import { createRoot } from "react-dom/client";
import { useReducedMotion } from "framer-motion";
import Hero, { heroSlides } from "./Hero";

jest.mock("framer-motion", () => ({ useReducedMotion: jest.fn() }));
jest.mock("./OrbitalScene", () => ({ active }) => <div data-scene-active={active} />);

let container;
let root;
let intersect;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.useFakeTimers();
  useReducedMotion.mockReturnValue(false);
  global.IntersectionObserver = class {
    constructor(callback) { intersect = callback; }
    observe() {}
    disconnect() {}
  };
  container = document.createElement("div");
  document.body.appendChild(container);
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  container.remove();
  jest.useRealTimers();
});
const advance = (time = 8500) => act(() => jest.advanceTimersByTime(time));
const selected = () => container.querySelector('[aria-pressed="true"]').getAttribute("aria-label");

it("rotates messages and keeps a manually selected message in place", () => {
  act(() => root.render(<Hero />));
  expect(selected()).toBe(heroSlides[0].label);
  advance();
  expect(selected()).toBe(heroSlides[1].label);
  act(() => container.querySelector('[aria-label="Dijital dönüşüm"]').click());
  advance(25500);
  expect(selected()).toBe("Dijital dönüşüm");
  act(() => container.querySelector('[aria-label="Otomatik geçişi başlat"]').click());
  advance();
  expect(selected()).toBe("Teknoloji ortaklığı");
  advance(25500);
  expect(selected()).toBe(heroSlides[0].label);
});

it("pauses both the scene and the carousel while the hero is off screen", () => {
  act(() => root.render(<Hero />));
  act(() => intersect([{ isIntersecting: false }]));
  advance(25500);
  expect(selected()).toBe(heroSlides[0].label);
  expect(container.querySelector('[data-scene-active]').dataset.sceneActive).toBe("false");
  act(() => intersect([{ isIntersecting: true }]));
  advance();
  expect(selected()).toBe(heroSlides[1].label);
  expect(container.querySelector('[data-scene-active]').dataset.sceneActive).toBe("true");
});

it("honors reduced motion without disabling manual message selection", () => {
  useReducedMotion.mockReturnValue(true);
  act(() => root.render(<Hero />));
  advance(25500);
  expect(selected()).toBe(heroSlides[0].label);
  expect(container.querySelector('.hero-slide-toggle')).toBeNull();
  act(() => container.querySelector('[aria-label="İş süreçleri"]').click());
  expect(selected()).toBe("İş süreçleri");
});
