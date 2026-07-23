import Logo from "../atoms/Logo";
import TransitionLink from "../atoms/TransitionLink";

function Footer() {
  return (
    <>
      <div className="bg-warna2 h-svh w-screen p-4 py-6 md:p-6 overflow-hidden">
        <div className="flex flex-col h-full w-full">
          {/* CTA */}
          <div className="flex flex-col md:flex-row h-full w-full">
            {/* Left / Top */}
            <div className="flex flex-col h-full w-full ">
              {/* Explanation */}
              <div className="flex h-full w-full lg:w-full ">
                <h2 className="text-warna1 text-2xl lg:text-4xl capitalize text-pretty w-full md:w-64 lg:w-xl">simple doesn't mean effortless. it just means someone cared enough to remove what wasn't needed. </h2>
              </div>
              {/* Email */}
              <div className="flex flex-col items-start justify-end h-full w-full ">
                <p className="text-warna1 text-sm md:text-lg">contact me</p>
                <div className="flex flex-col h-fit w-fit">
                  <h1 className="text-warna1 text-xl md:text-2xl">nuradli@gmail.com</h1>
                  <span className="h-0.5 w-full bg-warna1"></span>
                </div>
              </div>
            </div>
            {/* Right / Bottom */}
            <div className="flex flex-row h-full w-full">
              {/* Links */}
              <div className="flex flex-row justify-start md:justify-end items-center  md:items-start h-full w-full ">
                <div className="flex gap-2 flex-col h-fit w-fit">
                  <p className="text-warna1 text-sm md:text-lg lowercase">links</p>
                  <div className="flex flex-col gap-2 h-fit w-fit">
                    <h3 className="text-warna1 text-xl md:text-2xl">about</h3>
                    <h3 className="text-warna1 text-xl md:text-2xl">works</h3>
                    <h3 className="text-warna1 text-xl md:text-2xl">services</h3>
                  </div>
                </div>
              </div>
              {/* Socials */}
              <div className="flex justify-start md:justify-end items-center md:items-start flex-row h-full w-full lg:w-1/3">
                <div className="flex gap-2 flex-col h-fit w-fit">
                  <p className="text-warna1 text-sm md:text-lg lowercase">socials</p>
                  <div className="flex flex-col gap-2 h-fit w-fit">
                    <h3 className="text-warna1 text-xl md:text-2xl">instagram</h3>
                    <h3 className="text-warna1 text-xl md:text-2xl">linkedin</h3>
                    <h3 className="text-warna1 text-xl md:text-2xl">github</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex flex-row justify-start items-end h-fit md:h-full w-full gap-2 md:gap-6 leading-none">
            <h1 className="text-warna1 text-[6rem] md:text-[12rem] lg:text-[18rem] ">nuradli</h1>
            <h1 className="text-warna1 text-xs md:text-xl leading-6 md:leading-14 lg:leading-18">© 2026</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
