function MyStory() {
  return (
    <div className="min-h-svh h-200 lg:h-[110svh] w-screen p-4 md:p-6">
      <div className="flex flex-col h-full w-full ">
        {/* Top */}
        <div className="flex items-center h-1/2 md:h-full w-full ">
          <h2 className="text-warna2 text-4xl md:text-6xl font-bold capitalize">
            so i had to <br /> start somewhere.
          </h2>
        </div>
        {/* Bottom */}
        <div className="flex flex-col lg:flex-row h-full w-full ">
          {/* Left */}
          <div className="flex flex-row items-start md:items-end h-full w-full ">
            {/* Wrapper */}
            <div className="flex gap-6 md:gap-0 flex-col md:flex-row md:justify-between lg:justify-start h-fit md:h-66 w-full ">
              {/* Heading */}
              <div className="flex h-fit md:h-full w-28 md:w-1/4 ">
                <h3 className="text-base md:text-xl text-warna2 capitalize text-balance font-bold">At First, It Was Just For Me.</h3>
              </div>
              {/* Descr */}
              <div className="flex flex-col gap-4 md:gap-6 h-fit md:h-full w-full md:w-1/2 ">
                <p className="text-xs md:text-sm text-warna2 text-pretty lowercase">
                  Drawing was where everything started. As I grew up, technology slowly became part of the picture too. I found myself wondering how websites were made and how simple ideas could become something people could actually use.
                </p>
                <p className="text-xs md:text-sm text-warna2 text-pretty lowercase">Eventually, I realized I didn't have to choose between the two. I could keep creating, just in a different way. It felt like the right place to begin. </p>
              </div>
            </div>
          </div>
          {/* Right */}
          <div className="flex flex-row items-start md:items-end  h-full w-full ">
            {/* Wrapper */}
            <div className="flex gap-6 md:gap-0 flex-col md:flex-row  h-fit md:h-66 md:justify-between lg:justify-center w-full">
              {/* Heading */}
              <div className="flex h-fit md:h-full w-28 md:w-1/4 ">
                <h3 className="text-base md:text-xl text-warna2 capitalize text-balance font-bold">Now, It's For Someone Else.</h3>
              </div>
              {/* Descr */}
              <div className="flex flex-col gap-4 md:gap-6 h-fit md:h-full w-full md:w-1/2 lg:w-100 ">
                <p className="text-xs md:text-sm text-warna2 text-pretty lowercase">
                  I still get the same excitement every time I start something new. The difference is that now, I get to create with someone else's story in mind. There's something really rewarding about turning an idea into something
                  people can connect with and genuinely enjoy.
                </p>
                <p className="text-xs md:text-sm text-warna2 text-pretty lowercase">
                  The rest is mostly experimenting. Trying different ideas, changing little details, and caring about things most people will probably never notice. Somehow, that's usually when everything starts to feel right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyStory;
