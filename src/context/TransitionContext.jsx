import { createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TransitionOverlay from "../animations/TransitionOverlay";
import { useDevice } from "./DeviceProvider";

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();
  const pendingPath = useRef(null);
  const { isMobile } = useDevice();

  const playDesktopTransition = useRef(null);
  const playMobileTransition = useRef(null);
  const playMobileMenuClose = useRef(null);

  const registerTransitionDesktop = (playFn) => {
    playDesktopTransition.current = playFn;
  };

  const registerTransitionMobile = (playFn) => {
    playMobileTransition.current = playFn;
  };

  // Mendaftarkan animasi penutupan menu mobile
  const registerMobileMenuClose = (playFn) => {
    playMobileMenuClose.current = playFn;
  };

  const transitionToDesktop = (path) => {
    pendingPath.current = path;
    window.history.pushState({}, "", path);

    if (playDesktopTransition.current) {
      playDesktopTransition.current();
    } else {
      completeTransition();
    }
  };

  const transitionToMobile = (path) => {
    pendingPath.current = path;

    // URL langsung berubah
    window.history.pushState({}, "", path);

    // Jalankan close animation kalau menu sedang aktif
    if (isMobile && playMobileMenuClose.current) {
      playMobileMenuClose.current(() => {
        completeTransition();
      });
    } else {
      completeTransition();
    }
  };

  const completeTransition = () => {
    if (!pendingPath.current) return;

    const targetPath = pendingPath.current;
    pendingPath.current = null;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        navigate(targetPath, { replace: true });
      });
    });
  };

  return (
    <TransitionContext.Provider
      value={{
        registerTransitionDesktop,
        registerTransitionMobile,
        registerMobileMenuClose,
        transitionToDesktop,
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
