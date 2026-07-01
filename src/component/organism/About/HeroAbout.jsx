function HeroAbout() {
  return (
    <div className="min-h-svh h-fit md:h-svh lg:h-fit w-svw bg-warna1 pt-20 p-6">
      <div className="flex flex-col h-full w-full gap-16">
        {/* Top */}
        <div className="flex h-fit md:h-full items-center lg:items-center lg:h-fit w-full ">
          <h1 className=" w-full text-lg md:text-2xl lg:text-5xl font-bold uppercase text-pretty">
            nuradli. an indonesian graphic designer and front-end engineer bridging raw design with scalable code. i practice deliberate subtraction, shaping rigid constraints into functional interfaces. fueled by synthwave and liminal
            spaces, i create digital environments that feel familiar yet fresh. pay attention to the details—there is always one intentional accent color disrupting the minimal layout.
          </h1>
        </div>
        {/* Bottom */}
        <div className="flex flex-col md:justify-end justify-start md:items-end md:flex-row h-auto md:h-140 gap-12 md:gap-2 w-full ">
          {/* Text */}
          <div className="flex flex-col md:flex-row justify-around h-full w-full md:w-[68%]  gap-10 md:gap-2">
            <div className="flex flex-col gap-4 md:gap-6 justify-end h-full w-full ">
              <div className="h-fit w-full uppercase">
                <h2 className="font-bold text-warna2 text-md md:text-lg">Front End Developer</h2>
              </div>
              <div className="flex flex-col h-fit w-full gap-2">
                <p className="text-xs lg:text-sm text-warna2 lowercase">responsive</p>
                <p className="text-xs lg:text-sm text-warna2 lowercase">modern web ui development</p>
                <p className="text-xs lg:text-sm text-warna2 lowercase">high-performance web applications</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-6 justify-end h-full w-full ">
              <div className="h-fit w-full  uppercase">
                <h2 className="font-bold text-warna2 text-md md:text-lg">Graphic Designer</h2>
              </div>
              <div className="flex flex-col h-fit w-full gap-2">
                <p className="text-xs lg:text-sm text-warna2 lowercase">ui/ux design</p>
                <p className="text-xs lg:text-sm text-warna2 lowercase">poster design</p>
                <p className="text-xs lg:text-sm text-warna2 lowercase">Apparel & Merchandise Mockups</p>
              </div>
            </div>
          </div>
          {/* Video */}
          <div className="flex justify-end items-end h-full w-full md:w-1/3 lg:w-1/2 ">
            <img src="/img/Nuradli6.webp" alt="Nuradli" className="h-full lg:h-[80%] w-full md:w-[74%] lg:w-[44%] object-center object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAbout;
