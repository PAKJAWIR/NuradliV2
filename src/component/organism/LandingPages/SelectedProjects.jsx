function SelectedProjects() {
  return (
    <div className="h-svh lg:h-[128svh] w-svw bg-warna1 p-6 overflow-hidden ">
      {/* CONTAINER UTAMA: Menggunakan flex-col untuk membagi area atas dan bawah */}
      <div className="flex flex-col h-full w-full ">
        {/* TOP ROW: Heading Section (Makan ruang ±40% tinggi) */}
        <div className="flex items-center justify-start h-[40%] w-full">
          <h2 className="text-warna2 font-bold text-lg md:text-3xl lg:text-4xl uppercase w-full lg:w-[64%] text-pretty">
            A curation of digital works built on deliberate intent and grounded execution. Each piece reflects a process of refining complex variables into definitive and functional visual solutions.
          </h2>
        </div>

        {/* BOTTOM ROW: Area List & Image Overlay (Makan ruang space sisanya) */}
        <div className="flex flex-row items-center h-[60%] w-full relative ">
          {/* LIST PROJECT: Tetap aman di sisi kiri */}
          <div className="flex flex-col items-start justify-center gap-4 h-full w-full z-2 ">
            <h3 className="text-warna2/55 font-bold lowercase text-lg md:text-2xl">#1 Month - name - type</h3>
            <h3 className="text-warna2/55 font-bold lowercase text-lg md:text-2xl">#2 Month - name - type</h3>
            <h3 className="text-warna2 font-bold lowercase text-xl md:text-3xl">#3 Month - name - type</h3>
            <h3 className="text-warna2/55 font-bold lowercase text-lg md:text-2xl">#4 Month - name - type</h3>
          </div>

          <div className=" z-1 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-full flex justify-center lg:left-auto lg:right-0 lg:translate-x-0 lg:justify-end pointer-events-none">
            <img src="img/unsplash-bird.jpg" alt="Bird" className=" h-full w-[60%] md:w-[48%] lg:w-[28%] object-center object-cover max-h-[50svh] pointer-events-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedProjects;
