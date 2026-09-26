import { useEffect, useState } from "react";
import isMobileDevice from "./isMobileDevice";

export const lightweightSceneQuery = "(max-width: 767px), (pointer: coarse)";
export default function useLightweightScene() {
  const [lightweight, setLightweight] = useState(() => isMobileDevice() || (window.matchMedia?.(lightweightSceneQuery).matches ?? false));
  useEffect(() => {
    const query = window.matchMedia?.(lightweightSceneQuery);
    if (!query) return undefined;
    const update = () => setLightweight(isMobileDevice() || query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return lightweight;
}
