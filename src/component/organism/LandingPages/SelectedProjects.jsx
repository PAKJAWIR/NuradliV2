import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "../../../animations/SplitTextAnim";

gsap.registerPlugin(ScrollTrigger);

// --- Configuration & Constants ---
const HEADER_ANIM_CONFIG = {
  duration: 1.4,
  ease: "power3.out",
  staggerHeading: 0.08,
  staggerTag: 0.04,
  staggerDesc: 0.008,
};

const CLIP_PATHS = {
  BG_CLOSED: "polygon(0% 0%, 0% 100%, 50% 100%, 50% 0%, 50% 0%, 50% 100%, 100% 100%, 100% 0%)",
  BG_OPEN: "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 0%)",
  CARD_HIDDEN: "inset(100% 0% 0% 0%)",
  CARD_VISIBLE: "inset(0% 0% 0% 0%)",
};

const PROJECTS = [
  {
    id: "01",
    title: "Pattern",
    category: "(case study)",
    description: "what, it just some magic pattern from unsplash",
    year: "2026",
    bgImage: "/img/background1.webp",
    mainImage: "/img/background1.webp",
  },
  {
    id: "02",
    title: "Pattern 2",
    category: "(case study)",
    description: "what, it just some magic pattern from unsplash 2",
    year: "2026",
    bgImage: "/img/background2.webp",
    mainImage: "/img/background2.webp",
  },
  {
    id: "03",
    title: "Pattern 3",
    category: "(case study)",
    description: "what, it just some magic pattern from unsplash 3",
    year: "2026",
    bgImage: "/img/unsplash-bird.jpg",
    mainImage: "/img/unsplash-bird.jpg",
  },
];

