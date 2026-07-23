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
  return (
    <DeviceProvider>
      <TransitionProvider>
        <LenScrollSmooth>
          <header>
            <nav>
              <Navbar />
            </nav>
          </header>

          <main>
            <AppRoute />
          </main>

          <footer>
            <Footer />
          </footer>
        </LenScrollSmooth>
      </TransitionProvider>
    </DeviceProvider>
  );
}

export default App;
