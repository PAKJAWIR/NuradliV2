import Logo from "../component/atoms/Logo";

function Contact() {
  return (
    <>
      {/* Spacer Halaman Utama Anda (Bisa Dihapus Jika Tidak Digunakan) */}
      <div className="flex flex-col items-center justify-center w-screen h-screen bg-warna1"></div>

      {/* Container Utama Overlay (Memenuhi Layar Terkunci) */}
      <div className="fixed inset-0 z-[999] flex flex-col w-screen h-screen bg-warna3 p-6 md:p-12 select-none pointer-events-none">
        <div className="relative flex flex-col justify-end h-full w-full">
          {/* 1. LOGO (Berada di Center Mati Menggunakan Absolute Centering) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {/* Sesuaikan lebar komponen Logo bawaanmu di sini */}
            <Logo containerWidth="w-24 md:w-32" containerHeight="h-auto" />
          </div>

          {/* 2. BOTTOM GROUP TEXT (H-Fit Berada Stabil di Paling Bawah) */}
          <div className="flex flex-row items-end justify-between h-fit w-full z-20">
            {/* Nama Kirat Kiri */}
            <div className="h-fit">
              <h1 className="text-4xl md:text-6xl font-bold  text-warna2">
                NUR
                <br />
                ADLI
              </h1>
            </div>

            {/* Deskripsi Jabatan Kanan */}
            <div className="h-fit text-right">
              <h2 className="text-[10px] md:text-xs font-bold uppercase text-warna2">
                Front End Dev &
                <br />
                Graphic Designer
              </h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
