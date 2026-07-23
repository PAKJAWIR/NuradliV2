import { ArrowRight } from "lucide-react";

function MyServices() {
  // Data array untuk services
  const servicesData = [
    { id: "01", title: "Design", bgColor: "bg-warna1" },
    { id: "02", title: "Development", bgColor: "bg-warna1" },
    { id: "03", title: "Motion", bgColor: "bg-warna1" },
  ];

  return (
    <div className="h-188 md:h-200 md:min-h-svh w-screen bg-warna1 py-4 md:py-6">
      <div className="flex flex-col h-full w-full ">
        {/* Top */}
        <div className="flex items-end md:items-center justify-start flex-row gap-8 h-1/2 w-full px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-8 h-fit w-fit ">
            <p className="text-warna2/40 text-[10px] md:text-sm text-balance w-fit md:w-50 lg:w-60">— this is where the ideas become useful.</p>
            <h2 className="text-warna2 text-xl md:text-2xl lg:text-4xl w-full md:w-154 text-pretty capitalize">It Took A Lot Of Late Nights, Way Too Many "What If?" Moments... But I Guess This Is What I Do Now. </h2>
          </div>
        </div>

        {/* Bottom (Mapped) */}
        <div className="flex flex-col justify-center h-full w-full">
          {servicesData.map((service) => (
            <div key={service.id} className={`flex h-30 md:h-50 lg:h-full w-full border-b-2 border-warna2/20 px-4 md:px-6 ${service.bgColor}`}>
              <div className="flex items-center justify-between h-full w-full mix-blend-difference">
                <div className="flex flex-row gap-8 items-end h-fit w-fit ">
                  <p className="text-warna1 text-xs md:text-sm md:w-50 lg:w-60 lowercase">{service.id}</p>
                  <h3 className="text-warna1 text-xl md:text-4xl capitalize font-semibold">{service.title}</h3>
                </div>
                <ArrowRight className="text-warna1 w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyServices;
