"use client";

import type { MouseEvent, ReactNode } from "react";
import { STOP_IDS, useMarta } from "./marta-ride";

type StopLinkProps = {
  href: `#${string}`;
  className?: string;
  ariaLabel?: string;
  children: ReactNode;
};

export default function StopLink({ href, className, ariaLabel, children }: StopLinkProps) {
  const { enabled, goToStop } = useMarta();
  const index = STOP_IDS.indexOf(href.slice(1));

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!enabled || index === -1) return;
    e.preventDefault();
    goToStop(index);
  };

  return (
    <a href={href} className={className} aria-label={ariaLabel} onClick={handleClick}>
      {children}
    </a>
  );
}
