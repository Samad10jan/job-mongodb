// "use client";

// import { Button } from "@radix-ui/themes";
// import Image from "next/image";

// export default function HeroSection() {
//   return (
//     <section className="relative mx-auto md:min-h-[50vh] h-auto flex flex-col md:flex-row gap-5 items-center justify-evenly rounded-3xl bg-gradient-to-r from-emerald-700 to-emerald-500 px-8 py-12 shadow-2xl overflow-hidden">

//       <div className="flex flex-col gap-6 max-w-xl text-center md:text-left ">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-lg">
//           Forge Your Path. <br />
//           The Quest for the Perfect Job Begins.
//         </h1>
//         <p className="text-lg md:text-xl text-emerald-100">
//           Step into a realm where your skills are magic, and every listing is a new adventure waiting to unfold.
//           Ready your resume. The journey starts now.
//         </p>
//         <p className="text-base md:text-lg text-emerald-50">
//           Ready your resume. The journey starts now.
//         </p>
//         <div className="flex gap-4 justify-center md:justify-start">
//           <Button className="rounded-full  text-emerald-700 font-semibold px-6 py-3 shadow-md hover:scale-105 transition-transform">
//             Get Started
//           </Button>
//           <Button className="rounded-full text-white border border-white px-6 py-3  transition">
//             Learn More
//           </Button>
//         </div>
//       </div>


//       <div className="w-full md:w-[40%] flex justify-end mt-10 md:mt-0">
//         <div className="relative w-full h-full md:w-96 md:h-96 rounded-full overflow-hidden shadow-2xl ring-4 ring-white/20">
//           <Image
//             src="https://static.vecteezy.com/system/resources/previews/000/664/649/original/group-of-young-business-people-working-together-vector.jpg"
//             alt="hero"
//             fill
//             className="object-cover"
//           />
//         </div>
//       </div>
//     </section>
//   );
// }

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

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative mx-auto md:min-h-[60vh] h-auto flex flex-col md:flex-row items-center justify-between rounded-3xl bg-gradient-to-r from-emerald-700 via-emerald-400 to-indigo-400 px-8 py-12 shadow-2xl overflow-hidden">
     
      <div className="flex flex-col gap-6 max-w-xl text-center md:text-left flex-1">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          {slides[currentSlide].title}
        </h1>
        <h2 className="text-xl md:text-2xl text-yellow-300 font-semibold">
          {slides[currentSlide].tagline}
        </h2>
        <p className="text-lg md:text-xl text-indigo-100">
          {slides[currentSlide].description}
        </p>
        {/* <div className="flex gap-4 justify-center md:justify-start">
          <Button className="!rounded-full !bg-white !text-indigo-700 !font-semibold !px-6 !py-3 !shadow-md hover:!scale-105 !transition-transform">
            Get Started
          </Button>
          <Button className="!rounded-full !text-white border !border-white !px-6 1py-3 !hover:bg-white/10 !transition">
            Learn More
          </Button>
        </div> */}
      </div>

      {/* Right Image */}
      <div className="flex justify-center md:justify-end w-[90%] mt-10 md:m-0 flex-1 h-[300px]">
        <div className="relative m-5 w-72 h-72 md:w-[70%] md:h-[100%] rounded-xl overflow-hidden shadow-2xl ring-4 ring-white/20">
          <Image
            src={slides[currentSlide].imageUrl}
            alt="Job Poster"
            fill
            // className="object-cover"
          />
        </div>
      </div>

      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            title="slide"
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${currentSlide === index ? "bg-white" : "bg-white/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
}

