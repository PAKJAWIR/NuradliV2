import { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useDevice } from "../../../context/DeviceProvider";

function Hero() {
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const videoRef = useRef(null);

  const { isDesktop } = useDevice();

  // Pause/play video berdasarkan viewport untuk efisiensi memori (RAM/CPU)
  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Parallax mouse follow (aktif di desktop saja)
  useGSAP(
    () => {
      if (!isDesktop) return;

      const container = containerRef.current;
      const videoWrapper = videoWrapperRef.current;

      if (!container || !videoWrapper) return;

      const maxMove = 100;

      // Interpolasi nilai X biar pergerakan halus
      const xTo = gsap.quickTo(videoWrapper, "x", {
        duration: 1.2,
        ease: "power3.out",
      });

      // Hitung posisi kursor relatif ke container (otomatis freeze di tempat saat keluar container)
      const handleMouseMove = (event) => {
        const rect = container.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const progress = mouseX / rect.width;
        const x = (progress - 0.5) * maxMove * 6;

        xTo(x);
      };

      container.addEventListener("mousemove", handleMouseMove);
      return () => container.removeEventListener("mousemove", handleMouseMove);
    },
    {
      dependencies: [isDesktop],
      scope: containerRef,
    },
  );

  return (
    /* Section: Hero Outer Container */
    <div ref={containerRef} className="h-180 min-h-svh w-screen p-4 md:p-6 bg-warna1 overflow-hidden">
      <div className="flex flex-col h-full w-full">
        {/* Top/Center Area: Title & Video Overlay */}
        <div className="relative flex justify-start items-center h-full w-full">
          {/* Main Title Text */}
          <h1 className="z-2 mb-34 md:mb-0 text-warna1 text-6xl md:text-8xl w-1/2 md:w-1/2 lg:w-full text-balance mix-blend-difference capitalize font-bold">Where nothing becomes something.</h1>

          {/* Center Overlay: Video Wrapper */}
          <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none">
            <div ref={videoWrapperRef} className="mt-20 md:mt-0 w-full md:w-120 lg:w-140 h-38 md:h-48 lg:h-60 overflow-hidden rounded-sm will-change-transform">
              <video ref={videoRef} className="w-full h-full object-cover object-center pointer-events-auto" src="/video/vids.webm" autoPlay loop muted playsInline />
            </div>
          </div>
        </div>

        {/* Bottom Area: Subtext / Description */}
        <div className="flex h-14 md:h-25 w-full items-end justify-start">
          <p className="text-warna2 text-xs md:text-sm w-80 max-w-prose md:w-120 text-pretty lowercase">
            I never really set out to become anything specific. I just kept making things until I realized there was already a name for it. Creative Developer.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
