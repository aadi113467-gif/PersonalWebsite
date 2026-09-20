"use client";

import { useEffect, useRef, useState, type CSSProperties, type MouseEvent } from "react";
import { useMarta } from "./marta-ride";

// Cycling colors (rather than one flat color for every stop) is what makes
// each button read as its own distinct destination at a glance, not a
// repeated template — same trio already used for the route-map dots and
// coursework markers elsewhere on the site.
const stops = [
  { id: "top", label: "Home", color: "red" },
  { id: "about", label: "About", color: "gold" },
  { id: "projects", label: "Projects", color: "green" },
  { id: "experience", label: "Experience", color: "red" },
  { id: "contact", label: "Contact", color: "gold" },
];

export default function TransitRail() {
  const { activeIndex, isTransitioning, enabled, goToStop } = useMarta();
  const routeProgress = (activeIndex / (stops.length - 1)) * 100;

  const [justArrived, setJustArrived] = useState(false);
  const wasTransitioning = useRef(isTransitioning);

  useEffect(() => {
    const was = wasTransitioning.current;
    wasTransitioning.current = isTransitioning;
    if (was && !isTransitioning) {
      setJustArrived(true);
      const timer = setTimeout(() => setJustArrived(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleClick = (index: number) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (!enabled) return; // mobile fallback: let the native anchor jump happen
    e.preventDefault();
    goToStop(index);
  };

  return (
    <aside className="transit-rail" aria-label="Portfolio route">
      <p className="rail-label">{activeIndex === 0 ? "Now boarding — pick a stop" : "Pick a stop"}</p>
      <div className="rail-track" aria-hidden="true">
        <span className="rail-progress" style={{ height: `${routeProgress}%` }} />
        <span
          className={`rail-car${isTransitioning ? " is-moving" : ""}${justArrived ? " is-arriving" : ""}`}
          style={{ left: `${routeProgress}%`, top: `calc(${routeProgress}% - 9px)`, "--rail-position": routeProgress } as CSSProperties}
        >●</span>
      </div>
      <div className="rail-stops">
        {stops.map((stop, index) => (
          <a
            className={activeIndex === index ? `rail-stop is-active stop-${stop.color}` : `rail-stop stop-${stop.color}`}
            href={`#${stop.id}`}
            key={stop.id}
            onClick={handleClick(index)}
          >
            <span className="rail-dot" />
            <span>{stop.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}
