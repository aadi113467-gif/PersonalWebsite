"use client";

import type { AnimationEvent } from "react";
import { useMarta } from "./marta-ride";

const STREAK_COUNT = 6;

// Which real cockpit-footage clip plays into which stop — each a distinctly
// different ~1.9s slice of the same source video (public/
// no_like_million_miles_per_h.mp4: a straight downtown cruise for About/
// Contact, a hard bank right through a station blast-through for Projects,
// and a hard bank left through the skyline for Experience — cut and sped
// up, see the ffmpeg commands used to produce them). Contact reuses the
// About clip rather than its own (marta-clip-contact.mp4, now unused) —
// that one looked off next to the others. Home (index 0) is never a
// forward-tunnel target — see playTunnel in marta-ride.tsx — so it has no
// entry here.
const TUNNEL_CLIPS: Record<number, string> = {
  1: "/marta-clip-about.mp4",
  2: "/marta-clip-projects.mp4",
  3: "/marta-clip-experience.mp4",
  4: "/marta-clip-about.mp4",
};

// Every clip is fetched and buffered from first paint, keyed by src so
// React (19+) hoists these into <head> as real preload hints rather than
// leaving them as regular DOM nodes. Without this, the first play of a clip
// mid-transition spends 300-400ms just buffering — a meaningful bite out of
// a 2-second budget — before a single frame is visible.
function TunnelPreloads() {
  return (
    <>
      {Object.values(TUNNEL_CLIPS).map((src) => (
        <link key={src} rel="preload" as="video" type="video/mp4" href={src} />
      ))}
    </>
  );
}

export default function TrainTunnel() {
  const { isTransitioning, playTunnel, bootPhase, activeIndex, stopLabels, endTransition } = useMarta();

  // The boot sequence has its own component/overlay (MartaBoot).
  if (!isTransitioning || bootPhase) {
    return <TunnelPreloads />;
  }

  // Only end the transition when the timer animation on THIS element
  // finishes, not when a child's animation bubbles up — those finish at
  // different times and would cut the sequence off early.
  const handleEnd = (e: AnimationEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) endTransition();
  };

  if (!playTunnel) {
    // Backward navigation, or a stop we've already visited this session:
    // let the normal stop cross-fade play on its own, no replay. This
    // element exists only to time when that's finished.
    return (
      <>
        <TunnelPreloads />
        <div className="marta-tunnel-quiet" aria-hidden="true" onAnimationEnd={handleEnd} />
      </>
    );
  }

  const stopName = stopLabels[activeIndex];
  const clipSrc = TUNNEL_CLIPS[activeIndex];

  return (
    <>
      <TunnelPreloads />
      <div className="marta-tunnel" aria-hidden="true" onAnimationEnd={handleEnd}>
        <div className="marta-tunnel-scene">
          {/* Keyed on the clip so a fresh <video> mounts per transition —
              guarantees playback always starts at frame 0 instead of
              reusing/resuming a previous element. */}
          <video
            key={clipSrc}
            className="marta-tunnel-video"
            src={clipSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
          />
          <div className="marta-tunnel-streaks">
            {Array.from({ length: STREAK_COUNT }).map((_, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <div className="marta-tunnel-vignette" />
        </div>
        <div className="marta-tunnel-label">
          <span>Next stop</span>
          <strong>{stopName}</strong>
        </div>
      </div>
    </>
  );
}
