import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Play } from "lucide-react";
import SplitType from "split-type";
import Logo from "../../atoms/Logo";
import { useNavigate } from "react-router-dom";
import { useTransition } from "../../../context/TransitionContext";
import TransitionLink from "../../atoms/TransitionLink";

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Works", path: "/works" },
  { name: "Contact", path: "/contact" },
];

function ButtonMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { registerTransitionMobile, completeTransition } = useTransition();

  const containerRef = useRef(null);
  const activeTlRef = useRef(null);
  const isOpeningRef = useRef(false);
  const isClosingRef = useRef(false);
  const splitRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const pendingLogoPathRef = useRef("/");

  // Mengambil scope container aman untuk animasi GSAP
  const { contextSafe } = useGSAP({ scope: containerRef });

  // --- 1. HELPER: TOTAL RESET KE DEFAULT ---
  const resetToDefault = () => {
    setIsOpen(false);
    isOpeningRef.current = false;
    isClosingRef.current = false;

    if (splitRef.current) splitRef.current.revert();
    if (activeTlRef.current) {
      activeTlRef.current.kill();
      activeTlRef.current = null;
    }

    gsap.set([".js-menu-wrapper", ".menu-items-container", ".menu-text", ".menu-icon", ".menu-icon svg", ".menu-border", ".js-menu-backdrop", ".js-wrapper-padding"], { clearProps: "all" });
    gsap.set(".menu-items-container", { autoAlpha: 0 });
    gsap.set(".menu-items-container a", { pointerEvents: "auto" });
  };

  // --- 2. HANDLER INTERUPSI AKTIF ---
  const handleActiveInterruption = () => {
    const tl = activeTlRef.current;
    if (tl && tl.isActive()) {
      const isGoingReverse = !tl.reversed();
      isOpeningRef.current = !isGoingReverse;
      isClosingRef.current = isGoingReverse;

      tl.timeScale(0.88);
      isGoingReverse ? tl.reverse() : tl.play();
      return true;
    }
    return false;
  };

  // --- 3. ANIMASI BUKA MENU ---
  const playOpen = () => {
    isOpeningRef.current = true;
    isClosingRef.current = false;
    let tl = activeTlRef.current;

    if (!tl) {
      const textTargets = containerRef.current.querySelectorAll(".menu-text");
      splitRef.current = new SplitType(textTargets, { types: "words", wordClass: "split-word" });

      gsap.set(".menu-items-container", { autoAlpha: 1 });
      gsap.set(".split-word", { yPercent: 120, opacity: 0 });
      gsap.set(".menu-icon", { opacity: 0, scale: 0.8 });
      gsap.set(".menu-border", { scaleX: 0, transformOrigin: "left center" });
      gsap.set(".js-menu-line", { rotate: -75 });

      tl = gsap.timeline({
        paused: true,
        onComplete: () => {
          isOpeningRef.current = false;
        },
        onReverseComplete: resetToDefault,
      });

      tl.to(".js-menu-wrapper", { width: "14.5rem", height: "16.5rem", duration: 1.4, ease: "expo.inOut", borderRadius: "0.6rem" })
        .to(".js-menu-backdrop", { opacity: 1, pointerEvents: "auto", duration: 0.8, ease: "power2.out" }, "<")
        .to(".js-menu-line", { rotate: 0, duration: 0.8, ease: "power2.out" }, "<")
        .to(".menu-border", { scaleX: 1, stagger: 0.08, duration: 0.8, ease: "power2.out" }, "-=0.5")
        .to(".split-word", { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power2.out" }, ">-=0.8")
        .to(".menu-icon", { opacity: 1, scale: 1, stagger: 0.08, duration: 0.8, ease: "power2.out" }, "<")
        .set(".menu-items-container a", { pointerEvents: "auto" });

      activeTlRef.current = tl;
    }
    gsap.set(".menu-items-container a", { pointerEvents: "none" });
    tl.timeScale(1).play();
  };

  // --- 4. ANIMASI TUTUP MENU ---
  const playClose = () => {
    const tl = activeTlRef.current;
    if (!tl) return;
    isOpeningRef.current = false;
    isClosingRef.current = true;
    gsap.set(".menu-items-container a", { pointerEvents: "none" });
    tl.timeScale(0.88).reverse();
  };

  const handleToggle = () => {
    if (isTransitioningRef.current || handleActiveInterruption()) return;
    !isOpen ? (setIsOpen(true), playOpen()) : playClose();
  };

  const handleClose = () => {
    if (isTransitioningRef.current || handleActiveInterruption()) return;
    if (isOpen) playClose();
  };

  useGSAP(() => {
    registerTransitionMobile(playHandleLogo);
  }, []);

  // --- 5. KUSTOM ANIMASI TRANSISI SAAT RUTE DIKLIK ---
  const handleUrl = contextSafe((e, path) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (isTransitioningRef.current) return;
    if (window.location.pathname === path) return;

    isTransitioningRef.current = true;

    const allIcons = containerRef.current.querySelectorAll(".menu-icon svg");
    const clickedIcon = e.currentTarget.querySelector(".menu-icon svg");

    gsap.set([".menu-items-container a", ".js-menu-backdrop"], { pointerEvents: "none" });

    const tlTransition = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
        resetToDefault();
      },
    });

    tlTransition
      .to(allIcons, { rotate: 0, duration: 0.6, ease: "power3.out" })
      .to(clickedIcon, { rotate: 90, duration: 0.6, ease: "power3.out" }, "<") // Memperbaiki typo kurung tutup pada string ease
      .to(".split-word", { yPercent: 120, opacity: 0, stagger: -0.08, duration: 0.8, ease: "power2.in" }, "+=0.02")
      .to(".menu-icon", { opacity: 0, scale: 0, stagger: -0.08, duration: 0.8, ease: "power2.in" }, "<")
      .to(".menu-border", { scaleX: 0, stagger: -0.08, duration: 0.8, ease: "power2.in" }, "<")
      .to(".js-menu-line", { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut" }, ">-=0.1")
      .to(".js-menu-wrapper", { width: "100vw", height: "100vh", borderRadius: "0px", duration: 1.4, ease: "expo.inOut" }, "-=0.2")
      .to(".js-wrapper-padding", { padding: "0px", duration: 1.4, ease: "expo.inOut" }, "<")
      .to(".js-menu-backdrop", { opacity: 0, duration: 0.8 }, "<")
      .call(() => {
        navigate(path);
      })
      .to(".js-menu-wrapper", { width: "100%", height: "100%", borderRadius: "0px", duration: 1.4, ease: "expo.inOut" }, "+=0.2")
      .to(".js-wrapper-padding", { padding: "1.5rem", duration: 1.4, ease: "expo.inOut" }, "<")
      .to(".js-menu-line", { scaleX: 1, duration: 0.8, ease: "power2.out" }, "-=0.1")
      .to(".js-menu-line", { rotate: -75, duration: 0.8, ease: "power2.out", transformOrigin: "center center" }, ">-=0.1");
  });

  // --- 6. ANIMASI KHUSUS LOGO ---
  const playHandleLogo = contextSafe(() => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const tl = gsap.timeline({
      onComplete: () => {
        isTransitioningRef.current = false;
        resetToDefault();
      },
    });

    tl.to(".js-menu-line", { rotate: 0, duration: 0.8, ease: "power2.out" })
      .to(".js-menu-line", { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "power2.inOut" }, ">-=0.2")
      .to(".js-menu-wrapper", { width: "100vw", height: "100vh", borderRadius: "0px", duration: 1.4, ease: "expo.inOut" }, "-=0.2")
      .to(".js-wrapper-padding", { padding: "0px", duration: 1.4, ease: "expo.inOut" }, "<")
      .call(completeTransition)
      .to(".js-menu-wrapper", { width: "100%", height: "100%", borderRadius: "0px", duration: 1.4, ease: "expo.inOut" }, "+=0.2")
      .to(".js-wrapper-padding", { padding: "1.5rem", duration: 1.4, ease: "expo.inOut" }, "<")
      .to(".js-menu-line", { scaleX: 1, duration: 0.8, ease: "power2.out" }, "-=0.1")
      .to(".js-menu-line", { rotate: -75, duration: 0.8, ease: "power2.out", transformOrigin: "center center" }, ">-=0.1");
  }, []);

  return (
    <div ref={containerRef}>
      {/* Backdrop */}
      <div onClick={handleClose} className="js-menu-backdrop fixed inset-0 bg-warna2/40 backdrop-blur-xs gpu-fix smooth-item opacity-0 pointer-events-none z-[998]" />

      {/* Navigation Top Bar */}
      <div className="h-19 md:h-20 lg:h-20 w-full fixed top-0 left-0 z-[999]">
        <div className="relative flex justify-between h-full w-full z-10">
          {/* Bagian Kiri: Logo */}
          <div className="flex h-full w-full p-6">
            <div className="flex h-full w-full overflow-hidden">
              <TransitionLink to="/" className={`js-global-logo-nav flex h-full w-fit overflow-hidden ${isOpen ? "pointer-events-none" : "pointer-events-auto"}`}>
                <Logo containerWidth="w-fit" containerHeight="h-full" className="overflow-hidden" />
              </TransitionLink>
            </div>
          </div>

          {/* Bagian Kanan: Menu Trigger & Panel Container */}
          <div className="js-wrapper-padding flex h-full w-full p-6">
            <div className="flex items-center justify-end h-full w-full">
              <button className="relative flex items-center justify-center h-full w-[14svw] rounded-sm">
                {/* Panel Menu (Akan membesar menjadi overlay transisi) */}
                <div className="js-menu-wrapper bg-warna3 h-full w-full absolute top-0 right-0 z-0 overflow-hidden">
                  <div className="menu-items-container flex gap-3 p-4 flex-col items-start justify-end h-full w-full overflow-hidden opacity-0 invisible">
                    {MENU_ITEMS.map((item, index) => {
                      const isActive = window.location.pathname === item.path;
                      return (
                        <a key={index} href={item.path} onClick={(e) => handleUrl(e, item.path)} className="group relative flex items-center justify-between w-full pb-2">
                          <h3 className="menu-text font-bold text-md text-warna2 uppercase overflow-hidden block">{item.name}</h3>
                          <div className="menu-icon flex items-center justify-center">
                            <Play className={`w-2.5 h-2.5 text-warna2 fill-warna2 ${isActive ? "rotate-90" : ""}`} />
                          </div>
                          <span className="menu-border absolute bottom-0 left-0 w-full h-px bg-warna2" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Hamburger Line Trigger */}
                <div onClick={handleToggle} className="absolute z-10 cursor-pointer select-none w-5 h-5 flex items-center justify-center">
                  <span className="js-menu-line w-full h-[1.6px] bg-warna2 block origin-center will-change-transform" style={{ transform: "rotate(-75deg)" }} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ButtonMobile;
