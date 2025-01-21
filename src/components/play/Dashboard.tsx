"use client"

import React, { useEffect } from 'react'
import type { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import MainLayout from './MainLayout'

const Dashboard = ({ session }: { session: Session | null }) => {

    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            if (!(session?.user)) {
                router.push('/login');
            }
        };
        checkSession().catch(() => { console.log("ERROR") });
    }, [router, session]);

    return (
        <>
            <MainLayout session={session} />
        </>

    )
}

export default Dashboard