"use client"

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import FullPageSpinner from "../misc/FullPageSpinner";

const Checkpoint = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    // const [asd, setasd] = useState("")

    useEffect(() => {
        if (session) {
            if (session.user.role === "PREUSER") { router.push("/preUserSurvey") }
            else if (session.user.role === "USER") { router.push("/feed") }
            else if (session.user.role === "ADMIN") { router.push("") }
            else if (session.user.role === "SUPERADMIN") { router.push("") }
        }
    }, [session])

    if (status === "loading") {
        return <div>Loading session...</div>;
    }

    if (!session) {
        return <div>No session found. Please log in.</div>;
    }

    return (
        <>
            {/*  <div>
                <h1>User Session Info</h1>
                <pre>{JSON.stringify(session, null, 2)}</pre>
            </div>
            <div className="bg-blue-50 p-4">{session.user.role}</div>
            <Link href={'/api/auth/signout'}>logout</Link>
            */}
            <FullPageSpinner message={"Loading"} />
        </>
    );
};

export default Checkpoint;
