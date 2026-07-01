import { BrowserRouter } from "react-router-dom";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "./index.css";
import { DeviceProvider } from "./context/DeviceProvider";
import LenScrollSmooth from "./context/LenScrollSmooth";
import Navbar from "./component/organism/Navbar";
import Footer from "./component/organism/Footer";
import AppRoute from "./route/AppRoutes";
import BottomBlurOverlay from "./component/atoms/BottomBlurOverlay";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const footerRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Jalankan pin hanya jika layar desktop (min-width: 768px atau sesuaikan breakpoint-mu)
    mm.add("(min-width: 768px)", () => {
      ScrollTrigger.create({
        trigger: footerRef.current,
        pin: true,
        start: "bottom bottom",
        end: "+=100%",
      });
    });

    // Otomatis bersih-bersih (cleanup) saat pindah device/resize layar
    return () => mm.revert();
  });

  return (
    <BrowserRouter>
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

          <footer ref={footerRef} className="relative md:mt-[-100svh]">
            <Footer />
          </footer>
        </LenScrollSmooth>
      </DeviceProvider>
    </BrowserRouter>
  );
}

export default App;
