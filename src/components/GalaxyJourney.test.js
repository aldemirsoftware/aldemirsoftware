import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import GalaxyJourney from './GalaxyJourney';
jest.mock('framer-motion', () => ({ useReducedMotion: () => false }));

it('does not allocate the fixed galaxy or scroll/resize work on iPad desktop mode', () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  const ua = jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Macintosh');
  Object.defineProperty(navigator, 'maxTouchPoints', { configurable: true, value: 5 });
  window.matchMedia = jest.fn(() => ({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  const listener = jest.spyOn(window, 'addEventListener');
  const container = document.createElement('div');
  const root = createRoot(container);
  try {
    act(() => root.render(<GalaxyJourney />));
    expect(container.childElementCount).toBe(0);
    expect(listener.mock.calls.some(([event]) => ['scroll', 'resize'].includes(event))).toBe(false);
  } finally {
    act(() => root.unmount());
    ua.mockRestore();
    delete navigator.maxTouchPoints;
    listener.mockRestore();
  }
});
