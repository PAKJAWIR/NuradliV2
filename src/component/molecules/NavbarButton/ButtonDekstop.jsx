import TransitionLink from "../../atoms/TransitionLink";

function ButtonDekstop() {
  // Array data menu navigasi
  const navLinks = [
    { name: "about", href: "/about" },
    { name: "works", href: "/works" },
    { name: "services", href: "/services" },
  ];

  return (
    <div className="h-20 w-full p-6 fixed z-[999] mix-blend-difference">
      <div className="flex flex-row justify-between h-full w-full">
        {/* Name / Home Link */}
        <div className="flex h-full w-full items-center">
          <TransitionLink to="/">
            <h1 className="text-warna1 text-xl lowercase mix-blend-difference font-semibold cursor-pointer">nuradli</h1>
          </TransitionLink>
        </div>

        {/* Navigation Links */}
        <div className="flex justify-around items-center h-full md:w-1/2 lg:w-1/4">
          {navLinks.map((item) => (
            <TransitionLink key={item.name} to={item.href}>
              <h2 className="text-warna1 text-md lowercase font-semibold hover:opacity-75 transition-opacity cursor-pointer">{item.name}</h2>
            </TransitionLink>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex h-full md:w-1/3 lg:w-1/6 items-center justify-end">
          <TransitionLink to="/contact">
            <div className="flex flex-col items-center justify-center h-full w-fit cursor-pointer group">
              <h3 className="text-warna1 text-xl lowercase font-semibold">Let's Talk</h3>
              <span className="h-[2px] bg-warna1 w-full transition-all duration-300 group-hover:w-0"></span>
            </div>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}

export default ButtonDekstop;
