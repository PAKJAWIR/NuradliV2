import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "../../animations/SplitTextAnim";

gsap.registerPlugin(ScrollTrigger);

const DURATION = 1.4;

function PreContact() {
  const containerRef = useRef(null);

  // Ref elemen teks
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  // SplitText instances
  const headingSplit = useSplitText(headingRef, { type: "chars, words" });
  const descSplit = useSplitText(descRef, { type: "lines, words" });
  const ctaSplit = useSplitText(ctaRef, { type: "chars, words" });

  useGSAP(
    () => {
      const isAllReady = headingSplit.isReady && descSplit.isReady && ctaSplit.isReady;
      if (!isAllReady) return;

      const allTargets = [...headingSplit.targets, ...descSplit.targets, ...ctaSplit.targets];

      // Reset state awal (cegah zap / FOUT saat refresh)
      gsap.set(allTargets, { yPercent: 120, willChange: "transform" });
      gsap.set(".precontact-line", { scaleX: 0, transformOrigin: "left center", willChange: "transform" });

      // Unhide elemen setelah posisi transform siap
      gsap.set([headingRef.current, descRef.current, ctaRef.current, ".precontact-line"], { autoAlpha: 1 });

      // Timeline animasi (disamakan flow & timing-nya)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 96%",
        },
      });

      tl.to(headingSplit.targets, { yPercent: 0, duration: DURATION, stagger: 0.03, ease: "power3.out" }, 0.2)
        .to(descSplit.targets, { yPercent: 0, duration: DURATION, stagger: 0.02, ease: "power3.out" }, "<")
        .to(ctaSplit.targets, { yPercent: 0, duration: DURATION, stagger: 0.02, ease: "power3.out" }, ">-0.8")
        .to(".precontact-line", { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, ">-0.8");
    },
    {
      scope: containerRef,
      dependencies: [headingSplit.isReady, descSplit.isReady, ctaSplit.isReady],
    },
  );

  return (
    <div ref={containerRef} className="h-66 lg:h-[44svh] w-screen bg-warna1 p-4 md:p-6 overflow-hidden">
      <div className="flex items-start md:items-center justify-center h-full w-full">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-center gap-8 md:gap-0 md:justify-start h-fit w-full">
          {/* Main Heading */}
          <div className="flex items-center justify-start h-full w-full md:w-3xl lg:w-full">
            <h2 ref={headingRef} className="text-warna2 text-4xl md:text-4xl lg:text-7xl w-full md:w-full text-pretty opacity-0">
              So... What’s On Your Mind?
            </h2>
          </div>

          <div className="flex flex-col md:flex-row md:items-end h-full w-full gap-6">
            {/* Description */}
            <div className="flex items-end h-full w-full justify-start md:justify-end">
              <p ref={descRef} className="text-warna2 text-xs md:text-sm text-pretty w-50 md:w-58 lg:w-58 lowercase opacity-0">
                You don't need to have it all figured out. Honestly, neither do I.
              </p>
            </div>

            {/* CTA + Underline Line */}
            <div className="flex items-end justify-start md:justify-end h-full w-1/2">
              <div className="flex flex-col h-fit w-fit">
                <h3 ref={ctaRef} className="text-warna2 text-xl md:text-2xl lg:text-5xl text-balance opacity-0">
                  let’s talk
                </h3>
                <span className="precontact-line w-full h-0.5 lg:h-1 bg-warna2 block origin-left opacity-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreContact;
