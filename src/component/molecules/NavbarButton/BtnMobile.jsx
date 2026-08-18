import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SplitType from "split-type";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import TransitionLink from "../../atoms/TransitionLink";
import { useTransition } from "../../../context/TransitionContext";

const navLinks = [
  { name: "home", href: "/" },
  { name: "about", href: "/about" },
  { name: "works", href: "/works" },
  { name: "services", href: "/services" },
];

const DURATION = 0.88;

function BtnMobile() {
  const [isActive, setIsActive] = useState(false);
  const [activePath, setActivePath] = useState("");

  const location = useLocation();
  const { registerMobileMenuClose } = useTransition();

  const containerRef = useRef(null);
  const outerRef = useRef(null);
  const overlayRef = useRef(null);
  const splitRef = useRef(null);

  const menuTextRef = useRef(null);
  const closeTextRef = useRef(null);

  const isAnimatingRef = useRef(false);

  useEffect(() => {
    if (!isActive && !isAnimatingRef.current) {
      setActivePath(location.pathname);
    }
  }, [location.pathname, isActive]);

  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
    } else {
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
    }

    return () => {
      document.body.style.overflow = "";
      if (window.lenis) window.lenis.start();
    };
  }, [isActive]);

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(closeTextRef.current, {
        yPercent: 100,
      });
    },
    {
      scope: containerRef,
    },
  );

  const getSelector = () => gsap.utils.selector(containerRef);

  const prepareMenu = () => {
    gsap.set(outerRef.current, {
      display: "block",
    });

    gsap.set(overlayRef.current, {
      scaleY: 0,
      transformOrigin: "top center",
    });

    const textTargets = overlayRef.current.querySelectorAll(".js-menu-text");

    if (splitRef.current) {
      splitRef.current.revert();
    }

    splitRef.current = new SplitType(textTargets, {
      types: "words",
      wordClass: "split-word",
    });

    const q = getSelector();

    gsap.set(q(".split-word"), {
      yPercent: 120,
      opacity: 0,
    });

    gsap.set(q(".js-active-arrow"), {
      xPercent: -100,
    });

    gsap.set(q(".js-active-text"), {
      x: 0,
    });
  };

  const openMenu = contextSafe(() => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    setIsActive(true);
    setActivePath(location.pathname);

    prepareMenu();

    const q = getSelector();

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
      },
    });

    tl.to(
      overlayRef.current,
      {
        scaleY: 1,
        duration: DURATION,
        ease: "power3.inOut",
      },
      0,
    )
      .to(
        menuTextRef.current,
        {
          yPercent: -100,
          duration: DURATION,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        closeTextRef.current,
        {
          yPercent: 0,
          duration: DURATION,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        q(".split-word"),
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.04,
          duration: DURATION,
          ease: "power3.out",
        },
        "-=0.44",
      )
      .to(
        q(".js-active-text"),
        {
          x: 44,
          duration: DURATION,
          ease: "power3.out",
        },
        "-=0.88",
      )
      .to(
        q(".js-active-arrow"),
        {
          xPercent: 0,
          duration: DURATION,
          ease: "power3.out",
        },
        "<",
      );
  });

  const closeMenu = contextSafe(() => {
    if (!isActive || isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const q = getSelector();

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        setIsActive(false);
        setActivePath(location.pathname);

        if (splitRef.current) {
          splitRef.current.revert();
          splitRef.current = null;
        }
      },
    });

    tl.to(
      q(".js-active-arrow"),
      {
        xPercent: -100,
        duration: DURATION,
        ease: "power3.out",
      },
      0,
    )
      .to(
        q(".js-active-text"),
        {
          x: 0,
          duration: DURATION,
          ease: "power3.out",
        },
        "<",
      )
      .to(
        q(".split-word"),
        {
          yPercent: 120,
          opacity: 0,
          duration: DURATION,
          ease: "power3.in",
        },
        "-=0.88",
      )
      .to(
        overlayRef.current,
        {
          scaleY: 0,
          duration: DURATION,
          ease: "power3.inOut",
          transformOrigin: "top center",
        },
        ">-0.44",
      )
      .to(
        menuTextRef.current,
        {
          yPercent: 0,
          duration: DURATION,
          ease: "power3.inOut",
        },
        "<",
      )
      .to(
        closeTextRef.current,
        {
          yPercent: 100,
          duration: DURATION,
          ease: "power3.inOut",
        },
        "<",
      )
      .set(outerRef.current, {
        display: "none",
      });
  });

  const closeMenuForNavigation = contextSafe((onNavigate) => {
    if (!isActive) {
      onNavigate?.();
      return;
    }

    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;

    const q = getSelector();

    const tl = gsap.timeline({
      onComplete: () => {
        isAnimatingRef.current = false;
        setIsActive(false);

        if (splitRef.current) {
          splitRef.current.revert();
          splitRef.current = null;
        }

        setActivePath(location.pathname);
      },
    });

    tl.call(() => {
      onNavigate?.();
    })
      .to(
        q(".js-active-arrow"),
        {
          xPercent: -100,
          duration: DURATION,
          ease: "power3.out",
        },
        0,
      )

      .to(
        q(".js-active-text"),
        {
          x: 0,
          duration: DURATION,
          ease: "power3.out",
        },
        "<",
      )
      .to(
        q(".split-word"),
        {
          yPercent: 120,
          opacity: 0,
          duration: DURATION,
          ease: "power3.in",
        },
        "-=0.88",
      )
      .to(
        overlayRef.current,
        {
          scaleY: 0,
          duration: DURATION,
          ease: "power3.inOut",
          transformOrigin: "top center",
        },
        ">-0.44",
      )
      .to(
        menuTextRef.current,
        {
          yPercent: 0,
          duration: DURATION,
          ease: "power3.inOut",
        },
        "<",
      )
      .to(
        closeTextRef.current,
        {
          yPercent: 100,
          duration: DURATION,
          ease: "power3.inOut",
        },
        "<",
      )
      .set(outerRef.current, {
        display: "none",
      });
  });

  useEffect(() => {
    if (isActive) {
      registerMobileMenuClose(closeMenuForNavigation);
    } else {
      registerMobileMenuClose(null);
    }

    return () => {
      registerMobileMenuClose(null);
    };
  }, [isActive, registerMobileMenuClose, closeMenuForNavigation]);

  const toggleMenu = contextSafe(() => {
    if (isAnimatingRef.current) return;

    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  return (
    <div ref={containerRef}>
      <div className="h-14 w-full p-4 fixed z-[999] mix-blend-difference">
        <div className="flex flex-row justify-between h-full w-full">
          <div className="flex h-full w-full items-center">
            <TransitionLink to="/">
              <h1 className="text-warna1 text-xl lowercase mix-blend-difference font-semibold">nuradli</h1>
            </TransitionLink>
          </div>

          <div className="flex justify-end gap-6 items-center h-full w-full">
            <TransitionLink to="/contact">
              <div className="flex flex-col items-center justify-center h-full w-fit cursor-pointer">
                <h3 className="text-warna1 text-sm lowercase font-semibold">Let's Talk</h3>

                <span className="h-px bg-warna1 w-full" />
              </div>
            </TransitionLink>

            <div onClick={toggleMenu} className="flex flex-col items-center justify-center h-full w-fit cursor-pointer">
              <div className="relative overflow-hidden flex items-center justify-center">
                <h3 ref={menuTextRef} className="text-warna1 text-sm lowercase font-semibold block">
                  menu
                </h3>

                <h3 ref={closeTextRef} className="text-warna1 text-sm lowercase font-semibold absolute top-0 left-0">
                  close
                </h3>
              </div>

              <span className="h-px bg-warna1 w-full" />
            </div>
          </div>
        </div>
      </div>

      <div ref={outerRef} className="hidden fixed inset-0 w-full z-[998] pointer-events-auto">
        <div ref={overlayRef} className="relative h-full w-full bg-warna2 p-4 flex flex-col justify-between overflow-hidden">
          <div className="flex gap-2 flex-col justify-center items-start h-full w-full">
            {navLinks.map((item) => {
              const isCurrentActive = activePath === item.href;

              return (
                <TransitionLink key={item.name} to={item.href}>
                  <div className="relative flex items-center">
                    {isCurrentActive && (
                      <div className="absolute left-0 w-8 h-8 md:w-10 md:h-10 overflow-hidden flex items-center justify-center pointer-events-none">
                        <div className="js-active-arrow flex items-center justify-center w-full h-full">
                          <ArrowRight className="text-warna1 w-full h-full" />
                        </div>
                      </div>
                    )}

                    <div className={`overflow-hidden ${isCurrentActive ? "js-active-text" : ""}`}>
                      <h3 className="js-menu-text text-warna1 text-5xl lowercase cursor-pointer hover:opacity-75 transition-opacity">{item.name}</h3>
                    </div>
                  </div>
                </TransitionLink>
              );
            })}
          </div>

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
