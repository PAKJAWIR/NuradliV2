import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function WoodenBlindTransition({ onRegister, onComplete, stripCount = 8, duration = 0.8, stagger = 0.08, className = "" }) {
  const containerRef = useRef(null);

  // Simpan callback terbaru tanpa membuat GSAP context re-run
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const onRegisterRef = useRef(onRegister);
  onRegisterRef.current = onRegister;

  useGSAP(
    () => {
      const container = containerRef.current;

      if (!container) return;

      const strips = container.querySelectorAll(".js-wooden-blind-strip");

      const shadow = container.querySelector(".js-wooden-blind-shadow");

      // Initial state
      gsap.set(shadow, {
        autoAlpha: 0,
      });

      gsap.set(strips, {
        scaleY: 0,
        transformOrigin: "top center",
      });

      const tl = gsap.timeline({
        paused: true,
      });

      // =========================================
      // SHADOW
      // =========================================

      tl.to(shadow, {
        autoAlpha: 1,
        duration: 0.8,
        ease: "power2.out",
      })

        // =========================================
        // CLOSE
        // =========================================

        .to(
          strips,
          {
            scaleY: 1,
            duration,
            ease: "power3.inOut",
            stagger,
          },
          "<+0.08",
        )

        // =========================================
        // PAGE CHANGE
        // =========================================

        .call(() => {
          onCompleteRef.current?.();
        })

        // =========================================
        // REVEAL
        // =========================================

        .to(
          strips,
          {
            scaleY: 0,
            duration,
            ease: "power3.out",
            stagger: {
              each: stagger,
              from: "end",
            },
          },
          "+=0.14",
        )

        // =========================================
        // SHADOW OUT
        // =========================================

        .to(
          shadow,
          {
            autoAlpha: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "<-0.2",
        )

        // =========================================
        // RESET
        // =========================================

        .set(strips, {
          scaleY: 0,
        })
        .set(shadow, {
          autoAlpha: 0,
        });

      // Expose play function ke parent
      onRegisterRef.current?.(() => {
        tl.restart();
      });

      // Cleanup
      return () => {
        tl.kill();
      };
    },
    {
      scope: containerRef,
      dependencies: [stripCount, duration, stagger],
    },
  );

  return (
    <div ref={containerRef} className={`pointer-events-none fixed inset-0 z-[9999] overflow-hidden ${className}`}>
      {/* Shadow Overlay */}
      <div className="js-wooden-blind-shadow absolute inset-0 bg-warna2/60" />

      {/* Wooden Blind */}
      <div className="absolute inset-0">
        {Array.from({ length: stripCount }, (_, index) => (
          <div
            key={index}
            className="js-wooden-blind-strip absolute left-0 w-full bg-warna2"
            style={{
              top: `${(index * 100) / stripCount}%`,
              height: `calc(${100 / stripCount}% + 2px)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default WoodenBlindTransition;
