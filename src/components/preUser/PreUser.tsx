"use client"

import React from "react";
import LogOutButton from "../main/auth/LogOutButton";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { api } from "~/trpc/react";
import FormA from "./FormA";

const PreUser = () => {
    

    // Use the new tRPC hook to fetch data
    const { data: users, isLoading: isLoadingUsers, error, refetch: fetchUsers }
        = api.user.getAll.useQuery(undefined, { enabled: false });

    const handleMakeUser = async () => {
        await fetchUsers().then(() => { console.log(isLoadingUsers); });
        console.log(isLoadingUsers);
    }

    if (error) {
        // The error message will be whatever you threw in the procedure
        return <div className="text-red-500">Error: {error.message}</div>;
    }

    return <div>
        <div className="">PREUSER PAGE</div>
        {/* <pre className="">{JSON.stringify(session, null, 2)}</pre> */}

        <FormA />

        {/* <div className="flex flex-row gap-4 my-4">

            <Button disabled={isLoadingUsers} onClick={handleMakeUser}>
                {
                    isLoadingUsers ?
                        'Fetching...' : 'Fetch users'
                }
            </Button>
            <LogOutButton />
        </div> */}
    </div>;
};

export default PreUser;
