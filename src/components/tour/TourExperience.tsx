"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import { Canvas, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";
import {
  TOUR_HOTSPOTS,
  TOUR_STOPS,
  getTourStop,
  type TourStopId,
} from "@/lib/tour";
import VillaScene from "@/components/tour/VillaScene";

type ControlsApi = {
  target: THREE.Vector3;
  update: () => void;
};

function useIsMobile(breakpoint = 768) {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const coarse = window.matchMedia("(pointer: coarse)");
    const sync = () => setMobile(mq.matches || coarse.matches);
    sync();
    mq.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      mq.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
    };
  }, [breakpoint]);

  return mobile;
}

function CameraRig({
  stopId,
  controlsRef,
  isMobile,
}: {
  stopId: TourStopId;
  controlsRef: React.MutableRefObject<ControlsApi | null>;
  isMobile: boolean;
}) {
  const { camera } = useThree();
  const stop = getTourStop(stopId);
  const goalPos = useMemo(
    () => new THREE.Vector3(...stop.position),
    [stop.position],
  );
  const goalTarget = useMemo(
    () => new THREE.Vector3(...stop.target),
    [stop.target],
  );

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    if (cam.isPerspectiveCamera) {
      cam.fov = isMobile ? 58 : 48;
      cam.updateProjectionMatrix();
    }
  }, [camera, isMobile]);

  useEffect(() => {
    const controls = controlsRef.current;
    const fromPos = camera.position.clone();
    const fromTarget = controls?.target.clone() ?? goalTarget.clone();
    let t = 0;
    let frame = 0;

    const tick = () => {
      t = Math.min(1, t + (isMobile ? 0.045 : 0.03));
      const e = 1 - Math.pow(1 - t, 3);
      camera.position.lerpVectors(fromPos, goalPos, e);
      if (controls) {
        controls.target.lerpVectors(fromTarget, goalTarget, e);
        controls.update();
      }
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [stopId, camera, controlsRef, goalPos, goalTarget, isMobile]);

  return (
    <OrbitControls
      ref={(node) => {
        controlsRef.current = node as unknown as ControlsApi | null;
      }}
      makeDefault
      enablePan={false}
      enableZoom
      enableRotate
      minDistance={isMobile ? 2.2 : 1.8}
      maxDistance={isMobile ? 18 : 22}
      maxPolarAngle={Math.PI * 0.495}
      minPolarAngle={0.12}
      target={stop.target}
      enableDamping
      dampingFactor={isMobile ? 0.12 : 0.08}
      rotateSpeed={isMobile ? 0.55 : 0.85}
      zoomSpeed={isMobile ? 0.7 : 1}
      touches={{
        ONE: THREE.TOUCH.ROTATE,
        TWO: THREE.TOUCH.DOLLY_PAN,
      }}
    />
  );
}

export default function TourExperience() {
  const isMobile = useIsMobile();
  const [stopId, setStopId] = useState<TourStopId>("overview");
  const [hotspotId, setHotspotId] = useState<string | null>(null);
  const [hint, setHint] = useState(true);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const controlsRef = useRef<ControlsApi | null>(null);

  const stop = getTourStop(stopId);
  const stopIndex = TOUR_STOPS.findIndex((s) => s.id === stopId);
  const hotspot = useMemo(
    () => TOUR_HOTSPOTS.find((h) => h.id === hotspotId) ?? null,
    [hotspotId],
  );

  const goStop = useCallback((id: TourStopId) => {
    setStopId(id);
    setHotspotId(null);
    setHint(false);
    setSummaryOpen(false);
  }, []);

  const goRelative = useCallback(
    (dir: -1 | 1) => {
      const next =
        TOUR_STOPS[
          (stopIndex + dir + TOUR_STOPS.length) % TOUR_STOPS.length
        ];
      goStop(next.id);
    },
    [goStop, stopIndex],
  );

  const onSelectHotspot = useCallback((id: string) => {
    if (!id) {
      setHotspotId(null);
      return;
    }
    const hs = TOUR_HOTSPOTS.find((h) => h.id === id);
    if (!hs) return;
    setHotspotId(id);
    setStopId(hs.stopId);
    setHint(false);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setHint(false), isMobile ? 4500 : 6500);
    return () => window.clearTimeout(t);
  }, [isMobile]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goRelative(-1);
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        goRelative(1);
      }
      if (e.key === "Escape") setHotspotId(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goRelative]);

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden overscroll-none bg-[var(--showroom)] touch-manipulation">
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        camera={{
          position: TOUR_STOPS[0].position,
          fov: isMobile ? 58 : 48,
          near: 0.1,
          far: 60,
        }}
        gl={{
          antialias: !isMobile,
          alpha: false,
          powerPreference: isMobile ? "low-power" : "high-performance",
        }}
        className="h-full w-full touch-none"
        style={{ touchAction: "none" }}
        onPointerMissed={() => onSelectHotspot("")}
      >
        <color attach="background" args={["#87a0b4"]} />
        <fog attach="fog" args={["#9aafc0", 22, 48]} />
        <Suspense fallback={null}>
          <Environment
            files="/tour/hdr/modern_buildings_2_1k.hdr"
            background={false}
          />
          <CameraRig
            stopId={stopId}
            controlsRef={controlsRef}
            isMobile={isMobile}
          />
          <VillaScene
            hotspots={TOUR_HOTSPOTS}
            activeHotspotId={hotspotId}
            onSelectHotspot={onSelectHotspot}
            isMobile={isMobile}
          />
          {!isMobile && (
            <ContactShadows
              position={[0, 0.01, 4]}
              opacity={0.42}
              scale={28}
              blur={2.6}
              far={12}
            />
          )}
        </Suspense>
      </Canvas>

      {/* Top chrome */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 bg-gradient-to-b from-black/75 via-black/30 to-transparent pt-[max(3.75rem,env(safe-area-inset-top))] pb-8 sm:pt-[4.5rem] sm:pb-10">
        <div className="pointer-events-auto mx-auto flex max-w-6xl items-start justify-between gap-2 px-3 sm:gap-3 sm:px-4 md:px-6 lg:px-8">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold tracking-[0.16em] text-[var(--lime-bright)] uppercase sm:text-xs">
              סיור תלת־ממד · INOVIX
            </p>
            <h1 className="mt-0.5 truncate text-lg font-extrabold text-white sm:mt-1 sm:text-2xl md:text-3xl">
              {stop.label}
            </h1>
            {/* Desktop summary */}
            <p className="mt-1 hidden max-w-xl text-sm text-white/70 sm:block sm:text-base">
              <span className="text-[var(--lime-bright)]">{stop.eyebrow}</span>
              {" — "}
              {stop.summary}
            </p>
            {/* Mobile compact summary toggle */}
            <button
              type="button"
              className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-white/70 sm:hidden"
              onClick={() => setSummaryOpen((v) => !v)}
            >
              <span className="text-[var(--lime-bright)]">{stop.eyebrow}</span>
              <span aria-hidden>{summaryOpen ? "▴" : "▾"}</span>
            </button>
            <AnimatePresence>
              {summaryOpen && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-1 max-w-[18rem] text-xs leading-relaxed text-white/70 sm:hidden"
                >
                  {stop.summary}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
          <Link
            href="/#contact"
            className="hidden shrink-0 rounded-full bg-[var(--lime)] px-4 py-2.5 text-sm font-bold text-[var(--navy)] shadow-lg transition hover:bg-[var(--lime-bright)] sm:inline-flex"
          >
            לתיאום סיור אמיתי
          </Link>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-black/85 via-black/45 to-transparent pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Mobile prev / next */}
          <div className="mb-2 flex items-center justify-between gap-2 sm:hidden">
            <button
              type="button"
              onClick={() => goRelative(-1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/12 text-lg font-bold text-white active:bg-white/22"
              aria-label="נקודה קודמת"
            >
              ›
            </button>
            <p className="text-center text-[11px] text-white/55">
              גרירה לסיבוב · צביטה לזום · {stopIndex + 1}/{TOUR_STOPS.length}
            </p>
            <button
              type="button"
              onClick={() => goRelative(1)}
              className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full bg-white/12 text-lg font-bold text-white active:bg-white/22"
              aria-label="נקודה הבאה"
            >
              ‹
            </button>
          </div>

          <div className="mb-2 hidden items-center justify-between gap-3 text-xs text-white/55 sm:mb-3 sm:flex sm:text-sm">
            <span>גררו לעיון · לחצו על הסמנים הירוקים</span>
            <span>חצים במקלדת למעבר בין נקודות</span>
          </div>

          <div className="flex gap-2 overflow-x-auto overscroll-x-contain pb-1 [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden">
            {TOUR_STOPS.map((s) => {
              const active = s.id === stopId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => goStop(s.id)}
                  className={`snap-start shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold transition min-h-11 sm:min-h-0 sm:px-4 sm:py-2 ${
                    active
                      ? "bg-[var(--lime)] text-[var(--navy)] shadow-[0_0_24px_rgba(126,211,33,0.35)]"
                      : "bg-white/10 text-white active:bg-white/18"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Mobile CTA */}
          <Link
            href="/#contact"
            className="mt-3 flex min-h-12 w-full items-center justify-center rounded-full bg-[var(--lime)] text-sm font-bold text-[var(--navy)] shadow-lg sm:hidden"
          >
            לתיאום סיור אמיתי
          </Link>
        </div>
      </div>

      {/* Hotspot detail — bottom sheet on mobile, side card on desktop */}
      <AnimatePresence>
        {hotspot && (
          <motion.aside
            initial={
              isMobile
                ? { opacity: 0, y: 40 }
                : { opacity: 0, x: 28 }
            }
            animate={isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
            exit={
              isMobile
                ? { opacity: 0, y: 24 }
                : { opacity: 0, x: 28 }
            }
            transition={{ duration: 0.28 }}
            className={
              isMobile
                ? "absolute inset-x-3 bottom-[calc(7.5rem+env(safe-area-inset-bottom))] z-30 rounded-2xl border border-white/15 bg-[rgba(11,18,32,0.95)] p-4 text-white shadow-2xl backdrop-blur-md"
                : "absolute top-[7.5rem] left-3 z-30 w-[min(100%-1.5rem,20rem)] rounded-2xl border border-white/15 bg-[rgba(11,18,32,0.92)] p-4 text-white shadow-2xl backdrop-blur-md sm:left-6 sm:top-28 sm:p-5"
            }
          >
            <p className="text-[11px] font-semibold tracking-[0.16em] text-[var(--lime-bright)] uppercase">
              נקודת עניין
            </p>
            <h2 className="mt-1 text-lg font-bold">{hotspot.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/70">
              {hotspot.body}
            </p>
            <div className="mt-4 flex gap-2">
              <Link
                href={hotspot.href}
                className="inline-flex min-h-11 flex-1 items-center justify-center rounded-full bg-[var(--teal)] px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--tech-blue)] sm:flex-none sm:min-h-0"
              >
                לעמוד התחום
              </Link>
              <button
                type="button"
                onClick={() => setHotspotId(null)}
                className="inline-flex min-h-11 items-center justify-center rounded-full bg-white/10 px-3.5 py-2 text-sm font-semibold text-white/85 active:bg-white/16 sm:min-h-0"
              >
                סגור
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {hint && !hotspot && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute top-[42%] left-1/2 z-20 w-[min(90vw,22rem)] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-black/60 px-5 py-4 text-center text-sm text-white/85 backdrop-blur-md"
            onClick={() => setHint(false)}
            role="presentation"
          >
            {isMobile ? (
              <>
                גררו באצבע לסיבוב · צביטה לזום.
                <br />
                בחרו נקודה למטה או לחצו על סמן ירוק.
              </>
            ) : (
              <>
                גרירת עכבר / מגע לסיבוב המצלמה.
                <br />
                בחרו נקודת עצירה למטה, או לחצו על סמן מערכת.
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
