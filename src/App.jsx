import { BrowserRouter } from "react-router-dom";
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
  const footerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Definisi breakpoint responsive global GSAP
    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)",
      },
      (context) => {
        const { isDesktop, isTablet, isMobile } = context.conditions;

        // Konfigurasi default start & end
        let scrollStart = "top bottom";
        let scrollEnd = "bottom bottom-=16%";
        let ySet = -124;

        // Modifikasi trigger custom berdasarkan ukuran screen
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

        // Set posisi awal logo footer tersembunyi di atas masking-nya
        gsap.set(".js-global-logo-footer", { yPercent: ySet });

        // Timeline tunggal yang reaktif terhadap perubahan screen
        const logoTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: scrollStart,
            end: scrollEnd,
            scrub: true,
          },
        });

        // Eksekusi animasi paralel logo
        logoTimeline
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

    // Bersihkan seluruh memory trigger dan timeline saat unmount/resize
    return () => mm.revert();
  });

  return (
    <BrowserRouter>
      <TransitionProvider>
        <DeviceProvider>
          <LenScrollSmooth>
            <header>
              <nav>
                <Navbar />
              </nav>
            </header>

            <main className="relative z-10 h-fit md:border-b md:border-warna2/10">
              <AppRoute />
              <BottomBlurOverlay />
            </main>

            <footer ref={footerRef} className="relative">
              <Footer />
            </footer>
          </LenScrollSmooth>
        </DeviceProvider>
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
