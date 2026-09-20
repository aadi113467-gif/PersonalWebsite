"use client";

import type { ReactNode } from "react";
import { useMarta } from "./marta-ride";

type MartaStopProps = {
  index: number;
  id: string;
  className: string;
  children: ReactNode;
};

export default function MartaStop({ index, id, className, children }: MartaStopProps) {
  const { activeIndex, previousIndex, enabled } = useMarta();

  if (!enabled) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  const isActive = index === activeIndex;
  const isLeaving = index === previousIndex;
  const classes = [className, "marta-stop", isActive && "is-active", isLeaving && "is-leaving"]
    .filter(Boolean)
    .join(" ");

  return (
    <section id={id} className={classes} aria-hidden={!isActive}>
      {children}
    </section>
  );
}
