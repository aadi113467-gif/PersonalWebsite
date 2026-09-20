"use client";

import { useMarta } from "./marta-ride";
import StopLink from "./stop-link";

// The Home stop has its own inline header (page.tsx) for the mobile/
// reduced-motion fallback, where each stop is a normal stacked section and
// only Home needs one at the very top of the document. In the full ride
// experience every stop is its own full-screen takeover with no shared
// document flow, so nothing from that inline header would otherwise be
// reachable once you've moved on from Home — this renders once, outside
// every stop, fixed to the top of the viewport regardless of which one is
// active. See transit-refinements.css for the CSS that hides the inline
// version specifically when this one takes over.
export default function SiteNavBar() {
  const { enabled } = useMarta();
  if (!enabled) return null;

  return (
    <header className="persistent-nav">
      <StopLink className="wordmark" href="#top" ariaLabel="Back to top">
        AS<span>.</span>
      </StopLink>
      <nav className="site-nav" aria-label="Primary navigation">
        <StopLink href="#top">Home</StopLink>
        <StopLink href="#about">About</StopLink>
        <StopLink href="#projects">Projects</StopLink>
        <StopLink href="#experience">Experience</StopLink>
        <StopLink href="#contact">Contact</StopLink>
      </nav>
    </header>
  );
}
