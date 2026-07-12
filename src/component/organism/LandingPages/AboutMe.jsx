function AboutMe() {
  // Struktur data manifesto dengan filosofi Stoik & Zen: Mengutamakan esensi, ketenangan, dan fungsi.
  const manifestoItems = [
    {
      title: "ARCHITECTURE",
      desc: "Structure precedes form. Every project is built by isolating the absolute essentials. I deconstruct complex variables into precise layout boundaries and clean informational frameworks.",
    },
    {
      title: "GEOMETRY",
      desc: "Function shapes the canvas. Through calculated grids and deliberate negative space, I navigate asymmetrical balance to ensure transparent navigation dictates the overall visual hierarchy.",
    },
    {
      title: "SYNTHESIS",
      desc: "The coexistence of raw code and visual rhythm. Translating static intent into fluid web environments while neutralizing the friction between technical execution and design principles.",
    },
    {
      title: "EVOLUTION",
      desc: "Endurance is engineered, never accidental. Post-deployment focuses on the continuous refinement of the core foundation. This ensures the product scales seamlessly and remains resilient through inevitable future shifts.",
    },
  ];

  return (
    // Container
    <div className="h-fit md:h-svh lg:h-[150svh] w-svw bg-warna1 p-6 text-warna2 overflow-x-hidden flex flex-col justify-center ">
      {/* MAIN CONTAINER */}
      <div className="h-full justify-center w-full lg:w-[58%] flex flex-col gap-2 md:gap-12 ">
        {/* TOP ROW*/}
        <div className="flex h-54  lg:h-80 items-center justify-center md:justify-start w-full md:w-[84%] lg:w-full ">
          <h2 className="text-md md:text-2xl lg:text-3xl font-bold uppercase text-pretty ">
            From early exploration to final deployment, every step is approached as a unified process. The aim is not simply to build interfaces, but to shape digital environments that retain their foundational order, even as they grow in
            scale and density.
          </h2>
        </div>

        {/* BOTTOM ROW*/}
        <div className="h-fit grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-6 pt-4 ">
          {/* Kolom Kiri: Judul Section (5 dari 12 kolom) */}
          <div className="h-full md:items-start md:justify-end lg:justify-start flex md:col-span-5 md:border-r md:border-warna2/10 pr-6">
            <h3 className="text-sm text-warna2/55 font-bold uppercase ">THE METHODOLOGY.</h3>
          </div>

          {/* Kolom Kanan: List Konten (7 dari 12 kolom) */}
          {/* gap-8 = Jarak antar grup sebesar 32px */}
          <div className="w-full md:col-span-7 justify-center md:items-center lg:items-start flex flex-col gap-6 md:gap-8 ">
            {manifestoItems.map((item, index) => (
              // gap-6 = Jarak internal (Title ke Deskripsi) sebesar 24px
              <div key={index} className="flex flex-col w-[88%] md:w-[60%] gap-4 md:gap-6">
                <h3 className="text-sm text-warna2 font-bold uppercase">{item.title}</h3>
                <p className="text-[12px] md:text-xs  text-warna2/80 font-medium text-pretty max-w-prose">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMe;
