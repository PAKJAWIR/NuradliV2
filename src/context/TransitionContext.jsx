import { createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TransitionOverlay from "../animations/TransitionOverlay";
import { useDevice } from "./DeviceProvider";
const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const pendingPath = useRef(null);
  const { isMobile } = useDevice();

  // Dipisah agar transisi desktop dan mobile tidak saling menimpa
  const playDesktopTransition = useRef(null);
  const playMobileTransition = useRef(null);

  const registerTransitionDekstop = (playFn) => {
    playDesktopTransition.current = playFn;
  };
  const registerTransitionMobile = (playFn) => {
    playMobileTransition.current = playFn;
  };


  const transitionToDekstop = (path) => {
    pendingPath.current = path;

    // Eksekusi animasi sesuai ukuran layar (Breakpoint 768px atau sesuaikan)
    if (playDesktopTransition.current) {
      playDesktopTransition.current();
    } else {
      completeTransition();
    }
  };

  const transitionToMobile = (path) => {
    pendingPath.current = path;

    // Eksekusi animasi sesuai ukuran layar (Breakpoint 768px atau sesuaikan)
    if (isMobile && playMobileTransition.current) {
      playMobileTransition.current();
    } else {
      completeTransition();
    }
  };

  const completeTransition = () => {
    if (!pendingPath.current) return;
    navigate(pendingPath.current);
    pendingPath.current = null;
  };

  return (
    <TransitionContext.Provider
      value={{
        registerTransitionDekstop,
        registerTransitionMobile,
        transitionToDekstop,
        transitionToMobile,
        completeTransition,
      }}
    >
      {children}
      <TransitionOverlay />
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
