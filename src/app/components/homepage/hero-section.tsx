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
        "Discover thousands of curated job listings tailored to your skills and career goals. ",
      imageUrl:
        "https://img.freepik.com/free-vector/recruitment-concept-illustration_114360-2639.jpg",
    },
    {
      id: 2,
      title: "Connect With Companies",
      tagline: "Your talent, their platform.",
      description:
        "Engage with leading companies actively hiring in your field.",
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
    <section className="!mx-3 !h-full !flex !flex-col !justify-between !rounded-xl !bg-gradient-to-r !from-emerald-700 !via-emerald-400 !to-indigo-400 !px-6 !shadow-2xl !gap-5 lg:!max-h-[45vh] md:!max-h-[60vh]">
  {/* Left Text + Image Container */}
  <div className="!flex !flex-col !items-center !mt-4 !gap-4 md:!flex-row md:!justify-between md:!items-start">
    
    {/* Text */}
    <div className="!flex !flex-col !gap-3 !max-w-xl !text-center md:!text-left !flex-1">
      <h1 className="!text-2xl sm:!text-3xl md:!text-5xl !font-extrabold !text-white !drop-shadow-lg !leading-snug">
        {slides[currentSlide].title}
      </h1>

      <h2 className="!hidden md:!block !text-lg md:!text-2xl !text-yellow-300 !font-semibold">
        {slides[currentSlide].tagline}
      </h2>

      <p className="!hidden sm:!block md:!block !text-base sm:!text-lg md:!text-xl !text-indigo-100">
        {slides[currentSlide].description}
      </p>
    </div>

   
    <div className="!w-[80%] !h-[10em] md:!w-[40%] md:!h-[17em] lg:!h-[15em] lg:!w-[40%]">
      <div className="!relative !w-full !h-full !rounded-xl md:!shadow-2xl !ring-4 !ring-white/20">
        <Image
          src={slides[currentSlide].imageUrl}
          alt="Job Poster"
          fill
          className="!object-cover !rounded-xl !w-full !h-full"
        />
      </div>
    </div>

  </div>

  {/* Navigation Dots */}
  <div className="!flex self-center !gap-2 md:-mt-7 mt-1 mb-3">
    {slides.map((_, index) => (
      <button
        key={index}
        title="next slide"
        onClick={() => setCurrentSlide(index)}
        className={`!w-3.5 !h-3.5 !rounded-full !transition ${currentSlide === index ? "!bg-white" : "!bg-white/40"}`}
      />
    ))}
  </div>
</section>
  );
}
