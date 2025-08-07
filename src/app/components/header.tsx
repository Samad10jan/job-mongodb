"use client";
import {ArrowBottomLeftIcon, ArrowLeftIcon, BackpackIcon, MagnifyingGlassIcon,SunIcon,} from "@radix-ui/react-icons";
import {Button,IconButton,TextField,} from "@radix-ui/themes";
import Link from "next/link";
import AvatarMenu from "./avatar-menu";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../(group)/layout";
import { ThContext } from "./theme-context";
import { usePathname, useRouter } from "next/navigation";


export default function Header() {
    const { isDark, setIsDark }:any = useContext(ThContext);
    const { user } = useContext(UserContext);
    const [suggestions, setSuggestions] = useState([]);
    const [searchq, setSearchq] = useState("");
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        async function getSuggesstion() {
            const res = await fetch(
                "http://localhost:3000/api/sugesstions?q=" + searchq
            );
            const data = await res.json();
            if (data.success) {
                setSuggestions(data.data);
            }
        }

        // debouncing
        // useEffect on change of searchq it will firts call return statement(clerr x time and yes setTimeout return some time) then if user will have waited 1000ms then getSugesstion() fun will run
        let x;
        // kuch input me ho to chlao na to mat chlao
        if (searchq) {
            x = setTimeout(() => {
                getSuggesstion();
            }, 400);
        } else {
            setSuggestions([]);
        }

        return () => {
            if (x) clearTimeout(x);
        };
    }, [searchq]);

    return (

        <header className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
            
            {
                !(pathName=="/")

                &&
                
                <button onClick={()=>{router.back()}} ><ArrowLeftIcon className="size-10"/></button>
            }
            <div className="max-w-7xl mx-auto flex justify-between items-center border-b-2 pb-2 grow">
                

                <div className="flex items-center gap-6">
                    <Link
                        href="/"
                        className="text-2xl font-bold tracking-tight"
                    >
                        JobApp
                    </Link>

                    <form className="relative flex items-center" action={`/search`}>
                        <TextField.Root
                            placeholder="Search jobs…"
                            name="q"
                            onChange={(e) => setSearchq(e.target.value)}
                            className="w-[200px] md:w-[300px]"
                        >
                            <TextField.Slot>
                                <MagnifyingGlassIcon height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>

                        <IconButton color="green" className="ml-2">
                            <MagnifyingGlassIcon width="20" height="20" />
                        </IconButton>

                        {suggestions.length > 0 && (
                            <div className="absolute top-[105%] left-0 w-full bg-white shadow-lg rounded-md z-50 overflow-hidden max-h-64 overflow-y-auto">
                                {suggestions.map((sugg) => (
                                    <Link
                                        key={sugg.id}
                                        href={`/job/${sugg.id}`}
                                        className="block px-4 py-2 hover:bg-emerald-100 text-black text-sm"
                                    >
                                        {sugg.title}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </form>
                </div>

            
                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        color="yellow"
                        onClick={() => setIsDark(!isDark)}
                    >
                        <SunIcon className="w-5 h-5" />
                    </Button>

                    {user?.email ? (
                        <AvatarMenu user={user} />
                    ) : (
                        <Link href="/login">
                            <Button variant="solid" color="green">
                                Log In
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
