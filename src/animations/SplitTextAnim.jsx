import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(SplitText, ScrollTrigger);

const DEFAULTS = {
  type: "words",
  stagger: 0.02,
  duration: 0.88,
  ease: "power3.out",
  yPercent: 120,
  delay: 0,
  start: "top 85%",
};

/**
 * 1. BAHAN MENTAH (splitReady / Custom Hook)
 * Hanya menangani pemotongan teks, font loading, dan cleanup DOM.
 */
export function useSplitText(targetRef, options = {}) {
  const [splitData, setSplitData] = useState({ targets: [], splitInstance: null, isReady: false });

  const { type = DEFAULTS.type, maskLines = true, linesClass = "overflow-hidden block pb-[0.1em] -mb-[0.1em]", wordsClass = "inline-block", charsClass = "inline-block", waitForFonts = true } = options;

  useGSAP(
    () => {
      const target = targetRef.current;
      if (!target) return;

      // Sembunyikan target sementara agar tidak FOUC (Flash of Unstyled Text)
      gsap.set(target, { autoAlpha: 0 });

      let cancelled = false;

      const initSplit = async () => {
        if (waitForFonts && document.fonts) {
          await document.fonts.ready;
        }

        if (cancelled) return;
        await new Promise(requestAnimationFrame);
        if (cancelled) return;

        const splitType = maskLines && !type.includes("lines") ? `lines, ${type}` : type;

        const split = new SplitText(target, {
          type: splitType,
          autoSplit: true,
          linesClass: splitType.includes("lines") ? linesClass : undefined,
          wordsClass: splitType.includes("words") ? wordsClass : undefined,
          charsClass: splitType.includes("chars") ? charsClass : undefined,
        });

        const targets = getAnimationTargets(split);

        if (!cancelled) {
          setSplitData({ targets, splitInstance: split, isReady: true });
        }
      };

      let splitCleanup;
      initSplit().then((res) => {
        splitCleanup = res;
      });

      return () => {
        cancelled = true;
        splitCleanup?.();
      };
    },
    { scope: targetRef, dependencies: [type, maskLines, linesClass, wordsClass, charsClass, waitForFonts] },
  );

  return splitData;
}

/**
 * 2. BAHAN MATANG (splitAndAnimReady / Component)
 * Standalone component untuk animasi sekali pakai + ScrollTrigger bawaan.
 */
function SplitTextAnim({
  children,

  // Element
  as: Tag = "div",
  className = "",
  containerClassName = "w-full",

  // Split options
  type = DEFAULTS.type,
  maskLines = true,
  linesClass = "overflow-hidden block pb-[0.1em] -mb-[0.1em]",
  wordsClass = "inline-block",
  charsClass = "inline-block",

  // Animation options
  stagger = DEFAULTS.stagger,
  duration = DEFAULTS.duration,
  ease = DEFAULTS.ease,
  yPercent = DEFAULTS.yPercent,
  delay = DEFAULTS.delay,

  // ScrollTrigger options
  scrollTrigger = false,
  triggerRef = null,
  start = DEFAULTS.start,
  markers = false,

  waitForFonts = true,
  border = false,
  borderColor = "#000",
  style,
  ...props
}) {
  const containerRef = useRef(null);
  const targetRef = useRef(null);

  // Menggunakan bahan mentah di dalam bahan matang
  const { targets, isReady } = useSplitText(targetRef, {
    type,
    maskLines,
    linesClass,
    wordsClass,
    charsClass,
    waitForFonts,
  });

  useGSAP(
    () => {
      if (!isReady || !targets.length) return;

      const target = targetRef.current;

      // Set state awal elemen ter-split
      gsap.set(targets, {
        yPercent,
        autoAlpha: 0,
        willChange: "transform, opacity",
      });

      // Tampilkan container utama setelah split siap
      gsap.set(target, { autoAlpha: 1 });

      const tl = gsap.timeline({
        delay,
        scrollTrigger: scrollTrigger
          ? {
              trigger: triggerRef?.current || containerRef.current,
              start,
              markers,
            }
          : undefined,
      });

      tl.to(targets, {
        autoAlpha: 1,
        duration: duration * 0.3,
        stagger,
        ease: "power1.out",
      }).to(
        targets,
        {
          yPercent: 0,
          duration,
          stagger,
          ease,
        },
        "<0.05",
      );
    },
    { scope: containerRef, dependencies: [isReady, targets, yPercent, duration, stagger, ease, delay, scrollTrigger, start] },
  );

  return (
    <div ref={containerRef} className={containerClassName} style={border ? { border: `1px solid ${borderColor}` } : undefined}>
      <Tag ref={targetRef} className={`split-text-target ${className}`} style={{ opacity: 0, ...style }} {...props}>
        {children}
      </Tag>
    </div>
  );
}

function getAnimationTargets(split) {
  if (split.chars?.length) return split.chars;
  if (split.words?.length) return split.words;
  if (split.lines?.length) return split.lines;
  return [];
}

export default SplitTextAnim;
