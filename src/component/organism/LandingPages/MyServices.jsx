import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useSplitText } from "../../../animations/SplitTextAnim";

gsap.registerPlugin(ScrollTrigger);

// Konfigurasi animasi terpusat (Desktop & Mobile pakai nilai yang sama)
const ANIM_CONFIG = {
  duration: 1.4,
  ease: "power3.out",
  staggerText: 0.03,
  staggerRowOverlap: "-=0.75",
  hoverEnter: 1.2,
  hoverLeave: 1.2,
};

const CLIP_PATHS = {
  top: "inset(0% 0% 100% 0%)",
  bottom: "inset(100% 0% 0% 0%)",
  full: "inset(0% 0% 0% 0%)",
};

const SERVICES_DATA = [
  { id: "design", title: "Design", bgColor: "bg-warna1" },
  { id: "development", title: "Development", bgColor: "bg-warna1" },
  { id: "motion", title: "Motion", bgColor: "bg-warna1" },
];

const formatIndex = (index) => String(index + 1).padStart(2, "0");

export default function MyServices() {
  const containerRef = useRef(null);

  // Status ready per baris
  const rowReadyStates = useRef(SERVICES_DATA.map(() => false));

  // DOM Refs
  const rowRefs = useRef([]);
  const overlayRefs = useRef([]);
  const arrowMainRefs = useRef([]);
  const arrowHoverRefs = useRef([]);

  const topDescRef = useRef(null);
  const topHeadingRef = useRef(null);
  const topDescSplit = useSplitText(topDescRef, { type: "lines, words" });
  const topHeadingSplit = useSplitText(topHeadingRef, { type: "lines, words" });

  const serviceRefs = [
    { num: useRef(null), title: useRef(null) },
    { num: useRef(null), title: useRef(null) },
    { num: useRef(null), title: useRef(null) },
  ];

  const serviceSplits = [
    {
      num: useSplitText(serviceRefs[0].num, { type: "chars, words" }),
      title: useSplitText(serviceRefs[0].title, { type: "chars, words" }),
    },
    {
      num: useSplitText(serviceRefs[1].num, { type: "chars, words" }),
      title: useSplitText(serviceRefs[1].title, { type: "chars, words" }),
    },
    {
      num: useSplitText(serviceRefs[2].num, { type: "chars, words" }),
      title: useSplitText(serviceRefs[2].title, { type: "chars, words" }),
    },
  ];

  // Core animasi overlay & panah (Shared untuk Desktop Hover & Mobile ScrollTrigger)
  const executeHoverAnim = (index, isEnter, e = null, scrollDirection = 1) => {
    const overlay = overlayRefs.current[index];
    const item = rowRefs.current[index];
    const arrowMain = arrowMainRefs.current[index];
    const arrowHover = arrowHoverRefs.current[index];

    if (!overlay || !item || !arrowMain || !arrowHover) return;

    let clipStart, clipEnd;

    if (e) {
      // Logic Desktop: Deteksi dari kursor
      const rect = item.getBoundingClientRect();
      const isFromTop = e.clientY < rect.top + rect.height / 2;
      clipStart = isFromTop ? CLIP_PATHS.top : CLIP_PATHS.bottom;
      clipEnd = clipStart;
    } else {
      // Logic Mobile: Deteksi arah scroll
      if (scrollDirection === 1) {
        // Scroll turun: Masuk dari atas, keluar ke bawah
        clipStart = CLIP_PATHS.top;
        clipEnd = CLIP_PATHS.bottom;
      } else {
        // Scroll naik: Masuk dari bawah, keluar ke atas
        clipStart = CLIP_PATHS.bottom;
        clipEnd = CLIP_PATHS.top;
      }
    }

    if (isEnter) {
      gsap.set(overlay, { scaleY: 1 });
      gsap.fromTo(overlay, { clipPath: clipStart }, { clipPath: CLIP_PATHS.full, duration: ANIM_CONFIG.hoverEnter, ease: ANIM_CONFIG.ease, overwrite: "auto" });

      gsap.to(arrowMain, { xPercent: 120, duration: ANIM_CONFIG.hoverEnter, ease: ANIM_CONFIG.ease, overwrite: "auto" });
      gsap.fromTo(arrowHover, { xPercent: -120 }, { xPercent: 0, duration: ANIM_CONFIG.hoverEnter, ease: ANIM_CONFIG.ease, overwrite: "auto" });
    } else {
      gsap.to(overlay, { clipPath: clipEnd, duration: ANIM_CONFIG.hoverLeave, ease: ANIM_CONFIG.ease, overwrite: "auto" });

      gsap.to(arrowMain, { xPercent: 0, duration: ANIM_CONFIG.hoverLeave, ease: ANIM_CONFIG.ease, overwrite: "auto" });
      gsap.to(arrowHover, { xPercent: -120, duration: ANIM_CONFIG.hoverLeave, ease: ANIM_CONFIG.ease, overwrite: "auto" });
    }
  };

  const { contextSafe } = useGSAP(
    () => {
      const isTopReady = topDescSplit.isReady && topHeadingSplit.isReady;
      const isServicesReady = serviceSplits.every((s) => s.num.isReady && s.title.isReady);
      if (!isTopReady || !isServicesReady) return;

      const q = gsap.utils.selector(containerRef);
      const topTargets = [...topDescSplit.targets, ...topHeadingSplit.targets];
      const allServiceTargets = serviceSplits.flatMap((s) => [...s.num.targets, ...s.title.targets]);

      const setupInitialStates = () => {
        rowReadyStates.current = SERVICES_DATA.map(() => false);
        gsap.set(rowRefs.current, { cursor: "default" });

        gsap.set([...topTargets, ...allServiceTargets], { yPercent: 120, willChange: "transform" });
        gsap.set(q(".service-border-line"), { scaleX: 0, transformOrigin: "left center", willChange: "transform" });

        gsap.set(overlayRefs.current, { scaleY: 0, clipPath: "none", autoAlpha: 1 });
        gsap.set(arrowMainRefs.current, { xPercent: -120, autoAlpha: 1, willChange: "transform" });
        gsap.set(arrowHoverRefs.current, { xPercent: 120, autoAlpha: 1, willChange: "transform" });

        gsap.set([topDescRef.current, topHeadingRef.current, ...serviceRefs.flatMap((r) => [r.num.current, r.title.current]), q(".service-border-line")], { autoAlpha: 1 });
      };

      setupInitialStates();

      const borderLines = q(".service-border-line");

      // Animasi kembang awal (Global)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 96%",
        },
      });

      tl.to(topHeadingSplit.targets, { yPercent: 0, duration: ANIM_CONFIG.duration, stagger: ANIM_CONFIG.staggerText, ease: ANIM_CONFIG.ease }).to(
        topDescSplit.targets,
        { yPercent: 0, duration: ANIM_CONFIG.duration, stagger: 0.08, ease: ANIM_CONFIG.ease },
        "<+0.4",
      );

      serviceSplits.forEach((s, index) => {
        const rowTargets = [...s.num.targets, ...s.title.targets];
        const rowLine = borderLines[index];
        const rowArrowMain = arrowMainRefs.current[index];
        const startTime = index === 0 ? "<+0.3" : ANIM_CONFIG.staggerRowOverlap;

        tl.to(rowTargets, { yPercent: 0, duration: 1, stagger: 0.02, ease: ANIM_CONFIG.ease }, startTime)
          .to(rowLine, { scaleX: 1, duration: 1, ease: "power2.inOut" }, ">-1")
          .to(
            rowArrowMain,
            {
              xPercent: 0,
              duration: 1,
              ease: ANIM_CONFIG.ease,
              onComplete: () => {
                rowReadyStates.current[index] = true;
                const rowEl = rowRefs.current[index];
                if (rowEl && window.innerWidth >= 768) {
                  gsap.set(rowEl, { cursor: "pointer" });
                  if (rowEl.matches(":hover")) {
                    executeHoverAnim(index, true);
                  }
                }
              },
            },
            ">-0.6",
          );
      });

      const mm = gsap.matchMedia();

      // Mobile: Trigger animasi overlay saat baris melintasi viewport
      mm.add("(max-width: 767px)", () => {
        SERVICES_DATA.forEach((_, index) => {
          const row = rowRefs.current[index];
          if (!row) return;

          ScrollTrigger.create({
            trigger: row,
            start: "top 60%",
            end: "bottom 60%",
            onToggle: (self) => {
              executeHoverAnim(index, self.isActive, null, self.direction);
            },
          });
        });
      });

      // Desktop: Interaksi via hover di JSX
      mm.add("(min-width: 768px)", () => {});
    },
    {
      scope: containerRef,
      dependencies: [topDescSplit.isReady, topHeadingSplit.isReady, ...serviceSplits.flatMap((s) => [s.num.isReady, s.title.isReady])],
    },
  );

  const handleHover = contextSafe((index, e) => {
    if (window.innerWidth < 768) return;
    if (!rowReadyStates.current[index]) return;
    executeHoverAnim(index, e.type === "mouseenter", e);
  });

  return (
    <div ref={containerRef} className="h-188 md:h-200 md:min-h-svh w-screen bg-warna1 py-4 md:py-6 overflow-hidden">
      <div className="flex flex-col h-full w-full">
        {/* Top Header Section */}
        <div className="flex items-end md:items-center justify-start flex-row gap-8 h-1/2 w-full px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-8 h-fit w-fit">
            <p ref={topDescRef} className="text-warna2/40 text-[10px] md:text-sm text-balance w-fit md:w-50 lg:w-60 opacity-0">
              — this is where the ideas become useful.
            </p>
            <h2 ref={topHeadingRef} className="text-warna2 text-xl md:text-2xl lg:text-4xl w-full md:w-88 lg:w-154 text-pretty capitalize opacity-0">
              It Took A Lot Of Late Nights, Way Too Many "What If?" Moments... But I Guess This Is What I Do Now.
            </h2>
          </div>
        </div>

        {/* Services List Section */}
        <div className="flex flex-col justify-center h-full w-full">
          {SERVICES_DATA.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (rowRefs.current[index] = el)}
              onMouseEnter={(e) => handleHover(index, e)}
              onMouseLeave={(e) => handleHover(index, e)}
              className={`relative flex h-30 md:h-50 lg:h-full w-full px-4 md:px-6 ${service.bgColor}`}
            >
              {/* Overlay bg-warna2 */}
              <div ref={(el) => (overlayRefs.current[index] = el)} className="absolute inset-0 z-0 bg-warna2" />

              {/* Foreground Content */}
              <div className="relative z-10 flex items-center justify-between h-full w-full mix-blend-difference pointer-events-none">
                <div className="flex flex-row gap-8 items-center md:items-end h-fit w-fit">
                  <p ref={serviceRefs[index].num} className="text-warna1 text-xs md:text-sm md:w-50 lg:w-60 lowercase opacity-0">
                    {formatIndex(index)}
                  </p>
                  <h3 ref={serviceRefs[index].title} className="text-warna1 text-xl md:text-4xl font-semibold opacity-0">
                    {service.title}
                  </h3>
                </div>

                {/* Slot Machine Arrows Container */}
                <div className="relative overflow-hidden flex items-center justify-center w-6 h-6 md:w-8 md:h-8">
                  <ArrowRight ref={(el) => (arrowMainRefs.current[index] = el)} className="absolute inset-0 text-warna1 w-full h-full opacity-0" />
                  <ArrowRight ref={(el) => (arrowHoverRefs.current[index] = el)} className="absolute inset-0 text-warna1 w-full h-full opacity-0" />
                </div>
              </div>

              {/* Bottom Border */}
              <span className="service-border-line absolute bottom-0 left-0 w-full h-[2px] bg-warna2/20 block opacity-0 z-10" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
