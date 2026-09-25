import React, { act } from 'react';
import { createRoot } from 'react-dom/client';
import OrbitalScene from './OrbitalScene';

it('uses the photographic fallback on touch devices without allocating WebGL', () => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  window.matchMedia = jest.fn(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  const context = jest.spyOn(HTMLCanvasElement.prototype, 'getContext');
  const container = document.createElement('div');
  const root = createRoot(container);
  try {
    act(() => root.render(<OrbitalScene reduced={false} active />));
    expect(context).not.toHaveBeenCalled();
    expect(container.querySelector('.hero-earth-fallback')).not.toBeNull();
    expect(container.querySelector('.hero-space-scene').getAttribute('data-earth-ready')).toBe('false');
  } finally {
    act(() => root.unmount());
    context.mockRestore();
  }
});
