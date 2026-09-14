"use client";

import { useEffect } from "react";

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInCubic(t: number) {
  return t * t * t;
}

export default function ScrollScenes() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 768) return;

    const scenes = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    if (!scenes.length) return;

    let rafId = 0;

    const update = () => {
      const vh = window.innerHeight;

      scenes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const total = rect.height - vh;
        const progress = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;

        const arriveEnd = parseFloat(el.dataset.arriveEnd ?? "0");
        const departStart = parseFloat(el.dataset.departStart ?? "1");

        const arrive = arriveEnd > 0 ? easeOutCubic(Math.min(1, Math.max(0, progress / arriveEnd))) : 1;
        const depart =
          departStart < 1
            ? easeInCubic(Math.min(1, Math.max(0, (progress - departStart) / (1 - departStart))))
            : 0;

        el.style.setProperty("--arrive", arrive.toFixed(4));
        el.style.setProperty("--depart", depart.toFixed(4));
      });

      rafId = 0;
    };

    const requestUpdate = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return null;
}
