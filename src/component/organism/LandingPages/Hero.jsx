function Hero() {
  return (
    <div className="min-h-svh md:h-svh lg:h-fit w-svw bg-warna1 pt-20 p-6">
      <div className="flex flex-col h-full w-full gap-16">
        <div className="flex h-full items-center lg:items-center lg:h-88 w-full ">
          <h1 className="text-lg md:text-3xl lg:text-5xl font-bold w-full md:w-[98%] uppercase text-pretty">
            nuradli. based in indonesia. i bridge the gap between graphic design and scalable front-end engineering. by aligning these disciplines, i help brands establish a definitive digital presence. the goal is to craft intuitive
            interfaces that maintain a silent dialogue through intentional constraints and visual poise.
          </h1>
        </div>
        <div className="flex flex-col justify-end items-end lg:flex-row h-100 w-full ">
          <div className="flex justify-end items-end lg:items-end h-full w-[88%] md:w-[68%] ">
            <p className="text-xs md:text-sm text-pretty">
              I am a developer and designer focusing on the union of visual narratives and functional code. My practice operates in the space between quiet aesthetics and technical execution, where every pixel serves a deliberate purpose
              and every line of code follows a natural rhythm. I strive to create digital environments that are not merely seen, but experienced through a grounded balance of form and minimal resistance.{" "}
            </p>
          </div>
          {/* Video */}
          <div className="flex justify-end items-end h-full w-full ">
            <video src={"/video/vids.webm"} className="w-full md:w-[68%] lg:w-[80%] h-[80%] md:h-[76%]  object-cover object-center" autoPlay muted playsInline loop />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
