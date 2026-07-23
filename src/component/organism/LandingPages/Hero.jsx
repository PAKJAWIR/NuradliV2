function Hero() {
  return (
    <div className="h-180 min-h-svh w-screen p-4 md:p-6 bg-warna1">
      <div className="flex flex-col h-full w-full ">
        <div className="relative flex justify-start items-center h-full w-full  ">
          <h1 className="z-2 mb-34 md:mb-0 text-warna1 text-6xl md:text-8xl lg:text-8xl w-1/2 md:w-1/2 lg:w-full text-balance mix-blend-difference capitalize font-bold">Where nothing becomes something.</h1>

          {/* Wrapper 1: Menjaga posisi tetap di tengah secara absolute */}
          <div className="absolute inset-0 z-1 flex items-center justify-center pointer-events-none">
            {/* Wrapper 2: Ganti w-... dan h-... di sini untuk atur ukuran sesukamu */}
            <div className="mt-20 md:mt-0 w-full md:w-120 lg:w-140 h-38 md:h-48 lg:h-60 overflow-hidden rounded-sm">
              <video className="w-full h-full object-cover object-center pointer-events-auto" src="/video/vids.webm" autoPlay loop muted playsInline />
            </div>
          </div>
        </div>
        <div className="flex h-14 md:h-25 w-full  items-end justify-start ">
          <p className="text-warna2 text-xs md:text-sm w-52 md:w-88 text-pretty lowercase">I am not entirely sure if I'm a creative developer. I just keep making things until they feel right. </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
