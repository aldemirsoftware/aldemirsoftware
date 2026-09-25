import { useEffect, useState } from "react";

export const lightweightSceneQuery = "(max-width: 767px), (pointer: coarse)";
export default function useLightweightScene() {
  const [lightweight, setLightweight] = useState(() => window.matchMedia?.(lightweightSceneQuery).matches ?? false);
  useEffect(() => {
    const query = window.matchMedia?.(lightweightSceneQuery);
    if (!query) return undefined;
    const update = () => setLightweight(query.matches);
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return lightweight;
}
