import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "~/trpc/react";
import { Toaster } from "~/components/ui/toaster";
// import LoginNavigationBar from "~/components/navigationBar/LoginNavigationBar";

export const metadata = {
    title: "Login - Harmony",
    description: "Login to Harmony",
};

export default function LoginLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <TRPCReactProvider>
            {children}
            
        </TRPCReactProvider>
    );
}