import "~/styles/globals.css";

import { type Metadata } from "next";
import { Toaster } from "~/components/ui/toaster";
import NavigationBarCraddle from "~/components/navigationBar/NavigationBarCraddle";

export const metadata: Metadata = {
    title: "Welcome",
    description: "Harmony",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <>
            <NavigationBarCraddle />
            <div className="px-52 pt-24 flex justify-center items-center">
                {children}
            </div>
            <Toaster />
        </>
    );
}