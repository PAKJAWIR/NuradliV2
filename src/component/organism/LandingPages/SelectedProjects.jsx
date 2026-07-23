import { useState, useRef } from "react";
import { Play } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDevice } from "../../../context/DeviceProvider";

gsap.registerPlugin(ScrollTrigger);

function SelectedProjects() {
  return (
    <div className="min-h-svh w-screen bg-warna1">
      <div className="flex flex-col gap-4 h-fit w-full ">
        {/* Heading */}
        <div className="flex flex-col-reverse md:flex-row h-80 md:h-48 w-full p-4 md:p-6">
          {/* Desc */}
          <div className="flex flex-col h-full items-start justify-end gap-4 md:gap-8 w-full md:w-[60%] lg:w-[40%] ">
            <p className="text-warna2/40 text-[10px] md:text-sm w-70 md:w-full text-balance ">— they were supposed to stay as random ideas. well... they didn't.</p>
            <p className="text-warna2 text-xs md:text-sm text-pretty lowercase w-full">
              i wasn't planning to build any of these. i was mostly just following my curiosity. one little idea became another, and before i knew it... i had something worth sharing.{" "}
            </p>
          </div>
          {/* Header */}
          <div className="flex items-end justify-start md:justify-end h-full w-full  leading-none">
            <h2 className="text-warna2 text-[2.6rem]  md:text-5xl lg:text-[7rem]">Selected Projects</h2>
          </div>
        </div>
        {/* Projects */}
        <div className="relative items-center justify-center flex h-screen w-full px-4 md:px-6 py-6">
          {/* Background */}
          <img src="/img/background1.webp" alt="project bg" className="absolute inset-0 h-full w-full object-cover z-0 brightness-[0.50]" />

          {/* Img Projects */}
          <img src="/img/background1.webp" alt="project bg" className="absolute h-60 md:h-78 w-84 md:w-118 object-cover z-2 rounded-sm" />

          {/* Wrapper Utama Konten (Vertikal Justify-Between) */}
          <div className="flex flex-col justify-between h-full w-full z-1 mix-blend-difference">
            {/* 1. Kelompok Atas (Bisa untuk info tambahan / dibiarkan flex-1) */}
            <div className="flex w-full" />

            {/* 2. Kelompok Tengah (Jika ada elemen yang mau ditaruh tepat di tengah layar) */}
            <div className="flex w-full justify-center" />

            {/* 3. Kelompok Bawah (Horizontal Justify-Between untuk 3 Kolom) */}
            <div className="flex flex-row items-end justify-between w-full">
              {/* Kolom Kiri: Title & Subtitle */}
              <div className="flex flex-col justify-end gap-1">
                <h3 className="text-warna1 text-xl md:text-4xl capitalize ">Pattern</h3>
                <p className="text-warna1 text-xs md:text-sm lowercase">(case study)</p>
              </div>

              {/* Kolom Tengah: Short Desc */}
              <div className="flex justify-center items-end">
                <p className="text-warna1 text-[10px] md:text-sm text-pretty text-center w-48 md:w-64 lowercase">what, it just some magic pattern from unsplash</p>
              </div>

              {/* Kolom Kanan: Number & Date */}
              <div className="flex flex-col items-end justify-end gap-1">
                <h3 className="text-warna1 text-xl md:text-4xl capitalize ">01</h3>
                <p className="text-warna1 text-xs md:text-sm lowercase">2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SelectedProjects;
