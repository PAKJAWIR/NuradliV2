import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useSplitText } from "../../../animations/SplitTextAnim";

const DURATION = 1.4;

function Hero() {
  const containerRef = useRef(null);

  // Ref khusus desktop
  const videoWrapperRef = useRef(null);
  const curtainLeftRef = useRef(null);
  const curtainRightRef = useRef(null);
  const videoRefDesktop = useRef(null);

  // Ref khusus mobile
  const videoRefMobile = useRef(null);

  const titleRef = useRef(null);
  const descRef = useRef(null);

  const titleSplit = useSplitText(titleRef, { type: "lines, words" });
  const descSplit = useSplitText(descRef, { type: "lines, words" });

  // Play/Pause video berdasarkan Intersection Observer
  useEffect(() => {
    const container = containerRef.current;
    const vMobile = videoRefMobile.current;
    const vDesktop = videoRefDesktop.current;

    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          vMobile?.play().catch(() => {});
          vDesktop?.play().catch(() => {});
        } else {
          vMobile?.pause();
          vDesktop?.pause();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      const isAllReady = titleSplit.isReady && descSplit.isReady;
      if (!isAllReady) return;

      const mm = gsap.matchMedia();

      // --- LOGIKA DESKTOP (>= 768px) ---
      mm.add("(min-width: 768px)", () => {
        const titleTargets = titleSplit.targets;
        const descTargets = descSplit.targets;
        const videoWrapper = videoWrapperRef.current;
        const curtainLeft = curtainLeftRef.current;
        const curtainRight = curtainRightRef.current;

        if (!videoWrapper || !curtainLeft || !curtainRight) return;

        // Setup state awal khusus desktop saat layout sudah terkonfirmasi
        gsap.set([...titleTargets, ...descTargets], { yPercent: 180, autoAlpha: 1, willChange: "transform" });
        gsap.set([titleRef.current, descRef.current], { autoAlpha: 1 });
        gsap.set(videoWrapper, { autoAlpha: 1, scale: 0.88, willChange: "transform" });
        gsap.set([curtainLeft, curtainRight], { xPercent: 0, willChange: "transform" });

        const tl = gsap.timeline();

        tl.to(
          titleTargets,
          {
            yPercent: 0,
            duration: 2,
            stagger: 0.08,
            ease: "power3.out",
          },
          0,
        )
          .to(
            curtainLeft,
            {
              xPercent: -120,
              duration: 1.6,
              ease: "power2.inOut",
            },
            ">-1.2",
          )
          .to(
            curtainRight,
            {
              xPercent: 120,
              duration: 1.6,
              ease: "power2.inOut",
            },
            "<",
          )
          .to(
            videoWrapper,
            {
              scale: 1,
              duration: 1.2,
              ease: "power2.out",
            },
            ">-0.99",
          )
          .to(
            descTargets,
            {
              yPercent: 0,
              duration: DURATION,
              stagger: 0.01,
              ease: "power2.out",
            },
            ">-1.2",
          );

        // Mouse Follow Parallax
        const container = containerRef.current;
        if (container) {
          const maxMove = 100;
          const xTo = gsap.quickTo(videoWrapper, "x", {
            duration: DURATION,
            ease: "power3.out",
          });

          const handleMouseMove = (event) => {
            const rect = container.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const progress = mouseX / rect.width;
            const x = (progress - 0.5) * maxMove * 6;

            xTo(x);
          };

          container.addEventListener("mousemove", handleMouseMove);
          return () => container.removeEventListener("mousemove", handleMouseMove);
        }
      });

      // --- LOGIKA MOBILE (< 768px) ---
      mm.add("(max-width: 767px)", () => {
        const titleTargets = titleSplit.targets;
        const descTargets = descSplit.targets;

        gsap.set([...titleTargets, ...descTargets], { yPercent: 180, autoAlpha: 1, willChange: "transform" });
        gsap.set([titleRef.current, descRef.current], { autoAlpha: 1 });

        const tl = gsap.timeline();

        tl.to(
          titleTargets,
          {
            yPercent: 0,
            duration: 2,
            stagger: 0.08,
            ease: "power3.out",
          },
          0,
        ).to(
          descTargets,
          {
            yPercent: 0,
            duration: DURATION,
            stagger: 0.01,
            ease: "power2.out",
          },
          ">-1.2",
        );
      });
    },
    {
      scope: containerRef,
      dependencies: [titleSplit.isReady, descSplit.isReady],
    },
  );

  return (
    <div ref={containerRef} className="h-180 min-h-svh w-screen p-4 md:p-6 bg-warna1 overflow-hidden">
      <div className="flex flex-col h-full w-full">
        {/* Top/Center Area: Title & Video Overlay */}
        <div className="relative flex justify-start items-center h-full w-full">
          {/* Main Title Text */}
          <div className="z-2 mb-34 md:mb-0 w-fit md:w-1/2 lg:w-full mix-blend-difference">
            <h1 ref={titleRef} className="text-warna1 text-6xl md:text-8xl text-balance capitalize font-bold opacity-0">
              Where nothing becomes something.
            </h1>
          </div>

          {/* Center Overlay: Video Area */}
          <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none">
            {/* 1. Mobile Version (Polosan tanpa tirai/animasi GSAP) */}
            <div className="block md:hidden mt-20 w-full h-32">
              <div className="w-full h-full overflow-hidden rounded-sm">
                <video ref={videoRefMobile} className="w-full h-full object-cover object-center pointer-events-auto" src="/video/vids.webm" autoPlay loop muted playsInline />
              </div>
            </div>

            {/* 2. Desktop Version (Dengan tirai & animasi GSAP) */}
            <div ref={videoWrapperRef} className="hidden md:block relative w-120 lg:w-140 h-48 lg:h-60 opacity-0">
              <div className="w-full h-full overflow-hidden rounded-sm">
                <video ref={videoRefDesktop} className="w-full h-full object-cover object-center pointer-events-auto" src="/video/vids.webm" autoPlay loop muted playsInline />
              </div>

              {/* Tirai Desktop */}
              <div ref={curtainLeftRef} className="absolute -top-[5%] -bottom-[5%] -left-[5%] w-[60%] bg-warna1 z-11 pointer-events-none" />
              <div ref={curtainRightRef} className="absolute -top-[5%] -bottom-[5%] -right-[5%] w-[60%] bg-warna1 z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Bottom Area: Subtext / Description */}
        <div className="flex h-14 md:h-25 w-full items-end justify-start">
          <div className="w-80 max-w-prose md:w-120">
            <p ref={descRef} className="text-warna2 text-xs md:text-sm leading-relaxed text-pretty lowercase opacity-0">
              I never really set out to become anything specific. I just kept making things until I realized there was already a name for it. Creative Developer.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
