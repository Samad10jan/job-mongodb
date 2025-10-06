"use client";

import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 overflow-hidden">

            {/* Decorative Background Circle */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-green-300 rounded-full opacity-30 pointer-events-none" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-green-300 rounded-full opacity-30 pointer-events-none" />

            {/* Top-right Logo */}
            <div className="absolute top-5 left-5 size-22 !p-5 rounded-full overflow-hidden shadow-lg flex items-center justify-center">
                <div className=" w-full h-full m-5">

                    <Image
                        src="/logo.png"
                        alt="HireStack Logo"
                        fill
                        className="object-cover -ml-0.5"
                    />
                </div>
            </div>

            {/* Message Section */}
            <div className="flex flex-col items-center text-center gap-4 z-10">
                <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
                    404
                </h1>
                <h2 className="text-3xl md:text-4xl font-semibold text-gray-700">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-600 max-w-md mb-2">
                    The page you are looking for doesn’t exist or has been moved.
                    Let’s get you back to the homepage.
                </p>
            </div>

           
                <Button
                    variant="solid"
                    onClick={()=>{location.href="/"}}
                    color="green"
                    className="!px-10 !py-3 !rounded-3xl !hover:scale-105 !transition-all !shadow-md !hover:shadow-lg !z-10"
                >
                    Go to Homepage
                </Button>
           

            {/* Illustration */}
            <div className="flex justify-center w-full max-w-lg mt-6 mb-8 z-10">
                <Image
                    src="/not-found.png"
                    alt="Not Found Illustration"
                    width={450}
                    height={450}
                    className="object-contain"
                />
            </div>

            

        </div>
    );
}
