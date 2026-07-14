import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Daftarkan plugin utama GSAP
gsap.registerPlugin(ScrollTrigger);

function LenScrollSmooth({ children }) {
  const { pathname } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // 1. Inisialisasi dasar engine Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Formula akselerasi smooth
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    window.lenis = lenis;

    // 2. Ikat event scroll Lenis ke ScrollTrigger agar kalkulasi trigger presisi
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Masukkan loop RAF Lenis ke internal Ticker GSAP (Rekomendasi resmi Lenis)
    const updateRaf = (time) => {
      lenis.raf(time * 1000); // Konversi ke milidetik
    };
    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0); // Matikan lag smoothing agar tidak ada delay kalkulasi

    // Cleanup saat ganti halaman / unmount komponen
    return () => {
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(updateRaf);
    };
  }, []);

  // 4. Interseptor Navigasi: Paksa layar kembali ke atas secara instan saat URL berubah
  useEffect(() => {
    if (!lenisRef.current) return;

    lenisRef.current.scrollTo(0, {
      immediate: true,
      force: true,
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  }, [pathname]);

  return <>{children}</>;
}

export default LenScrollSmooth;
