import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-router-dom";

function ButtonMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const linkWrapperRef = useRef(null);
  const backdropRef = useRef(null);

  useGSAP(() => {
    setIsAnimating(true);

    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    // Selektor untuk mengambil semua elemen Link teks di dalam menu
    const menuLinks = linkWrapperRef.current.querySelectorAll(".group");

    if (isOpen) {
      // Set awal teks sembunyi total sebelum menu expand
      gsap.set(menuLinks, { autoAlpha: 0, y: 15 });

      // Timeline Open
      tl.to(linkWrapperRef.current, {
        width: "14.5rem",
        height: "15.5rem",
        duration: 1.6,
        ease: "expo.inOut",
        borderRadius: "5%",
      })
        .to(
          backdropRef.current,
          {
            opacity: 1,
            pointerEvents: "auto",
            duration: 0.6,
            ease: "power3.out",
          },
          "<",
        )
        // Teks muncul berurutan (stagger) di akhir ekspansi menu
        .to(
          menuLinks,
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power4.out",
          },
          "-=0.5",
        ); // Memulai animasi teks sedikit sebelum menu selesai expand
    } else {
      // Timeline Close
      // Sembunyikan teks dengan cepat duluan agar tidak overflow keluar kotak saat menciut
      tl.to(menuLinks, {
        autoAlpha: 0,
        y: -10,
        duration: 0.25,
        ease: "power3.in",
      })
        .to(
          linkWrapperRef.current,
          {
            width: "100%",
            height: "100%",
            duration: 1.6,
            ease: "expo.inOut",
            borderRadius: "0%",
          },
          "-=0.1",
        ) // Mengempis sesaat setelah teks mulai memudar
        .to(
          backdropRef.current,
          {
            opacity: 0,
            pointerEvents: "none",
            duration: 0.6,
            ease: "power3.inOut",
          },
          "<",
        );
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (isAnimating) return;
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    if (isAnimating || !isOpen) return;
    setIsOpen(false);
  };

  return (
    <>
      {/* Global Overlay Backdrop */}
      <div ref={backdropRef} onClick={handleClose} className="fixed inset-0 bg-warna2/40 backdrop-blur-xs opacity-0 pointer-events-none z-[998]" />

      {/* Main Navbar Container */}
      <div className="h-19 md:h-20 lg:h-20 w-full p-6 fixed top-0 left-0 z-[999]">
        <div className="relative flex justify-between h-full w-full z-10">
          {/* Logo */}
          <Link to="/" className="flex h-full w-full">
            <img src="/Kura.svg" alt="Logo" className="h-full w-fit text-warna2" />
          </Link>

          {/* Nav Container */}
          <div className="flex items-center justify-end h-full w-full">
            <button className="relative flex items-center justify-center h-full w-[14svw] rounded-sm">
              {/* Wrapper Overlay Menu */}
              <div ref={linkWrapperRef} className="bg-warna3 h-full w-full absolute top-0 right-0 z-0 overflow-hidden">
                {/* Inner container penampung padding statis */}
                <div className="flex gap-3 p-4 flex-col items-start justify-end h-full w-full overflow-hidden">
                  <Link to="/" className="group">
                    <h3 className="font-bold text-md text-warna2 uppercase">Home</h3>
                  </Link>
                  <Link to="/about" className="group">
                    <h3 className="font-bold text-md text-warna2 uppercase">About</h3>
                  </Link>
                  <Link to="/works" className="group">
                    <h3 className="font-bold text-md text-warna2 uppercase">Works</h3>
                  </Link>
                  <Link to="/contact" className="group">
                    <h3 className="font-bold text-md text-warna2 uppercase">Contact</h3>
                  </Link>
                </div>
              </div>

              {/* Ikon Slash */}
              <h3 onClick={handleToggle} className="absolute text-warna2 z-10 cursor-pointer select-none">
                /
              </h3>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ButtonMobile;
