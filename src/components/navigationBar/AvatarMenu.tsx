"use client"

import React from 'react'
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "~/components/ui/menubar"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
// import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface AvatarMenuProps {
    avatarUrl: string;
}

const AvatarMenu = ({ avatarUrl }: AvatarMenuProps) => {
    const router = useRouter();

    return (
        <Menubar className="bg-transparent border-none shadow-none">
            <MenubarMenu >
                <MenubarTrigger className="flex gap-2 cursor-pointer ">
                    <Avatar className='h-7 w-7'>
                        <AvatarImage className="flex justify-center items-center h-7 w-7 rounded-full" src={avatarUrl} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Edit Profile <MenubarShortcut>Ctrl+P</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>View Students</MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Schedule <MenubarShortcut>Alt+K+S</MenubarShortcut> </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => router.push("/api/auth/signout")}>
                        Logout <MenubarShortcut>Ctrl+L</MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default AvatarMenu