import { Link } from "react-router-dom";

function ButtonDekstop() {
  return (
    <div className="h-20 w-full p-6 fixed z-999">
      <div className="flex justify-between h-full w-full">
        {/* Logo */}
        <Link to="/" className="flex h-full w-full mix-blend-difference">
          <img src="/Kura.svg" alt="Logo" className="h-full w-fit text-warna2" />
        </Link>

        {/* Menu */}
        <div className="flex h-full w-full">
          <div className="flex flex-row items-center justify-center gap-6 h-full w-full">
            <Link to="/" className="group">
              <h3 className="font-bold text-sm text-warna2 uppercase">Home</h3>
            </Link>
            <Link to="/about" className="group">
              <h3 className="font-bold text-sm text-warna2 uppercase">About</h3>
            </Link>
            <Link to="/works" className="group">
              <h3 className="font-bold text-sm text-warna2 uppercase">Works</h3>
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center justify-end h-full w-full">
          <Link to="/contact" className="flex md:w-[10svw] lg:w-[6svw] items-center justify-center h-full lg:h-[5svh] bg-warna3 rounded-sm">
            <h3 className="font-bold text-sm text-warna2 uppercase">Contact</h3>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ButtonDekstop;
