"use client";

import { Card } from "@radix-ui/themes";

export default function LogoAnimation() {
    const logos = [
        { name: "facebook", url: "https://www.facebook.com/images/fb_icon_325x325.png" },
        { name: "airbnb", url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg" },
        { name: "apple", url: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
        { name: "netflix", url: "https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg" },
        { name: "github", url: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
        { name: "google", url: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
        { name: "microsoft", url: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
        { name: "twitter", url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" },
        { name: "linkedin", url: "https://aliciavalero.com/wp-content/uploads/2020/11/logo-Linkedin.png" },
        { name: "spotify", url: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg" },
        { name: "youtube", url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/YouTube_full-color_icon_%282024%29.svg/1280px-YouTube_full-color_icon_%282024%29.svg.png" },
        { name: "amazon", url: "https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png" },
    ];



    const scrollingLogos = [...logos, ...logos];

    return (
        <div

            className="!min-h-max !flex !flex-col !justify-center !items-center !overflow-hidden !m-3 !transition-all"
        >
            <div className="!w-full overflow-hidden m-5 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <div className="animate-scroll-left !flex !m-5">
                    {scrollingLogos.map((logo, index) => (
                        <Card
                        variant="surface"
                            key={index}
                            className="logo-item !rounded-xl !p-4 !mx-6 !shadow-lg !border !border-gray-700 hover:!shadow-2xl/50 hover:shadow-emerald-600 "
                        >
                            <img src={logo.url} alt={logo.name} className="w-15 h-15 !object-contain" />
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
