import { useLocation } from "react-router-dom";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./index.css";
import { TransitionProvider } from "./context/TransitionContext";
import { DeviceProvider } from "./context/DeviceProvider";
import LenScrollSmooth from "./context/LenScrollSmooth";
import Navbar from "./component/organism/Navbar";
import Footer from "./component/organism/Footer";
import AppRoute from "./route/AppRoutes";
import BottomBlurOverlay from "./component/atoms/BottomBlurOverlay";
import TransitionOverlay from "./animations/TransitionOverlay";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const appRef = useRef(null);
  const footerRef = useRef(null);
  const location = useLocation();

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const { isTablet, isMobile } = context.conditions;

          let scrollStart = "top bottom";
          let scrollEnd = "bottom bottom-=16%";
          let ySet = -124;

          if (isTablet) {
            scrollStart = "center-=20% center+=24%";
            scrollEnd = "center-=1% center+=5%";
            ySet = -176;
          }

          if (isMobile) {
            scrollStart = "top center+=28%";
            scrollEnd = "center-=1% center";
            ySet = -168;
          }

          gsap.set(".js-global-logo-footer", {
            yPercent: ySet,
          });

          gsap
            .timeline({
              scrollTrigger: {
                trigger: footerRef.current,
                start: scrollStart,
                end: scrollEnd,
                scrub: true,
              },
            })
            .to(
              ".js-global-logo-nav",
              {
                yPercent: 124,
                ease: "none",
              },
              0,
            )
            .to(
              ".js-global-logo-footer",
              {
                yPercent: 0,
                ease: "none",
              },
              0,
            );
        },
      );

      return () => mm.revert();
    },
    {
      scope: appRef,
      dependencies: [location.pathname],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={appRef}>
      <DeviceProvider>
        <TransitionProvider>
          <LenScrollSmooth>
            <header>
              <nav>
                <Navbar />
              </nav>
            </header>

            <main className=" md:border-b md:border-warna2/10">
              <AppRoute />
              <BottomBlurOverlay />
            </main>

            <footer ref={footerRef}>
              <Footer />
            </footer>
          </LenScrollSmooth>
        </TransitionProvider>
      </DeviceProvider>
    </div>
  );
}

export default App;
