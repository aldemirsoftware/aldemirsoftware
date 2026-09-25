import React, { act } from "react";
import { createRoot } from "react-dom/client";
import MusicPlayer from "./MusicPlayer";
let root, container, play;
beforeEach(() => {
  global.IS_REACT_ACT_ENVIRONMENT = true;
  jest.useFakeTimers();
  window.matchMedia = jest.fn(() => ({ matches: true, addEventListener: jest.fn(), removeEventListener: jest.fn() }));
  play = jest.spyOn(HTMLMediaElement.prototype, "play").mockResolvedValue();
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(() => { act(() => root.unmount()); container.remove(); jest.restoreAllMocks(); jest.useRealTimers(); });
it("waits 15 seconds and starts at fifteen percent volume", async () => {
  act(() => root.render(<MusicPlayer />));
  expect(container.querySelector("audio").volume).toBe(.15);
  act(() => jest.advanceTimersByTime(14999));
  expect(play).not.toHaveBeenCalled();
  await act(async () => jest.advanceTimersByTime(1));
  expect(play).toHaveBeenCalledTimes(1);
});
it("does not create an audio element or start playback on phones", () => {
  window.matchMedia.mockReturnValue({ matches: false, addEventListener: jest.fn(), removeEventListener: jest.fn() });
  act(() => { root.render(<MusicPlayer />); });
  act(() => jest.advanceTimersByTime(20000));
  expect(container.querySelector("audio")).toBeNull();
  expect(play).not.toHaveBeenCalled();
});
it("does not restart automatically after the user takes control", async () => {
  act(() => root.render(<MusicPlayer />));
  await act(async () => container.querySelector(".music-play").click());
  await act(async () => jest.advanceTimersByTime(15000));
  expect(play).toHaveBeenCalledTimes(1);
});
it("keeps volume controls open inside and dismisses outside without replacing audio", () => {
  act(() => root.render(<MusicPlayer />));
  const audio = container.querySelector("audio");
  act(() => container.querySelector('[aria-label="Müzik ses ayarları"]').click());
  act(() => container.querySelector('input[type="range"]').dispatchEvent(new Event("pointerdown", { bubbles: true })));
  expect(container.querySelector(".music-panel")).not.toBeNull();
  act(() => document.body.dispatchEvent(new Event("pointerdown", { bubbles: true })));
  expect(container.querySelector(".music-panel")).toBeNull();
  expect(container.querySelector("audio")).toBe(audio);
});
it('blocks audio on phones even when desktop pointer and viewport conditions match', () => {
  jest.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)');
  act(() => root.render(<MusicPlayer />));
  act(() => jest.advanceTimersByTime(20000));
  expect(container.querySelector('audio')).toBeNull();
  expect(play).not.toHaveBeenCalled();
});
