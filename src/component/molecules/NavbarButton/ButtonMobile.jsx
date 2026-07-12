import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import SplitType from "split-type";
import Logo from "../../atoms/Logo";
import TransitionLink from "../../atoms/TransitionLink";

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Works", path: "/works" },
  { name: "Contact", path: "/contact" },
];

function ButtonMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const containerRef = useRef(null);
  const activeTlRef = useRef(null);
  const isOpeningRef = useRef(false);
  const isClosingRef = useRef(false);
  const splitRef = useRef(null);

  // Mengaktifkan scope utama GSAP
  const { contextSafe } = useGSAP({ scope: containerRef });

  // --- ANIMASI BUKA MENU ---
  const playOpen = contextSafe(() => {
    isOpeningRef.current = true;
    isClosingRef.current = false;

    let tl = activeTlRef.current;

    if (!tl) {
      // SplitType butuh DOM element langsung agar ter-scope dengan aman
      const textTargets = containerRef.current.querySelectorAll(".menu-text");
      const split = new SplitType(textTargets, { types: "words", wordClass: "split-word" });
      splitRef.current = split;

      // Set state awal langsung menggunakan string selector (auto-scoped oleh useGSAP)
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
        onReverseComplete: () => {
          isOpeningRef.current = false;
          isClosingRef.current = false;
          setIsOpen(false);
        },
      });

      // Menyusun timeline langsung dengan string selector
      tl.to(".js-menu-wrapper", {
        width: "14.5rem",
        height: "16.5rem",
        duration: 1.4,
        ease: "expo.inOut",
        borderRadius: "5%",
      })
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
  });

  // --- ANIMASI TUTUP MENU ---
  const playClose = contextSafe(() => {
    const tl = activeTlRef.current;
    if (!tl) return;

    isOpeningRef.current = false;
    isClosingRef.current = true;

    gsap.set(".menu-items-container a", { pointerEvents: "none" });
    tl.timeScale(0.88).reverse();
  });

  // --- KENDALI INTERUPSI & TRIGGER ANIMASI ---
  const handleToggle = () => {
    const activeTl = activeTlRef.current;

    if (activeTl && activeTl.isActive()) {
      if (isOpeningRef.current && !activeTl.reversed()) {
        isOpeningRef.current = false;
        isClosingRef.current = true;
        activeTl.timeScale(0.88).reverse();
      } else if (isClosingRef.current && activeTl.reversed()) {
        isOpeningRef.current = true;
        isClosingRef.current = false;
        activeTl.timeScale(0.88).play();
      }
      return;
    }

    if (!isOpen) {
      setIsOpen(true);
      playOpen();
    } else {
      playClose();
    }
  };

  const handleClose = () => {
    const activeTl = activeTlRef.current;

    if (activeTl && activeTl.isActive()) {
      if (isOpeningRef.current && !activeTl.reversed()) {
        isOpeningRef.current = false;
        isClosingRef.current = true;
        activeTl.timeScale(0.88).reverse();
      } else if (isClosingRef.current && activeTl.reversed()) {
        isOpeningRef.current = true;
        isClosingRef.current = false;
        activeTl.timeScale(0.88).play();
      }
      return;
    }

    if (isOpen) {
      playClose();
    }
  };

  return (
    <div ref={containerRef}>
      {/* Backdrop */}
      <div onClick={handleClose} className="js-menu-backdrop fixed inset-0 bg-warna2/40 backdrop-blur-xs gpu-fix smooth-item opacity-0 pointer-events-none z-[998]" />

      <div className=" h-19 md:h-20 lg:h-20  w-full fixed top-0 left-0 z-[999]">
        <div className="relative flex justify-between h-full w-full z-10">
          {/* Logo (Jalur Utama ke Home) */}
          <div className="flex h-full w-full overflow-hidden p-6">
            <div className="flex h-full w-full overflow-hidden border">
              <TransitionLink to="/" className="js-global-logo-nav flex h-full w-fit border overflow-hidden ">
                <Logo containerWidth="w-fit" containerHeight="h-full" className="overflow-hidden" />
              </TransitionLink>
            </div>
          </div>
          <div className="flex h-full w-full p-6">
            <div className="js-navbar-btn flex items-center justify-end h-full w-full border">
              <button className="relative flex items-center justify-center h-full w-[14svw] rounded-sm ">
                {/* Menu Wrapper */}
                <div className="js-menu-wrapper bg-warna3 h-full w-full absolute top-0 right-0 z-0 overflow-hidden">
                  <div className="menu-items-container flex gap-3 p-4 flex-col items-start justify-end h-full w-full overflow-hidden opacity-0 invisible">
                    {MENU_ITEMS.map((item, index) => (
                      <TransitionLink key={index} to={item.path} onClick={handleClose} className="group relative flex items-center justify-between w-full pb-2">
                        <h3 className="menu-text font-bold text-md text-warna2 uppercase overflow-hidden block">{item.name}</h3>
                        <Play className="menu-icon w-2.5 h-2.5 text-warna2 fill-warna2" />
                        <span className="menu-border absolute bottom-0 left-0 w-full h-px bg-warna2" />
                      </TransitionLink>
                    ))}
                  </div>
                </div>

                {/* Hamburger Icon */}
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
