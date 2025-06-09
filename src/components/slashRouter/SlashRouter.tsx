// src/components/slashRouter/SlashRouter.tsx

"use client"

import React, { useEffect } from 'react'
import FullPageSpinner from '../misc/FullPageSpinner'
import { useRouter } from 'next/navigation';
import type { Session } from 'next-auth';

// Define the correct landing dashboards for each role
const homeDashboards = {
    PREUSER: '/preUserSurvey',
    USER: '/feed',
    ADMIN: '/play/dashboard',
    SUPERADMIN: '/play/dashboard' // Example for another role
};

const SlashRouter = ({ session }: { session: Session | null }) => {
    const router = useRouter();

    useEffect(() => {
        const checkSessionAndRedirect = () => {
            if (session?.user) {
                const role = session.user.role;
                // Redirect the user to their specific dashboard based on their role
                const destination = homeDashboards[role] || '/feed'; // Default to /feed if role is unmapped
                router.push(destination);
            } else {
                // If there's no session, send the user to the public landing page
                router.push('/welcome');
            }
        };

        checkSessionAndRedirect();

    }, [router, session]);

    return (
        <FullPageSpinner message='Loading...' />
    )
}

export default SlashRouter;