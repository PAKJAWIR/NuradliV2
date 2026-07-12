import { useLocation } from "react-router-dom";
import Logo from "../../atoms/Logo";
import TransitionLink from "../../atoms/TransitionLink";

function ButtonDekstop() {
  const location = useLocation(); // Ambil rute aktif saat ini

  // Fungsi untuk mengatur opacity menu About dan Works
  const getMenuClass = (path) => {
    const isHome = location.pathname === "/";
    const isCurrentPage = location.pathname === path;

    return `font-bold text-sm uppercase transition-opacity duration-300 ${isHome || isCurrentPage ? "text-warna2 opacity-100" : "text-warna2 opacity-40 hover:opacity-70"}`;
  };

  return (
    <div className="h-20 w-full p-6 fixed z-999">
      <div className="flex justify-between h-full w-full">
        {/* Logo (Jalur Utama ke Home) */}
        <div className="flex h-full w-full overflow-hidden">
          <TransitionLink to="/" className="js-global-logo-nav flex h-full w-fit">
            <Logo containerWidth="w-fit" containerHeight="h-full" className="overflow-hidden" />
          </TransitionLink>
        </div>

        {/* Menu (About & Works) */}
        <div className="flex h-full w-full mix-blend-difference">
          <div className="flex flex-row items-center justify-center gap-6 h-full w-full">
            <TransitionLink to="/" className="group">
              <h3 className={getMenuClass("/")}>Home</h3>
            </TransitionLink>
            <TransitionLink to="/about" className="group">
              <h3 className={getMenuClass("/about")}>About</h3>
            </TransitionLink>
            <TransitionLink to="/works" className="group">
              <h3 className={getMenuClass("/works")}>Works</h3>
            </TransitionLink>
          </div>
        </div>

        {/* Contact (Selalu Nyala Opacity 100) */}
        <div className="flex items-center justify-end h-full w-full">
          <TransitionLink to="/contact" className="flex md:w-[10svw] lg:w-[6svw] items-center justify-center h-full lg:h-[5svh] bg-warna3 rounded-sm">
            <h3 className="font-bold text-sm uppercase text-warna2 opacity-100">Contact</h3>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}

export default ButtonDekstop;
