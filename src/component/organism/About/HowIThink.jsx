import { useState } from "react";
import { ArrowRight } from "lucide-react";

// Steps data
const thinkSteps = [
  {
    title: "Thinking",
    heading: "Everything Starts Looking Wrong Before It Starts Looking Right.",
    desc1: "Nothing really starts from scratch. Most ideas begin with things that inspire me. I collect them, figure out why they work, then slowly shape them into something that feels like my own.",
    desc2: "From there, it's mostly patience. Trying, changing, removing what doesn't belong, and repeating until everything finally feels right.",
  },
  {
    title: "Design",
    heading: "Everything Starts Looking Wrong Before It Starts Looking Right.",
    desc1: "Nothing really starts from scratch. Most ideas begin with things that inspire me. I collect them, figure out why they work, then slowly shape them into something that feels like my own.",
    desc2: "From there, it's mostly patience. Trying, changing, removing what doesn't belong, and repeating until everything finally feels right.",
  },
  {
    title: "Development",
    heading: "Everything Starts Looking Wrong Before It Starts Looking Right.",
    desc1: "Nothing really starts from scratch. Most ideas begin with things that inspire me. I collect them, figure out why they work, then slowly shape them into something that feels like my own.",
    desc2: "From there, it's mostly patience. Trying, changing, removing what doesn't belong, and repeating until everything finally feels right.",
  },
  {
    title: "Details",
    heading: "Everything Starts Looking Wrong Before It Starts Looking Right.",
    desc1: "Nothing really starts from scratch. Most ideas begin with things that inspire me. I collect them, figure out why they work, then slowly shape them into something that feels like my own.",
    desc2: "From there, it's mostly patience. Trying, changing, removing what doesn't belong, and repeating until everything finally feels right.",
  },
];

function HowIThink() {
  const [activeIndex, setActiveIndex] = useState(0);
  const formatIndex = (index) => String(index + 1).padStart(2, "0");

  return (
    <div className="min-h-svh h-222 md:h-[112svh] w-screen p-4 md:p-6">
      <div className="flex flex-col h-full w-full">
        {/* Top */}
        <div className="flex items-center md:items-end justify-start h-88 md:h-full lg:h-100 w-full ">
          <h2 className="text-warna2 text-3xl w-full md:w-100 lg:w-1/3 md:text-5xl text-balance capitalize font-bold">But Ideas Don't Build Themselves.</h2>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row h-full w-full ">
          {/* Left */}
          <div className="flex flex-col justify-center lg:justify-end gap-6 md:gap-8 lg:gap-10 h-full w-full lg:w-1/2 ">
            {thinkSteps.map((step, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={step.title}
                  onClick={() => setActiveIndex(index)}
                  className={` flex flex-row  items-center  cursor-pointer transition-opacity duration-300 ${isActive ? "text-warna2 opacity-100" : "text-warna2/30 hover:opacity-60"}`}
                >
                  {/* Index / Nomor */}
                  <div className="flex h-full items-start md:items-center w-1/4 ">
                    <p className="text-xs mt-2 md:mt-0 md:text-sm lowercase w-6 md:w-8">{formatIndex(index)}</p>
                  </div>
                  {/* Title & Arrow */}
                  <div className="flex h-full w-full flex-col gap-6 mdgap-0 ">
                    <div className="flex flex-row h-full w-full ">
                      {/* Title */}
                      <div className="flex h-full w-full items-start md:items-center">
                        <h3 className="text-xl md:text-2xl lg:text-4xl capitalize font-bold">{step.title}</h3>
                      </div>
                      {/* Arrow */}
                      <div className="flex justify-end md:justify-start items-start md:items-center h-full w-1/3 ">{isActive && <ArrowRight className="w-6 h-6 md:w-8 md:h-8" />}</div>
                    </div>
                    {/* Mobile Desc */}
                    <div className="flex h-full w-full ">
                      {isActive && (
                        <div className="flex md:hidden flex-col gap-4">
                          <h2 className="text-warna2 text-sm w-56 font-bold text-pretty capitalize">{step.heading}</h2>
                          <p className="text-warna2 text-[12px] text-pretty lowercase">{step.desc1}</p>
                          <p className="text-warna2 text-[12px] text-pretty lowercase">{step.desc2}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right */}
          <div className="hidden md:flex flex-row justify-end items-center lg:items-end h-full w-full ">
            <div key={activeIndex} className=" flex flex-col gap-8 lg:gap-4 h-fit lg:h-full w-74 lg:w-120  transition-opacity duration-500 ease-in-out opacity-100">
              <div className="flex h-full w-full items-end justify-start ">
                <h2 className="text-warna2 text-xl md:text-2xl lg:text-3xl w-full md:w-66 lg:w-80 text-pretty capitalize font-bold">{thinkSteps[activeIndex].heading}</h2>
              </div>
              <div className="flex flex-col gap-4 items-end justify-center h-1/2 w-full ">
                <p className="text-warna2 text-xs md:text-sm text-pretty lowercase">{thinkSteps[activeIndex].desc1}</p>
                <p className="text-warna2 text-xs md:text-sm text-pretty lowercase">{thinkSteps[activeIndex].desc2}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowIThink;
