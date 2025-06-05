"use client"

import React from "react";
import LogOutButton from "../main/auth/LogOutButton";
import Checkpoint from "../checkpoint/Checkpoint";
import { useSession } from "next-auth/react";

const PreUser = () => {

    const { data: session, status } = useSession();

    return <div>
        <div className="">PREUSER</div>
        <pre className="">{JSON.stringify(session, null, 2)}</pre>
        <LogOutButton />
    </div>;
};

export default PreUser;
