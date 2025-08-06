import type { Metadata } from "next";

import Header from "../../components/header";
import Sidebar from "../../components/sidebar";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
    <div>
            
                <div className="flex gap-7">

                    <div >
                        <Sidebar />
                    </div>
                    <div>
                        {children}
                    </div>
                </div>

           </div>
    );
}
