"use client"

import React, { useEffect } from 'react'
import FullPageSpinner from '../misc/FullPageSpinner'
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';

const SlashRouter = ({ session }: { session: Session | null  }) => {

    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            if (session?.user) {
                router.push('/feed');
            } else {
                router.push('/welcome');
            }
        };
        checkSession().catch(() => { console.log("ERROR") });
    }, [router, session]);

    return (
        <FullPageSpinner message='Loading' />
    )
}

export default SlashRouter