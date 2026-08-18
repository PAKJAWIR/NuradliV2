import { useRef } from "react";
import { useTransition } from "../context/TransitionContext";
import WoodenBlindTransition from "./WoodenBlindTransition";
import SlideOverlay from "./SlideOverlay";


export default function TransitionOverlay() {
  const { registerTransitionDesktop, completeTransition } = useTransition();

  const playTransitionRef = useRef(null);

  return (
    <SlideOverlay
      onComplete={completeTransition}
      onRegister={(play) => {
        playTransitionRef.current = play;

        registerTransitionDesktop(() => {
          play();
        });
      }}
    />
  );
}
