"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function JobHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Find Your Dream Job",
      tagline: "Opportunities that match your passion.",
      description:
        "Discover thousands of curated job listings tailored to your skills and career goals. Take the first step toward your future.",
      imageUrl:
        "https://img.freepik.com/free-vector/recruitment-concept-illustration_114360-2639.jpg",
    },
    {
      id: 2,
      title: "Connect With Top Companies",
      tagline: "Your talent, their platform.",
      description:
        "Engage with leading companies actively hiring in your field. Build connections that shape your career path.",
      imageUrl:
        "https://img.freepik.com/free-vector/job-interview-conversation_74855-7566.jpg",
    },
    {
      id: 3,
      title: "Showcase Your Skills",
      tagline: "Stand out in the crowd.",
      description:
        "Create a stunning profile and let employers discover your unique talents. Put your career in the spotlight.",
      imageUrl:
        "https://img.freepik.com/free-vector/online-resume-concept-illustration_114360-5257.jpg",
    },
    {
      id: 4,
      title: "Kickstart Your Career",
      tagline: "Your journey starts here.",
      description:
        "From internships to full-time roles, explore opportunities that help you grow and achieve your dreams.",
      imageUrl:
        "https://img.freepik.com/free-vector/business-team-celebrating-success_74855-6915.jpg",
    },
  ];

  // Auto-slide every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative mx-auto md:min-h-[60vh] h-[30%] flex flex-col md:flex-row items-center justify-between rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-400 to-indigo-400 px-6 md:px-12 py-10 md:py-16 shadow-2xl overflow-hidden">
      
      {/* Left Text */}
      <div className="flex flex-col gap-3 md:gap-6 max-w-xl text-center md:text-left flex-1">
        <h1 className="!text-2xl sm:!text-3xl md:!text-5xl font-extrabold !text-white drop-shadow-lg leading-snug">
          {slides[currentSlide].title}
        </h1>
        
        {/* Hide tagline on very small screens */}
        <h2 className="hidden sm:!block !text-lg md:!text-2xl !text-yellow-300 font-semibold">
          {slides[currentSlide].tagline}
        </h2>

        <p className="!text-base sm:!text-lg md:!text-xl !text-indigo-100">
          {slides[currentSlide].description}
        </p>
      </div>

     
      <div className="flex justify-center md:justify-end w-[85%] sm:w-[70%] md:w-[45%] mt-8 md:mt-0 flex-1 h-[250px] sm:h-[300px] md:h-[350px]">
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl md:ring-4 md:ring-white/20 ring-0">
          <Image
            src={slides[currentSlide].imageUrl}
            alt="Job Poster"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            title="next slide"
            onClick={() => setCurrentSlide(index)}
            className={`w-3.5 h-3.5 rounded-full transition ${
              currentSlide === index ? "!bg-white" : "!bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
