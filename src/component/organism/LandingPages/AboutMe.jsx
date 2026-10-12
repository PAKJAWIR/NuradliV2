import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSplitText } from "../../../animations/SplitTextAnim";
import { useDevice } from "../../../context/DeviceProvider";

gsap.registerPlugin(ScrollTrigger);

const DURATION = 1.2;

function AboutMe() {
  const containerRef = useRef(null);

  // Ref khusus elemen teks yang butuh SplitText
  const headingRef = useRef(null);
  const tagRef = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);
  const ctaTextRef = useRef(null);
  const { isMobile } = useDevice();

  // useSplitText menerima React Ref
  const headingSplit = useSplitText(headingRef, { type: "lines, words" });
  const tagSplit = useSplitText(tagRef, { type: "lines, words" });
  const p1Split = useSplitText(p1Ref, { type: "lines, words" });
  const p2Split = useSplitText(p2Ref, { type: "lines, words" });
  const ctaSplit = useSplitText(ctaTextRef, { type: "lines, words" });

  useGSAP(
    () => {
      const isAllReady = headingSplit.isReady && tagSplit.isReady && p1Split.isReady && p2Split.isReady && ctaSplit.isReady;

      if (!isAllReady) return;

      const allTargets = [...headingSplit.targets, ...tagSplit.targets, ...p1Split.targets, ...p2Split.targets, ...ctaSplit.targets];

      // Reset state awal
      gsap.set(allTargets, { yPercent: 120, autoAlpha: 1, willChange: "transform" });
      gsap.set([headingRef.current, tagRef.current, p1Ref.current, p2Ref.current, ctaTextRef.current], { autoAlpha: 1 });

      // Class selector ter-scope otomatis di dalam useGSAP
      gsap.set(".about-cta-line", { scaleX: 0, transformOrigin: "left center" });

      // Parallax Image - Class selector murni
      gsap.fromTo(
        ".about-img",
        { yPercent: -6 },
        {
          yPercent: 6,
          ease: "none",
          scrollTrigger: {
            trigger: ".about-img-wrapper",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Master Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isMobile ? "top 84%" : "top 96%",
        },
      });

      tl.fromTo(".about-img-overlay", { scaleY: 1 }, { scaleY: 0, duration: 1.8, ease: "power3.inOut" }, 0)
        .to(headingSplit.targets, { yPercent: 0, duration: DURATION, stagger: 0.03, ease: "power3.out" }, 0.2)
        .to(tagSplit.targets, { yPercent: 0, duration: DURATION, stagger: 0.02, ease: "power3.out" }, "<")
        .to(p1Split.targets, { yPercent: 0, duration: DURATION, stagger: 0.008, ease: "power3.out" }, ">-0.8")
        .to(p2Split.targets, { yPercent: 0, duration: DURATION, stagger: 0.008, ease: "power3.out" }, ">-1")
        .to(ctaSplit.targets, { yPercent: 0, duration: DURATION, stagger: 0.02, ease: "power3.out" }, ">-1")
        .to(".about-cta-line", { scaleX: 1, duration: 1.4, ease: "power3.inOut" }, ">-0.8");
    },
    {
      scope: containerRef,
      dependencies: [headingSplit.isReady, tagSplit.isReady, p1Split.isReady, p2Split.isReady, ctaSplit.isReady],
    },
  );

  return (
    <div ref={containerRef} className="h-200 md:h-svh lg:h-fit lg:min-h-svh w-screen bg-warna1 p-4 md:p-6">
      <div className="flex flex-col h-full w-full gap-6">
        {/* Heading Section */}
        <div className="flex flex-col-reverse justify-center gap-8 md:gap-0 md:flex-row h-full md:h-1/2 lg:h-[30svh] w-full">
          <div className="flex items-center md:items-end h-fit md:h-full w-full">
            <h2 ref={headingRef} className="text-warna2 text-2xl w-full md:w-100 lg:w-full lg:text-5xl text-balance capitalize opacity-0">
              I Spend Way Too Much Time Moving Things Around... Somehow That's My Job Now.
            </h2>
          </div>

          <div className="flex items-end justify-end h-fit md:h-full w-full md:w-[20%] lg:w-[88%]">
            <div className="flex justify-start md:justify-end items-end h-full w-full lg:w-1/6">
              <p ref={tagRef} className="text-warna2/40 text-[10px] md:text-sm w-fit text-balance opacity-0">
                — why i do this
              </p>
            </div>
          </div>
        </div>

        {/* Paragraph & Media Section */}
        <div className="flex h-full lg:h-[80svh] w-full">
          <div className="flex flex-row h-full w-full">
            <div className="flex items-center justify-center h-full w-full">
              <div className="flex flex-col md:flex-row gap-10 md:gap-12 justify-center items-center h-full w-full">
                {/* Image Wrapper */}
                <div className="flex justify-start md:justify-end h-40 md:h-66 lg:h-60 w-full md:w-1/2 lg:w-full rounded-xs md:rounded-sm">
                  <div className="about-img-wrapper flex h-40 md:h-66 lg:h-60 w-24 md:w-fit overflow-hidden relative rounded-xs md:rounded-sm">
                    <img src="/img/crossroad.webp" alt="crossroad" className="about-img object-center object-cover h-full w-full scale-125" />
                    <div className="about-img-overlay absolute inset-0 bg-warna1 z-10 origin-top pointer-events-none" />
                  </div>
                </div>

                {/* Text Section */}
                <div className="flex flex-col justify-center items-center h-fit w-full gap-6 md:gap-8">
                  <div className="about-paragraph-group flex flex-col h-full w-full gap-6 md:gap-8">
                    <p ref={p1Ref} className="text-warna2 text-xs md:text-sm text-pretty lowercase opacity-0">
                      you know what? i don't really have a fancy process. i change my mind... a lot. i'll try an idea, stare at it for a while, throw it away, bring it back, and somehow it ends up better.
                    </p>

                    <p ref={p2Ref} className="text-warna2 text-xs md:text-sm text-pretty lowercase opacity-0">
                      i guess that's just how my brain works. i keep asking "what if?" until everything clicks. sometimes it takes a few minutes, sometimes a few days—but if it doesn't feel right yet, i'm probably not done. then i lean
                      back, smile a little, and go... "yeah... that feels better."
                    </p>
                  </div>

                  {/* Inline CTA Section */}
                  <div className="flex h-full w-full">
                    <div className="flex flex-col h-fit w-fit">
                      <h3 ref={ctaTextRef} className="text-warna2 text-lg md:text-xl text-balance opacity-0">
                        anyway, let's connect.
                      </h3>
                      <span className="about-cta-line w-full h-0.5 bg-warna2 block origin-left" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:flex h-full hidden lg:w-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
