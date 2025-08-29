"use client";

import { Button } from "@radix-ui/themes";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative mx-auto max-w-7xl md:h-[70vh] h-auto flex flex-col md:flex-row items-center justify-between rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-500 px-8 py-12 shadow-2xl overflow-hidden">
     
      <div className="flex flex-col gap-6 max-w-xl text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
          Forge Your Path. <br />
          The Quest for the Perfect Job Begins.
        </h1>
        <p className="text-lg md:text-xl text-emerald-100 leading-relaxed">
          Step into a realm where your skills are magic, and every listing is a new adventure waiting to unfold.
        </p>
        <p className="text-base md:text-lg text-emerald-50">
          Ready your resume. The journey starts now.
        </p>
        <div className="flex gap-4 justify-center md:justify-start">
          <Button className="rounded-full bg-white text-emerald-700 font-semibold px-6 py-3 shadow-md hover:scale-105 transition-transform">
            Get Started
          </Button>
          <Button className="rounded-full bg-emerald-900/40 text-white border border-white px-6 py-3 hover:bg-emerald-900/60 transition">
            Learn More
          </Button>
        </div>
      </div>

     
      <div className="relative w-full md:w-[40%] flex justify-center mt-10 md:mt-0">
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
          <Image
            src="https://static.vecteezy.com/system/resources/previews/000/664/649/original/group-of-young-business-people-working-together-vector.jpg"
            alt="hero"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
