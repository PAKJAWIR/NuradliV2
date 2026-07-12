import { createContext, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";

import TransitionOverlay from "../animations/TransitionOverlay";

const TransitionContext = createContext(null);

export function TransitionProvider({ children }) {
  const navigate = useNavigate();

  // URL tujuan (ditahan sementara)
  const pendingPath = useRef(null);

  // Function play() milik Overlay
  const playTransition = useRef(null);

  // Dipanggil Overlay saat mount
  const registerTransition = (playFn) => {
    playTransition.current = playFn;
  };

  // Dipanggil TransitionLink
  const transitionTo = (path) => {
    pendingPath.current = path;

    playTransition.current?.();
  };

  // Dipanggil Overlay ketika animasi masuk selesai
  const completeTransition = () => {
    if (!pendingPath.current) return;

    navigate(pendingPath.current);

    pendingPath.current = null;
  };

  return (
    <TransitionContext.Provider
      value={{
        registerTransition,
        transitionTo,
        completeTransition,
      }}
    >
      {children}

      <TransitionOverlay />
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);
