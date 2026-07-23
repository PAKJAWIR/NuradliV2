import { useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function BtnMobile() {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  const containerRef = useRef(null);
  const overlayRef = useRef(null);
  const splitRef = useRef(null);

  const menuTextRef = useRef(null);
  const closeTextRef = useRef(null);

  // Anti-spam animation lock
  const isAnimatingRef = useRef(false);

  const navLinks = ["home", "about", "works", "services"];

  // Set posisi awal teks 'close'
  const { contextSafe } = useGSAP(
    () => {
      gsap.set(closeTextRef.current, { yPercent: 100 });
    },
    { scope: containerRef },
  );

  const toggleMenu = contextSafe(() => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    if (!isActive) {
      // 1. STATE BUKA MENU
      setIsActive(true);

      gsap.set(overlayRef.current, {
        display: "block",
        scaleY: 0,
        transformOrigin: "top center",
      });

      const textTargets = overlayRef.current.querySelectorAll(".js-menu-text");
      if (splitRef.current) splitRef.current.revert();
      splitRef.current = new SplitType(textTargets, {
        types: "words",
        wordClass: "split-word",
      });

      // Reset posisi awal elemen
      gsap.set(".split-word", { yPercent: 120, opacity: 0 });
      gsap.set(".js-active-arrow", { xPercent: -100, opacity: 0 });
      gsap.set(".js-active-text", { x: 0 });

      const tl = gsap.timeline({
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });

      // Overlay & Toggle Button text
      tl.to(overlayRef.current, { scaleY: 1, duration: 0.88, ease: "power3.inOut" }, 0)
        .to(menuTextRef.current, { yPercent: -100, duration: 0.88, ease: "power3.inOut" }, 0)
        .to(closeTextRef.current, { yPercent: 0, duration: 0.88, ease: "power3.inOut" }, 0)

        // Tahap 1: Teks link muncul lebih dulu dari bawah
        .to(
          ".split-word",
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.04,
            duration: 0.88,
            ease: "power3.out",
          },
          "-=0.44",
        )

        // Tahap 2: Geser teks link aktif ke kanan & slide in ikon arrow
        .to(
          ".js-active-text",
          {
            x: 44, // Jarak geser memberi ruang untuk arrow
            duration: 0.88,
            ease: "power3.out",
          },
          "-=0.88",
        )
        .to(
          ".js-active-arrow",
          {
            xPercent: 0,
            opacity: 1,
            duration: 0.88,
            ease: "power3.out",
          },
          "<", // Berjalan bersamaan dengan pergerakan teks
        );
    } else {
      // 2. STATE TUTUP MENU
      const tl = gsap.timeline();

      // Kembalikan arrow & posisi teks aktif
      tl.to(".js-active-arrow", {
        xPercent: -100,
        opacity: 0,
        duration: 0.88,
        ease: "power3.out",
      })
        .to(
          ".js-active-text",
          {
            x: 0,
            duration: 0.88,
            ease: "power3.out",
          },
          "<",
        )
        // Sembunyikan teks menu
        .to(
          ".split-word",
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.88,
            ease: "power3.in",
          },
          "-=1",
        )
        // Tutup overlay & reset toggle text
        .to(
          overlayRef.current,
          {
            scaleY: 0,
            duration: 0.88,
            ease: "power3.inOut",
            transformOrigin: "top center",
          },
          ">-0.44",
        )
        .to(menuTextRef.current, { yPercent: 0, duration: 0.88, ease: "power3.inOut" }, "<")
        .to(closeTextRef.current, { yPercent: 100, duration: 0.88, ease: "power3.inOut" }, "<")
        .set(overlayRef.current, {
          display: "none",
          onComplete: () => {
            setIsActive(false);
            if (splitRef.current) splitRef.current.revert();
            isAnimatingRef.current = false;
          },
        });
    }
  });

  return (
    <div ref={containerRef}>
      {/* Navbar Fixed */}
      <div className="h-14 w-full p-4 fixed z-[999] mix-blend-difference">
        <div className="flex flex-row justify-between h-full w-full">
          {/* Brand Name */}
          <div className="flex h-full w-full items-center">
            <h1 className="text-warna1 text-xl lowercase mix-blend-difference font-semibold">nuradli</h1>
          </div>

          {/* Nav Controls */}
          <div className="flex justify-end gap-6 items-center h-full w-full">
            <div className="flex flex-col items-center justify-center h-full w-fit cursor-pointer">
              <h3 className="text-warna1 text-sm lowercase font-semibold">Let's Talk</h3>
              <span className="h-px bg-warna1 w-full"></span>
            </div>

            {/* Toggle Button Text */}
            <div onClick={toggleMenu} className="flex flex-col items-center justify-center h-full w-fit cursor-pointer">
              <div className="relative overflow-hidden flex items-center justify-center">
                <h3 ref={menuTextRef} className="text-warna1 text-sm lowercase font-semibold block">
                  menu
                </h3>
                <h3 ref={closeTextRef} className="text-warna1 text-sm lowercase font-semibold absolute top-0 left-0">
                  close
                </h3>
              </div>
              <span className="h-px bg-warna1 w-full"></span>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      <div ref={overlayRef} className="hidden fixed inset-0 h-svh w-screen z-[998] bg-warna2 p-4 origin-top">
        <div className="flex flex-col h-full w-full">
          {/* Nav Links Wrapper */}
          <div className="flex gap-2 flex-col justify-center items-start h-full w-full">
            {navLinks.map((link) => {
              const isCurrentActive = location.pathname === `/${link}` || (link === "home" && location.pathname === "/");

              return (
                <div key={link} className="relative flex items-center">
                  {/* Container Masking Arrow (Ukuran Eksplisit) */}
                  {isCurrentActive && (
                    <div className="absolute left-0 w-8 h-8 md:w-10 md:h-10 overflow-hidden flex items-center justify-center pointer-events-none">
                      <div className="js-active-arrow flex items-center justify-center w-full h-full">
                        <ArrowRight className="text-warna1 w-full h-full" />
                      </div>
                    </div>
                  )}

                  {/* Container Masking Teks (Bergeser bersamaan tanpa terpotong) */}
                  <div className={`overflow-hidden ${isCurrentActive ? "js-active-text" : ""}`}>
                    <h3 className="js-menu-text text-warna1 text-5xl lowercase cursor-pointer hover:opacity-75 transition-opacity">{link}</h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Time & Location */}
          <div className="flex flex-row justify-between items-end h-fit w-full">
            <div className="overflow-hidden">
              <h3 className="js-menu-text text-warna1 text-sm lowercase">09:30 GMT</h3>
            </div>
            <div className="overflow-hidden">
              <h3 className="js-menu-text text-warna1 text-sm lowercase">indonesia</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BtnMobile;
