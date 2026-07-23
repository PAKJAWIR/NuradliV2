function AboutMe() {
  return (
    <div className="h-200 md:h-svh lg:h-fit lg:min-h-svh w-screen bg-warna1 p-4 md:p-6">
      <div className="flex flex-col h-full w-full gap-6 ">
        {/* Heading */}
        <div className="flex flex-col-reverse justify-center gap-8 md:gap-0 md:flex-row h-full md:h-1/2 lg:h-[30svh] w-full ">
          {/* Heading */}
          <div className="flex items-center md:items-end h-fit md:h-full w-full ">
            <h2 className="text-warna2 text-2xl w-full md:w-100 lg:w-full lg:text-5xl text-balance capitalize">I Spend Way Too Much Time Moving Things Around... Somehow That's My Job Now.</h2>
          </div>
          {/* Sub Heading */}
          <div className="flex items-end justify-end h-fit md:h-full w-full md:w-[20%] lg:w-[88%] ">
            <div className="flex justify-start md:justify-end items-end h-full w-full lg:w-1/6 ">
              <p className="text-warna2/40 text-[10px] md:text-sm w-fit text-balance ">— why i do this</p>
            </div>
          </div>
        </div>
        {/* Paragraph */}
        <div className="flex h-full lg:h-[80svh] w-full ">
          <div className="flex flex-row h-full w-full ">
            {/* Text n Image */}
            <div className="flex items-center justify-center h-full w-full ">
              <div className="flex flex-col md:flex-row gap-10 md:gap-12 justify-center items-center h-full w-full ">
                {/* Image */}
                <div className="flex justify-start md:justify-end h-40 md:h-66 lg:h-60 w-full md:w-1/2 lg:w-full">
                  <div className="flex h-40 md:h-66 lg:h-62 w-24 md:w-fit">
                    <img src="/img/crossroad.webp" alt="crossroad" className="object-center object-cover h-full w-full" />
                  </div>
                </div>
                {/* Text */}
                <div className="flex flex-col justify-center items-center h-fit w-full gap-6 md:gap-8 ">
                  {/* Paragraph */}
                  <div className="flex flex-col h-full w-full gap-6 md:gap-8">
                    <p className="text-warna2 text-xs md:text-sm text-pretty lowercase">
                      you know what? i don't really have a fancy process. i change my mind... a lot. i'll try an idea, stare at it for a while, throw it away, bring it back, and somehow it ends up better.{" "}
                    </p>
                    <p className="text-warna2 text-xs md:text-sm text-pretty lowercase">
                      i guess that's just how my brain works. i keep asking "what if?" until everything clicks. sometimes it takes a few minutes, sometimes a few days—but if it doesn't feel right yet, i'm probably not done. then i lean
                      back, smile a little, and go... "yeah... that feels better."
                    </p>
                  </div>
                  {/* CTA */}
                  <div className="flex h-full w-full ">
                    <div className="flex flex-col h-fit w-fit">
                      <h3 className="text-warna2 text-lg md:text-xl text-balance">anyway, let's connect.</h3>
                      <span className="w-full h-0.5 bg-warna2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Placeholder */}
            <div className="lg:flex h-full hidden lg:w-1/2 "></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
