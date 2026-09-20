"use client";

import type { AnimationEvent } from "react";
import { useMarta } from "./marta-ride";

export default function MartaBoot() {
  const { bootPhase, isTransitioning, endTransition } = useMarta();

  if (!bootPhase || !isTransitioning) return null;

  // Same rule as the tunnel: only the outer element's own timer animation
  // should end the sequence, not a bubbled child animationend.
  const handleEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) endTransition();
  };

  return (
    <div className="marta-boot" aria-hidden="true" onAnimationEnd={handleEnd}>
      <div className="marta-boot-badge">
        <span className="marta-boot-badge-ring" />
        <span className="marta-boot-badge-core">AS</span>
      </div>
      <p className="marta-boot-eyebrow">Welcome aboard</p>
      <p className="marta-boot-mark">
        Aadi <em>Shah</em>
      </p>
      <p className="marta-boot-route">Georgia Tech / Computer Science</p>
      <span className="marta-boot-line" />
      <p className="marta-boot-caption">Now boarding &middot; prepare for departure</p>
    </div>
  );
}
