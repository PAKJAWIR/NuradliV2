function PreContact() {
  return (
    <div className="h-66 lg:h-[44svh] w-screen bg-warna1 p-4 md:p-6 ">
      <div className="flex items-start md:items-center justify-center h-full w-full ">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-center gap-8 md:gap-0 md:justify-start h-fit w-full ">
          <div className="flex items-center justify-start h-full w-full md:w-3xl lg:w-full ">
            <h2 className="text-warna2 text-4xl md:text-4xl lg:text-7xl w-full md:w-full text-pretty capitalize">So... what’s on your mind?</h2>
          </div>
          <div className="flex flex-col md:flex-row md:items-end  h-full w-full gap-4">
            <div className="flex items-end h-full w-full justify-start md:justify-end ">
              <p className="text-warna2 text-xs md:text-sm text-pretty w-50 lg:w-58 lowercase ">You don't need to have it all figured out. Honestly, neither do I.</p>
            </div>
            <div className="flex items-end justify-start md:justify-end h-full w-1/2 ">
              <div className="flex flex-col h-fit w-fit">
                <h3 className="text-warna2 text-xl md:text-2xl lg:text-5xl text-balance"> let’s talk</h3>
                <span className="w-full h-0.5 lg:h-1  bg-warna2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreContact;
