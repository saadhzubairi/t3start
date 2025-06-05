"use client";

import { signIn } from "next-auth/react";
import React from "react";
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Button, buttonVariants } from "~/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "~/lib/utils";



const SocialMediaLogins = () => {

    const pathname = usePathname();
    const isloginpage = pathname === "/login";


    return (
        <div>
            <div className="w-full my-2">
                <div className="flex justify-between items-center w-full gap-2 flex-col">
                    {/* Changed the Link to a Button for consistency with other social sign-up buttons */}
                    <Button asChild variant={'outline'} className="text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs w-full">
                        <Link href={isloginpage ? "/signup" : "/login"}>{isloginpage ? "Sign up" : "Already have an account?"}</Link>
                    </Button>
                    <Button
                        className='text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 border-indigo-600 dark:border-indigo-400 text-xs w-full flex items-center justify-center gap-2'
                        variant={'outline'}
                        onClick={() => signIn('discord')} // Actual call to NextAuth.js
                    >
                        <FaDiscord className="w-4 h-4" /> Sign up using Discord
                    </Button>
                    <Button
                        className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-600 dark:border-red-400 text-xs w-full flex items-center justify-center gap-2'
                        variant={'outline'}
                        onClick={() => signIn('google')} // Actual call to NextAuth.js
                    >
                        <FaGoogle className="w-4 h-4" /> Sign up using Google
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SocialMediaLogins;
