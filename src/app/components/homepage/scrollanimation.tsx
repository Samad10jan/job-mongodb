"use client";

import { Card } from "@radix-ui/themes";

export default function LogoAnimation() {
    const logos = [
        {
            name: "facebook",
            url: "https://www.facebook.com/images/fb_icon_325x325.png",
        },
        {
            name: "airbnb",
            url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
        },
        {
            name: "apple",
            url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
        },
        {
            name: "netflix",
            url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg",
        },
        {
            name: "github",
            url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
        },
        {
            name: "google",
            url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        },
    ];

    return (
        <Card variant="ghost" className="min-h-max flex flex-col justify-center items-center overflow-hidden m-3 transition-all">
          
            <div className="w-full overflow-hidden m-5 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <div className="animate-scroll-left m-5">
                    {[...logos, ...logos, ...logos].map((logo, index) => (
                        <Card
                            key={index}
                            className="logo-item !rounded-xl !p-4 !mx-6 !shadow-lg !border !border-gray-700 hover:shadow-xl/50 hover:shadow-emerald-600"
                        >
                            <img src={logo.url} alt={logo.name} className="w-12 h-12 object-contain" />
                        </Card>
                    ))}
                </div>
            </div>
        </Card>
    );
}
