function Footer() {
  return (
    <>
        {/* CONTAINER UTAMA*/}
        <div className="bg-warna1 h-[58svh] md:h-[68svh] w-svw p-6 flex flex-col">
          <div className="flex flex-col h-full w-full pt-6 justify-between ">
            {/* TOP ROW*/}
            <div className="flex flex-col-reverse lg:flex-row justify-around md:justify-between items-start flex-1 w-full ">
              {/* Logo Area*/}
              <div className="flex items-center w-full md:w-fit h-1/3 md:h-1/2 ">
                <img src="/Kura.svg" alt="Logo" className="h-12 md:h-22 lg:h-22 w-fit" />
              </div>

              {/* Navigasi Area*/}
              <div className="flex justify-start md:justify-end gap-12 flex-row w-full md:w-auto items-start ">
                {/* Links */}
                <div className="flex flex-col gap-6 w-fit items-start">
                  <h3 className="text-warna2/45 uppercase text-md font-bold">Links</h3>
                  <div className="flex flex-col gap-4 items-start">
                    <p className="text-warna2/66 text-sm">about</p>
                    <p className="text-warna2/66 text-sm">works</p>
                  </div>
                </div>
                {/* Connect */}
                <div className="flex flex-col gap-6 w-fit items-start">
                  <h3 className="text-warna2/45 uppercase text-md font-bold">Connect</h3>
                  <div className="flex flex-col gap-4 items-start">
                    <p className="text-warna2/66 text-sm">instagram</p>
                    <p className="text-warna2/66 text-sm">linkedin</p>
                    <p className="text-warna2/66 text-sm">github</p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM ROW*/}
            <div className="flex items-end h-fit w-full pt-2 ">
              <h1 className="text-warna2 font-bold text-6xl md:text-9xl lg:text-[158px] leading-none lg:leading-30 uppercase">Nuradli</h1>
            </div>
          </div>
        </div>

        {/* COPYRIGHT ROW*/}
        <div className="flex items-center h-14 md:h-[6svh] w-full px-6 border-t border-warna2/10 bg-warna1">
          <p className="text-warna2 text-sm">nuradli © 2026</p>
        </div>
    </>
  );
}

export default Footer;
