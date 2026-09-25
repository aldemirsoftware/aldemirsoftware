import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import Reveal from './Reveal';

jest.mock('framer-motion', () => ({
  useReducedMotion: () => false,
  motion: { div: () => { throw new Error('Mobile content must not wait for animation'); } },
}));
it('renders mobile content immediately without an intersection observer or opacity animation', () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.matchMedia = jest.fn(() => ({matches:true, addEventListener:jest.fn(), removeEventListener:jest.fn()}));
  const container = document.createElement('div');
  const root = createRoot(container);
  try {
    act(() => root.render(<Reveal id="visible-section" className="test-section" delay={.5}>Always visible</Reveal>));
    expect(container.querySelector('#visible-section').textContent).toBe('Always visible');
    expect(container.querySelector('#visible-section').style.opacity).toBe('');
  } finally { act(() => root.unmount()); }
});
