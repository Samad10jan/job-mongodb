import Sidebar from "../../components/search-page/sidebar";

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
