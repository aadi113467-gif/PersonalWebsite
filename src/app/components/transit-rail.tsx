"use client";

import { useEffect, useState, type CSSProperties } from "react";

const stops = [
  { id: "top", label: "Start", color: "red" },
  { id: "about", label: "About", color: "red" },
  { id: "projects", label: "Projects", color: "red" },
  { id: "experience", label: "Experience", color: "red" },
  { id: "contact", label: "Contact", color: "red" },
];

export default function TransitRail() {
  const [activeStop, setActiveStop] = useState("top");
  const [routeProgress, setRouteProgress] = useState(0);

  useEffect(() => {
    const sections = stops
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    let frame = 0;
    const updateProgress = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const viewportCenter = window.innerHeight / 2;
        const closestSection = sections.reduce((closest, section) => {
          const sectionCenter = section.getBoundingClientRect().top + section.offsetHeight / 2;
          const distance = Math.abs(sectionCenter - viewportCenter);
          return distance < closest.distance ? { id: section.id, distance } : closest;
        }, { id: "top", distance: Number.POSITIVE_INFINITY });
        setActiveStop(closestSection.id);

        const stationCenters = sections.map((section) => section.offsetTop + section.offsetHeight / 2 - window.innerHeight / 2);
        const scrollPosition = window.scrollY;
        let interpolatedProgress = 0;
        if (scrollPosition >= stationCenters[stationCenters.length - 1]) {
          interpolatedProgress = 100;
        } else {
          for (let index = 0; index < stationCenters.length - 1; index += 1) {
            const start = stationCenters[index];
            const end = stationCenters[index + 1];
            if (scrollPosition >= start && scrollPosition <= end) {
              const localProgress = (scrollPosition - start) / Math.max(1, end - start);
              interpolatedProgress = ((index + localProgress) / (stationCenters.length - 1)) * 100;
              break;
            }
          }
        }
        setRouteProgress(Math.max(0, Math.min(100, interpolatedProgress)));
        frame = 0;
      });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <>
      <aside className="transit-rail" aria-label="Portfolio route">
      <div className="rail-track" aria-hidden="true">
        <span className="rail-progress" style={{ height: `${routeProgress}%` }} />
        <span className="rail-car" style={{ left: `${routeProgress}%`, top: `calc(${routeProgress}% - 9px)`, "--rail-position": routeProgress } as CSSProperties}>●</span>
      </div>
      <div className="rail-stops">
        {stops.map((stop) => (
          <a className={activeStop === stop.id ? `rail-stop is-active stop-${stop.color}` : `rail-stop stop-${stop.color}`} href={`#${stop.id}`} key={stop.id}>
            <span className="rail-dot" />
            <span>{stop.label}</span>
          </a>
        ))}
      </div>
      </aside>
    </>
  );
}
