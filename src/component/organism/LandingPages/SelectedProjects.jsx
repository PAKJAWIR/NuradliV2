import { useState, useRef } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../../../context/DeviceProvider";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS_DATA = [
  {
    name: "N-PROJECTS",
    category: "GRAPHIC DESIGN",
    type: "POSTER ART",
    tools: "ADOBE ILLUSTRATOR",
    color: "bg-emerald-600",
  },
  {
    name: "N-PROJECTS",
    category: "EXPERIMENTAL WEB",
    type: "GSAP ANIMATION",
    technology: "TAILWIND CSS",
    color: "bg-blue-600",
  },
  {
    name: "N-PROJECTS",
    category: "APPAREL DESIGN",
    type: "TECHWEAR MERCHANDISE",
    tools: "VECTOR ART",
    color: "bg-purple-700",
  },
  {
    name: "N-PROJECTS",
    category: "DIGITAL ARTWORK",
    type: "CYBERPUNK POSTER",
    tools: "PHOTOSHOP",
    color: "bg-amber-600",
  },
];

function SelectedProjects() {
  const [activeIndex, setActiveIndex] = useState(0);

// Scope GSAP
  const container = useRef(null);

  const { contextSafe } = useGSAP();
  const { isMobile, isTablet } = useDevice();
  const enableScrollTrigger = isMobile || isTablet;

  // --- SET STATE AWAL ELEMEN ---
  useGSAP(
    () => {
      // Langsung tembak class selector (auto-scoped oleh useGSAP)
      gsap.set(".js-project-wrap", { x: -20 });
      gsap.set(".js-project-desc", { x: 0, autoAlpha: 0 });
      gsap.set(".js-project-btn", { opacity: 0, scale: 0.8 });
      gsap.set(".js-project-title", { opacity: 0.6 });
    },
    { scope: container },
  );

  // --- ANIMASI HOVER / SCROLL TRANSISI (Berbasis Elemen Aktif) ---
  const handleDirectionalHover = contextSafe((item, isHovered) => {
    if (!item) return;

    // Cari child elemen hanya di dalam item yang sedang aktif
    const wrap = item.querySelector(".js-project-wrap");
    const desc = item.querySelector(".js-project-desc");
    const btn = item.querySelector(".js-project-btn");
    const title = item.querySelector(".js-project-title");

    if (isHovered) {
      gsap.to(wrap, { x: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      gsap.to(desc, { autoAlpha: 1, x: 20, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      gsap.to(btn, { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      gsap.to(title, { opacity: 1, duration: 0.8, ease: "power3.out", overwrite: "auto" });
    } else {
      gsap.to(wrap, { x: -20, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      gsap.to(desc, { autoAlpha: 0, x: 0, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      gsap.to(btn, { opacity: 0, scale: 0.8, duration: 0.8, ease: "power3.out", overwrite: "auto" });
      gsap.to(title, { opacity: 0.6, duration: 0.8, ease: "power3.out", overwrite: "auto" });
    }
  });

  // --- SCROLLTRIGGER MOBILE & TABLET ---
  useGSAP(
    () => {
      if (!enableScrollTrigger) return;

      // Ubah semua node ber-class item menjadi Array asli bawaan GSAP
      const items = gsap.utils.toArray(".js-project-item");
      const triggers = [];

      items.forEach((item, index) => {
        const trigger = ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center-=2%",
          onEnter: () => {
            setActiveIndex(index);
            handleDirectionalHover(item, true);
          },
          onLeave: () => {
            handleDirectionalHover(item, false);
          },
          onEnterBack: () => {
            setActiveIndex(index);
            handleDirectionalHover(item, true);
          },
          onLeaveBack: () => {
            handleDirectionalHover(item, false);
          },
        });

        triggers.push(trigger);
      });

      return () => triggers.forEach((t) => t.kill());
    },
    { dependencies: [enableScrollTrigger], scope: container },
  );

  return (
    <div ref={container} className="h-svh lg:h-[128svh] w-svw bg-warna1 p-6 overflow-hidden">
      <div className="flex flex-col h-full w-full">
        {/* HEADING SECTION */}
        <div className="flex items-center justify-start h-[40%] w-full">
          <h2 className="text-warna2 font-bold text-lg md:text-3xl lg:text-4xl uppercase w-full lg:w-[64%] text-pretty">
            A curation of digital works built on deliberate intent and grounded execution. Each piece reflects a process of refining complex variables into definitive and functional visual solutions.
          </h2>
        </div>

        {/* LIST AREA */}
        <div className="flex flex-row items-center h-[60%] w-full relative">
          <div className="flex flex-col items-start justify-center gap-4 h-full w-full z-10">
            {PROJECTS_DATA.map((project, index) => (
              <div
                key={index}
                className="js-project-item flex flex-col h-12 md:h-18 lg:h-14 gap-2 items-start justify-center cursor-pointer select-none w-full"
                onMouseEnter={(e) => {
                  if (enableScrollTrigger) return;
                  setActiveIndex(index);
                  handleDirectionalHover(e.currentTarget, true);
                }}
                onMouseLeave={(e) => {
                  if (enableScrollTrigger) return;
                  handleDirectionalHover(e.currentTarget, false);
                }}
              >
                <div className="js-project-wrap flex flex-row h-full w-full gap-2 justify-start items-center">
                  <Play className="js-project-btn menu-icon w-3 h-3 text-warna2 fill-warna2" />
                  <h3 className="js-project-title text-md md:text-2xl font-bold uppercase text-warna2">
                    {project.name} / {String(index + 1).padStart(2, "0")}
                  </h3>
                </div>

                <p className="js-project-desc overflow-hidden text-[10px] md:text-xs text-warna2/70 uppercase flex items-center gap-2">
                  <span>{project.category}</span>
                  <span className="text-warna2/40">•</span>
                  <span>{project.type}</span>
                  <span className="text-warna2/40">•</span>
                  <span>{project.technology || project.tools}</span>
                </p>
              </div>
            ))}
          </div>

          {/* IMAGE BOX PREVIEW */}
          <div className="z-0 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center lg:left-auto lg:right-0 lg:translate-x-0 lg:justify-end pointer-events-none">
            <div
              className={`h-60 md:h-88 w-[68%] md:w-[48%] lg:w-[24%] max-h-[50svh] rounded-sm pointer-events-auto transition-all duration-500 ease-in-out shadow-2xl
                ${PROJECTS_DATA[activeIndex].color}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedProjects;
