"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { TOUR_SECTIONS, type TourSection } from "@/data/tourSections";

type TourContextValue = {
  index: number;
  section: TourSection;
  total: number;
  panelVisible: boolean;
  goTo: (index: number) => void;
  next: () => void;
  prev: () => void;
};

const TourContext = createContext<TourContextValue | null>(null);

export function TourProvider({ children }: { children: ReactNode }) {
  const [index, setIndex] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);

  const goTo = useCallback((i: number) => {
    if (i < 0 || i >= TOUR_SECTIONS.length) return;
    setPanelVisible(false);
    window.setTimeout(() => {
      setIndex(i);
      setPanelVisible(true);
    }, 320);
  }, []);

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  useEffect(() => {
    let lock = 0;
    const onWheel = (e: WheelEvent) => {
      const t = performance.now();
      if (t - lock < 900) return;
      lock = t;
      if (e.deltaY > 0) next();
      else prev();
    };
    window.addEventListener("wheel", onWheel, { passive: true });
    return () => window.removeEventListener("wheel", onWheel);
  }, [next, prev]);

  const value = useMemo(
    () => ({
      index,
      section: TOUR_SECTIONS[index],
      total: TOUR_SECTIONS.length,
      panelVisible,
      goTo,
      next,
      prev,
    }),
    [index, panelVisible, goTo, next, prev],
  );

  return <TourContext.Provider value={value}>{children}</TourContext.Provider>;
}

export function useTour() {
  const ctx = useContext(TourContext);
  if (!ctx) throw new Error("useTour must be used within TourProvider");
  return ctx;
}
