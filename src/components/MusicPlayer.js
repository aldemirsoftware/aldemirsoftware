import React, { useEffect, useRef, useState } from "react";
import { FiMusic, FiPause, FiPlay, FiVolume2, FiVolumeX, FiX } from "react-icons/fi";
import "./MusicPlayer.css";

export default function MusicPlayer() {
  const [desktop, setDesktop] = useState(() => window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)").matches);
  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (hover: hover) and (pointer: fine)");
    const update = () => setDesktop(media.matches);
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);
  return desktop ? <DesktopMusicPlayer /> : null;
}

function DesktopMusicPlayer() {
  const audio = useRef(null);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [error, setError] = useState("");
  const [volume, setVolume] = useState(.15);
  const userControlled = useRef(false);
  useEffect(() => {
    audio.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    let waitingForGesture = false;
    const tryPlay = async () => {
      if (userControlled.current) return;
      try { await audio.current.play(); waitingForGesture = false; }
      catch { waitingForGesture = true; }
    };
    const gesture = event => {
      if (waitingForGesture && !event.target.closest?.(".music-player")) tryPlay();
    };
    const timer = setTimeout(tryPlay, 15000);
    document.addEventListener("click", gesture);
    document.addEventListener("keydown", gesture);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", gesture);
      document.removeEventListener("keydown", gesture);
    };
  }, []);
  const togglePlayback = async () => {
    userControlled.current = true;
    setError("");
    if (!audio.current.paused) { audio.current.pause(); return; }
    try { await audio.current.play(); }
    catch { setError("Müzik başlatılamadı. Yeniden deneyin."); }
  };
  const toggleMute = () => {
    if (muted || volume === 0) { setMuted(false); if (volume === 0) setVolume(.15); }
    else setMuted(true);
  };
  return <aside className="music-player" aria-label="Arka plan müziği" onKeyDown={event => { if (event.key === "Escape") setOpen(false); }}>
    <audio ref={audio} src="/audio/attuned-space-music.mp3" preload="none" loop muted={muted}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onError={() => { setPlaying(false); setError("Müzik yüklenemedi. Lütfen tekrar deneyin."); }} />
    {open && <div className="music-panel" id="music-settings">
      <div className="music-heading"><span>UZAYIN RİTMİ</span><button type="button" onClick={() => setOpen(false)} aria-label="Müzik panelini kapat"><FiX /></button></div>
      <p>Attuned <span>· The Intangible</span></p>
      <div className="music-volume"><button type="button" onClick={toggleMute} aria-label={muted || volume === 0 ? "Sesi aç" : "Sessize al"} aria-pressed={muted || volume === 0}>{muted || volume === 0 ? <FiVolumeX /> : <FiVolume2 />}</button>
        <label htmlFor="music-volume">Ses seviyesi</label>
        <input id="music-volume" type="range" min="0" max="100" value={Math.round(volume * 100)} onChange={event => { setVolume(Number(event.target.value) / 100); setMuted(false); }} />
        <output htmlFor="music-volume">{Math.round(volume * 100)}%</output>
      </div>
    </div>}
    {error && <p className="music-error" role="status">{error}</p>}
    <div className="music-dock">
      <button type="button" className="music-play" onClick={togglePlayback} aria-label={playing ? "Müziği duraklat" : "Müziği aç"}>{playing ? <FiPause /> : <FiPlay />}<span>{playing ? "Müzik açık" : "Müziği aç"}</span></button>
      <button type="button" onClick={() => setOpen(!open)} aria-label="Müzik ses ayarları" aria-expanded={open} aria-controls="music-settings"><FiMusic /></button>
    </div>
  </aside>;
}
