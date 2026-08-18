function HeroAbout() {
  return (
    <div className="min-h-svh h-180 md:h-svh w-screen p-4 md:p-6">
      <div className=" flex flex-col h-full w-full ">
        <div className=" flex justify-start items-center md:items-end h-full w-full ">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance md:w-2xl lg:w-266 capitalize">When the stars come out, so do the ideas.</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-end gap-6 md:justify-between items-end h-1/3 md:h-full lg:h-122 w-full ">
          <div className="flex justify-start items-end  h-fit md:h-full w-full ">
            <p className="text-warna2/40 text-[10px] md:text-sm w-50 lg:w-1/3 text-balance ">— The darker it gets, the easier it is to notice the light.</p>
          </div>
          <div className="flex flex-col items-start md:items-end  h-fit md:h-full w-full ">
            <div className="flex flex-col w-76 md:w-88 lg:w-100 h-full items-start justify-end gap-6 md:gap-8 ">
              <p className="text-warna2 text-xs md:text-sm text-pretty lowercase">
                Usually, that’s when everything gets quiet enough for ideas to come forward. The small thoughts that were easy to ignore during the day start to feel clearer, and a little more worth following.{" "}
              </p>
              <p className="text-warna2 text-xs md:text-sm text-pretty lowercase">Some ideas disappear. Some stay. I never really know which ones until I spend some time with them. </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroAbout;
