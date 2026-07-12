import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { useTransition } from "../context/TransitionContext";

export default function TransitionOverlay() {
  const { registerTransition, completeTransition } = useTransition();

  const tl = useRef(null);

  useGSAP(() => {
    // Posisi awal: di bawah layar
    gsap.set(".js-transition-overlay", {
      yPercent: 100,
    });

    tl.current = gsap.timeline({
      paused: true,
    });

    tl.current
      // Slide masuk dari bawah
      .to(".js-transition-overlay", {
        yPercent: 0,
        duration: 0.6,
        ease: "power3.out",
      })

      // Setelah layar tertutup penuh, ganti halaman
      .call(completeTransition)

      // Slide keluar ke atas
      .to(
        ".js-transition-overlay",
        {
          yPercent: -100,
          duration: 0.6,
          ease: "power3.out",
        },
        "+=0.1",
      )

      // Reset posisi untuk transisi berikutnya
      .set(".js-transition-overlay", {
        yPercent: 100,
      });

    registerTransition(() => {
      tl.current.restart();
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <div className="js-transition-overlay absolute inset-0 bg-warna3" />
    </div>
  );
}
