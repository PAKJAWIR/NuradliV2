import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";
import SplitType from "split-type";

const MENU_ITEMS = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Works", path: "/works" },
  { name: "Contact", path: "/contact" },
];

function ButtonMobile() {
  const [isOpen, setIsOpen] = useState(false);

  const linkWrapperRef = useRef(null);
  const backdropRef = useRef(null);
  const toggleIconRef = useRef(null);

  const activeTlRef = useRef(null);
  const isOpeningRef = useRef(false);
  const isClosingRef = useRef(false);
  const splitRef = useRef(null);

  const { contextSafe } = useGSAP();

  // --- ANIMASI BUKA MENU ---
  const playOpen = contextSafe(() => {
    if (activeTlRef.current) activeTlRef.current.kill();
    if (splitRef.current) splitRef.current.revert();

    isOpeningRef.current = true;
    isClosingRef.current = false;

    const itemsContainer = linkWrapperRef.current.querySelector(".menu-items-container");
    const textTargets = linkWrapperRef.current.querySelectorAll(".menu-text");
    const split = new SplitType(textTargets, { types: "words", wordClass: "split-word" });
    splitRef.current = split;

    const splitWords = linkWrapperRef.current.querySelectorAll(".split-word");
    const menuIcons = linkWrapperRef.current.querySelectorAll(".menu-icon");
    const menuBorders = linkWrapperRef.current.querySelectorAll(".menu-border");
    // Ambil semua tag 'a' (Link) di dalam kontainer menu
    const menuLinks = linkWrapperRef.current.querySelectorAll(".menu-items-container a");

    // State awal (Klik dinonaktifkan sementara)
    gsap.set(itemsContainer, { autoAlpha: 1 });
    gsap.set(menuLinks, { pointerEvents: "none" });
    gsap.set(splitWords, { yPercent: 120, opacity: 0 });
    gsap.set(menuIcons, { opacity: 0, scale: 0.8 });
    gsap.set(menuBorders, { scaleX: 0, transformOrigin: "left center" });
    gsap.set(toggleIconRef.current, { rotate: -75 });

    const tl = gsap.timeline({
      onComplete: () => {
        isOpeningRef.current = false;
      },
      onReverseComplete: () => {
        isOpeningRef.current = false;
        setIsOpen(false);
        gsap.set(itemsContainer, { autoAlpha: 0 });
        split.revert();
        splitRef.current = null;
      },
    });

    activeTlRef.current = tl;

    tl.to(linkWrapperRef.current, {
      width: "14.5rem",
      height: "16.5rem",
      duration: 1.4,
      ease: "expo.inOut",
      borderRadius: "5%",
    })
      .to(backdropRef.current, { opacity: 1, pointerEvents: "auto", duration: 0.8, ease: "power3.out" }, "<")
      .to(toggleIconRef.current, { rotate: 0, duration: 0.8, ease: "power3.out" }, "<")
      .to(menuBorders, { scaleX: 1, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=0.5")
      .to(splitWords, { yPercent: 0, opacity: 1, stagger: 0.08, duration: 0.8, ease: "power3.out" }, ">-=0.5")
      .to(menuIcons, { opacity: 1, scale: 1, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "<")
      // Aktifkan fungsi klik setelah seluruh transisi teks & ikon selesai
      .set(menuLinks, { pointerEvents: "auto" });
  });

  // --- ANIMASI TUTUP MENU ---
  const playClose = contextSafe(() => {
    if (activeTlRef.current) activeTlRef.current.kill();
    if (splitRef.current) splitRef.current.revert();

    isOpeningRef.current = false;
    isClosingRef.current = true;

    const itemsContainer = linkWrapperRef.current.querySelector(".menu-items-container");
    const textTargets = linkWrapperRef.current.querySelectorAll(".menu-text");
    const split = new SplitType(textTargets, { types: "words", wordClass: "split-word" });
    splitRef.current = split;

    const splitWords = linkWrapperRef.current.querySelectorAll(".split-word");
    const menuIcons = linkWrapperRef.current.querySelectorAll(".menu-icon");
    const menuBorders = linkWrapperRef.current.querySelectorAll(".menu-border");
    const menuLinks = linkWrapperRef.current.querySelectorAll(".menu-items-container a");

    // Matikan fungsi klik segera saat menu mulai menutup
    gsap.set(menuLinks, { pointerEvents: "none" });
    gsap.set(menuBorders, { transformOrigin: "right left" });

    const tl = gsap.timeline({
      onComplete: () => {
        isClosingRef.current = false;
        setIsOpen(false);
        split.revert();
        splitRef.current = null;
      },
      onReverseComplete: () => {
        isClosingRef.current = false;
        setIsOpen(true);
        gsap.set(itemsContainer, { autoAlpha: 1 });
      },
    });

    activeTlRef.current = tl;

    tl.to(splitWords, { yPercent: 120, opacity: 0, stagger: -0.08, duration: 0.8, ease: "power3.in" })
      .to(menuIcons, { opacity: 0, scale: 0.8, stagger: -0.08, duration: 0.8, ease: "power3.in" }, "<")
      .to(menuBorders, { scaleX: 0, stagger: -0.08, duration: 0.8, ease: "power3.inOut" }, "-=0.26")
      .to(linkWrapperRef.current, { width: "100%", height: "100%", duration: 1.2, ease: "expo.inOut", borderRadius: "0%" }, ">")
      .to(toggleIconRef.current, { rotate: -75, duration: 0.8, ease: "power3.out" }, ">-=0.8")
      .to(backdropRef.current, { opacity: 0, pointerEvents: "none", duration: 0.8, ease: "power3.inOut" }, ">-=0.8")
      .to(itemsContainer, { autoAlpha: 0, duration: 0.1 }, "-=0.1");
  });

  const handleToggle = () => {
    if (activeTlRef.current && activeTlRef.current.isActive()) {
      if (activeTlRef.current.reversed()) {
        activeTlRef.current.timeScale(0.88).play();
      } else {
        activeTlRef.current.timeScale(0.88).reverse();
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
    if (activeTlRef.current && activeTlRef.current.isActive()) {
      if (isOpeningRef.current && !activeTlRef.current.reversed()) {
        activeTlRef.current.timeScale(0.88).reverse();
      }
      if (isClosingRef.current && activeTlRef.current.reversed()) {
        activeTlRef.current.timeScale(0.88).play();
      }
      return;
    }

    if (isOpen) {
      playClose();
    }
  };

  return (
    <>
      <div ref={backdropRef} onClick={handleClose} className="fixed inset-0 bg-warna2/40 backdrop-blur-xs opacity-0 pointer-events-none z-[998]" />

      <div className="h-19 md:h-20 lg:h-20 w-full p-6 fixed top-0 left-0 z-[999]">
        <div className="relative flex justify-between h-full w-full z-10">
          <Link to="/" className="flex h-full w-full">
            <img src="/Kura.svg" alt="Logo" className="h-full w-fit text-warna2" />
          </Link>

          <div className="flex items-center justify-end h-full w-full">
            <button className="relative flex items-center justify-center h-full w-[14svw] rounded-sm">
              <div ref={linkWrapperRef} className="bg-warna3 h-full w-full absolute top-0 right-0 z-0 overflow-hidden">
                <div className="menu-items-container flex gap-3 p-4 flex-col items-start justify-end h-full w-full overflow-hidden opacity-0 invisible">
                  {MENU_ITEMS.map((item, index) => (
                    <Link key={index} to={item.path} className="group relative flex items-center justify-between w-full pb-2">
                      <h3 className="menu-text font-bold text-md text-warna2 uppercase overflow-hidden block">{item.name}</h3>
                      <Play className="menu-icon w-2.5 h-2.5 text-warna2 fill-warna2" />
                      <span className="menu-border absolute bottom-0 left-0 w-full h-px bg-warna2" />
                    </Link>
                  ))}
                </div>
              </div>

              <div onClick={handleToggle} className="absolute z-10 cursor-pointer select-none w-5 h-5 flex items-center justify-center">
                <span ref={toggleIconRef} className="w-full h-[1.6px] bg-warna2 block origin-center will-change-transform" style={{ transform: "rotate(-75deg)" }} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ButtonMobile;
