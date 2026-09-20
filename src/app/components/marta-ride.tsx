"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Direction = "forward" | "backward";

export const STOP_LABELS = ["Home", "About", "Projects", "Experience", "Contact"];
// Same order/index as STOP_LABELS — the anchor ids every stop's <section id>
// and StopLink href use, and what an incoming "/#id" URL is matched against
// on boot.
export const STOP_IDS = ["top", "about", "projects", "experience", "contact"];

type MartaContextValue = {
  activeIndex: number;
  previousIndex: number | null;
  isTransitioning: boolean;
  direction: Direction;
  playTunnel: boolean;
  enabled: boolean;
  bootPhase: boolean;
  stopLabels: string[];
  goToStop: (index: number) => void;
  endTransition: () => void;
};

const MartaContext = createContext<MartaContextValue | null>(null);

export function useMarta() {
  const ctx = useContext(MartaContext);
  if (!ctx) throw new Error("useMarta must be used within MartaProvider");
  return ctx;
}

export function MartaProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [direction, setDirection] = useState<Direction>("forward");
  const [playTunnel, setPlayTunnel] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [bootPhase, setBootPhase] = useState(false);

  // Which stops have already been arrived at this session — kept in a ref
  // (not state) since nothing needs to re-render off it, just goToStop's own
  // logic. Naturally resets on refresh since it's plain in-memory state, no
  // persistence needed. Home (0) starts "visited" since it's shown without a
  // transition on load.
  const visitedStops = useRef<Set<number>>(new Set([0]));
  const stopCount = STOP_LABELS.length;

  // The guard state for goToStop is mirrored in refs and checked/locked
  // synchronously, rather than relying on `isTransitioning`/`activeIndex`
  // from React state via closure. Someone double-clicking two different nav
  // buttons in the same tick could otherwise pass the "already
  // transitioning" check twice before either state update had committed,
  // each overwriting the other's previousIndex/direction/playTunnel and
  // sometimes skipping a stop's tunnel entirely. Refs close that race.
  const activeIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);

  const goToStop = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(stopCount - 1, index));
      if (isTransitioningRef.current || clamped === activeIndexRef.current) return;

      const current = activeIndexRef.current;
      const dir: Direction = clamped > current ? "forward" : "backward";
      // Only play the full tunnel the first time we arrive at a stop going
      // forward. Backward always skips it, and revisiting a stop (in either
      // direction) after the first time skips it too.
      const alreadyVisited = visitedStops.current.has(clamped);

      isTransitioningRef.current = true;
      activeIndexRef.current = clamped;
      visitedStops.current.add(clamped);

      setDirection(dir);
      setPlayTunnel(dir === "forward" && !alreadyVisited);
      setPreviousIndex(current);
      setIsTransitioning(true);
      setActiveIndex(clamped);
    },
    [stopCount]
  );

  const endTransition = useCallback(() => {
    isTransitioningRef.current = false;
    setPreviousIndex(null);
    setIsTransitioning(false);
    setBootPhase(false);
  }, []);

  // Desktop + motion-ok only. Mirrors the exact breakpoint/motion check the
  // old scroll-scrubbed scenes used, so mobile/reduced-motion behavior is a
  // known-good fallback, not a new untested path.
  useEffect(() => {
    const mqWidth = window.matchMedia("(min-width: 768px)");
    const mqMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(mqWidth.matches && !mqMotion.matches);
    update();
    mqWidth.addEventListener("change", update);
    mqMotion.addEventListener("change", update);
    return () => {
      mqWidth.removeEventListener("change", update);
      mqMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("marta-active");
    return () => document.body.classList.remove("marta-active");
  }, [enabled]);

  // One-time boarding sequence, once we know (client-side, post-hydration)
  // that the full-takeover experience is active. There's no way to know
  // `enabled` before mount, and this must fire exactly once when it flips
  // true, so setting state here is deliberate. Lands on whichever stop the
  // URL's hash names (e.g. arriving at "/#projects" from a case-study
  // page's back link) instead of always Home, since that hash is otherwise
  // meaningless here — the mobile/reduced-motion fallback jumps there via
  // native anchor scrolling, but this stop is picked with plain state, not
  // scroll position.
  useEffect(() => {
    if (!enabled) return;
    const requestedIndex = STOP_IDS.indexOf(window.location.hash.slice(1));
    if (requestedIndex > 0) {
      activeIndexRef.current = requestedIndex;
      visitedStops.current.add(requestedIndex);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveIndex(requestedIndex);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setBootPhase(true);
    setIsTransitioning(true);
  }, [enabled]);

  // Safety net: the transition is normally cleared by the tunnel/boot
  // overlay's own animationend (see endTransition). If the tab gets
  // backgrounded mid-transition, browsers can skip dispatching that event
  // entirely, which would otherwise leave isTransitioning stuck true forever
  // and silently break all further navigation. This force-clears it well
  // after any real transition would have finished.
  useEffect(() => {
    if (!isTransitioning) return;
    const timer = setTimeout(endTransition, 2500);
    return () => clearTimeout(timer);
  }, [isTransitioning, endTransition]);

  // Deliberately no wheel/keyboard listeners here: moving between stops is
  // button-only (the persistent nav + the stop-nav buttons, both calling
  // goToStop directly), so scrolling/PageUp/PageDown only ever scrolls
  // within whichever stop's own content is currently active — the
  // `overflow-y: auto` on .marta-stop handles that natively with no JS.

  const value = useMemo<MartaContextValue>(
    () => ({
      activeIndex,
      previousIndex,
      isTransitioning,
      direction,
      playTunnel,
      enabled,
      bootPhase,
      stopLabels: STOP_LABELS,
      goToStop,
      endTransition,
    }),
    [activeIndex, previousIndex, isTransitioning, direction, playTunnel, enabled, bootPhase, goToStop, endTransition]
  );

  return <MartaContext.Provider value={value}>{children}</MartaContext.Provider>;
}