export default function SelectedProjects() {
  const containerRef = useRef(null);
  const pinWrapperRef = useRef(null);

  const tagRef = useRef(null);
  const descRef = useRef(null);
  const headingRef = useRef(null);

  const tagSplit = useSplitText(tagRef, { type: "lines, words" });
  const descSplit = useSplitText(descRef, { type: "lines, words" });
  const headingSplit = useSplitText(headingRef, { type: "chars, words" });

  useGSAP(
    () => {
      const isHeaderReady = tagSplit.isReady && descSplit.isReady && headingSplit.isReady;
      if (!isHeaderReady) return;

      const numProjects = PROJECTS.length;
      const totalTransitions = numProjects - 1;

      // 1. Header Reveal Animation
      const headerTargets = [...tagSplit.targets, ...descSplit.targets, ...headingSplit.targets];
      gsap.set(headerTargets, { yPercent: 120, autoAlpha: 1, willChange: "transform" });
      gsap.set([tagRef.current, descRef.current, headingRef.current], { autoAlpha: 1 });

      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 96%",
        },
      });

      headerTl
        .to(headingSplit.targets, { yPercent: 0, duration: HEADER_ANIM_CONFIG.duration, stagger: HEADER_ANIM_CONFIG.staggerHeading, ease: HEADER_ANIM_CONFIG.ease }, 0)
        .to(tagSplit.targets, { yPercent: 0, duration: HEADER_ANIM_CONFIG.duration, stagger: HEADER_ANIM_CONFIG.staggerTag, ease: HEADER_ANIM_CONFIG.ease }, "<0.1")
        .to(descSplit.targets, { yPercent: 0, duration: HEADER_ANIM_CONFIG.duration, stagger: HEADER_ANIM_CONFIG.staggerDesc, ease: HEADER_ANIM_CONFIG.ease }, ">-0.8");

      // 2. Initial Setup (Cache DOM & Setup Animasi)
      const q = gsap.utils.selector(pinWrapperRef);
      const bgs = q(".project-bg");
      const cards = q(".project-card");
      const textGroups = PROJECTS.map((_, i) => q(`.project-text-${i}`));

      PROJECTS.forEach((_, i) => {
        gsap.set(bgs[i], {
          zIndex: numProjects - i,
          clipPath: CLIP_PATHS.BG_CLOSED,
          willChange: "clip-path",
        });

        if (i > 0) {
          gsap.set(cards[i], {
            clipPath: CLIP_PATHS.CARD_HIDDEN,
            willChange: "clip-path",
          });
        }

        gsap.set(textGroups[i], {
          yPercent: i * 120,
          autoAlpha: 1,
          willChange: "transform",
        });
      });

      if (totalTransitions <= 0) return;

      // 3. Master Scrubbed Timeline untuk Cards
      let currentIndex = 0;

      const pinTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: () => `+=${totalTransitions * 100}%`,
          pin: true,
          pinSpacing: true,
          scrub: true,
          onUpdate: (self) => {
            const rawProgress = self.progress * totalTransitions;
            let nextIndex = currentIndex;

            // Hysteresis Logic
            if (rawProgress > currentIndex + 0.98) {
              nextIndex = Math.floor(rawProgress + 0.12);
            } else if (rawProgress < currentIndex - 0.98) {
              nextIndex = Math.ceil(rawProgress - 0.12);
            }

            nextIndex = Math.max(0, Math.min(nextIndex, totalTransitions));

            // Eksekusi jika index berubah (sangat efisien, tidak dipanggil tiap frame)
            if (nextIndex !== currentIndex) {
              PROJECTS.forEach((_, i) => {
                const targetClip = i < nextIndex ? CLIP_PATHS.BG_OPEN : CLIP_PATHS.BG_CLOSED;

                gsap.to(bgs[i], {
                  clipPath: targetClip,
                  ease: "power3.inOut",
                  duration: 0.88,
                  overwrite: "auto",
                });

                gsap.to(textGroups[i], {
                  yPercent: (i - nextIndex) * 120,
                  ease: "power3.inOut",
                  duration: 0.88,
                  overwrite: "auto",
                });
              });

              currentIndex = nextIndex;
            }
          },
        },
      });

      // 4. Animasi Card Clip-path
      for (let step = 0; step < totalTransitions; step++) {
        pinTl.to(
          cards[step + 1],
          {
            clipPath: CLIP_PATHS.CARD_VISIBLE,
            ease: "none",
            duration: 1,
          },
          step,
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [tagSplit.isReady, descSplit.isReady, headingSplit.isReady],
    },
  );

  return (
    <div ref={containerRef} className="min-h-svh w-screen bg-warna1 overflow-hidden">
      <div className="flex flex-col gap-4 h-fit w-full">
        {/* Header Section */}
        <div className="flex flex-col-reverse md:flex-row h-80 md:h-48 w-full p-4 md:p-6">
          <div className="flex flex-col h-full items-start justify-end gap-4 md:gap-8 w-full md:w-[60%] lg:w-[40%]">
            <p ref={tagRef} className="text-warna2/40 text-[10px] md:text-sm w-70 md:w-full text-balance opacity-0">
              — they were supposed to stay as random ideas. well... they didn't.
            </p>
            <p ref={descRef} className="text-warna2 text-xs md:text-sm text-pretty lowercase w-full opacity-0">
              i wasn't planning to build any of these. i was mostly just following my curiosity. one little idea became another, and before i knew it... i had something worth sharing.
            </p>
          </div>

          <div className="flex items-end justify-start md:justify-end h-full w-full leading-none overflow-hidden">
            <h2 ref={headingRef} className="text-warna2 text-[2.6rem] md:text-5xl lg:text-[7rem] opacity-0">
              Selected Projects
            </h2>
          </div>
        </div>

        {/* Pinned Projects Section */}
        <div ref={pinWrapperRef} className="relative h-screen min-h-svh w-full overflow-hidden isolate">
          {PROJECTS.map((project, idx) => (
            <div key={project.id} className="absolute inset-0 items-center justify-center flex h-full w-full px-4 md:px-6 py-6">
              <img src={project.bgImage} alt={`${project.title} background`} className={`project-bg absolute inset-0 h-full w-full object-cover brightness-[0.40]`} />

              <img src={project.mainImage} alt={`${project.title} preview`} className={`project-card absolute h-60 md:h-78 w-84 md:w-118 object-cover z-20 rounded-sm`} />

              <div className={`project-info-${idx} flex flex-col justify-between h-full w-full z-30 mix-blend-difference isolate`}>
                <div className="flex w-full" />
                <div className="flex w-full justify-center" />

                <div className="flex flex-row items-end justify-between w-full">
                  <div className="flex flex-col justify-end gap-1">
                    <div className="overflow-hidden">
                      <h3 className={`project-text-${idx} text-warna1 text-xl md:text-4xl opacity-0`}>{project.title}</h3>
                    </div>
                    <div className="overflow-hidden">
                      <p className={`project-text-${idx} text-warna1 text-xs md:text-sm lowercase opacity-0`}>{project.category}</p>
                    </div>
                  </div>

                  <div className="flex justify-center items-end">
                    <div className="overflow-hidden">
                      <p className={`project-text-${idx} text-warna1 text-[10px] md:text-sm text-pretty text-center w-48 md:w-64 lowercase opacity-0`}>{project.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-end gap-1">
                    <div className="overflow-hidden">
                      <h3 className={`project-text-${idx} text-warna1 text-xl md:text-4xl opacity-0`}>{project.id}</h3>
                    </div>
                    <div className="overflow-hidden">
                      <p className={`project-text-${idx} text-warna1 text-xs md:text-sm lowercase opacity-0`}>{project.year}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
