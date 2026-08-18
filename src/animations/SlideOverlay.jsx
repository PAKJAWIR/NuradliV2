import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function SlideOverlay({ onComplete, onRegister, overlayClassName = "bg-warna2", duration = 0.8 }) {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useGSAP(
    () => {
      const container = containerRef.current;

      const overlay = container.querySelector(".js-slide-transition-overlay");

      const shadow = container.querySelector(".js-slide-transition-shadow");

      // Initial state
      gsap.set(overlay, {
        yPercent: 100,
        force3D: true,
      });

      gsap.set(shadow, {
        opacity: 0,
      });

      // Create timeline once
      const timeline = gsap.timeline({
        paused: true,
      });

      timelineRef.current = timeline;

      timeline
        // Shadow muncul
        .to(shadow, {
          opacity: 1,
          duration,
          ease: "power2.out",
        })

        // Overlay masuk dari bawah
        .to(
          overlay,
          {
            yPercent: 0,
            duration,
            ease: "power3.inOut",
          },
          "<+0.08",
        )

        // Ganti halaman ketika tertutup
        .call(() => {
          onComplete?.();
        })

        // Reveal
        .to(
          overlay,
          {
            yPercent: -100,
            duration,
            ease: "power3.out",
          },
          "+=0.14",
        )

        // Shadow keluar
        .to(
          shadow,
          {
            opacity: 0,
            duration,
            ease: "power3.out",
          },
          "<-0.2",
        )

        // Reset
        .set(overlay, {
          yPercent: 100,
        })
        .set(shadow, {
          opacity: 0,
        });

      // Expose play function
      onRegister?.(() => {
        timeline.restart();
      });

      return () => {
        timeline.kill();
        timelineRef.current = null;
      };
    },
    {
      scope: containerRef,
      dependencies: [],
    },
  );

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Shadow Overlay */}
      <div className="js-slide-transition-shadow absolute inset-0 bg-warna2/60" />

      {/* Main Overlay */}
      <div className={`js-slide-transition-overlay absolute inset-0 ${overlayClassName} will-change-transform`} />
    </div>
  );
}
