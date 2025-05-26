import "~/styles/globals.css";
// import LoginNavigationBar from "~/components/navigationBar/LoginNavigationBar";

export const metadata = {
    title: "Login - Harmony",
    description: "Login to Harmony",
};

export default function LoginLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        { children }
    );
}