import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

const LogOutButton = () => {
    return <div>
        <Button asChild variant={'destructive'}>
            <Link href={'/api/auth/signout'}>Log Out</Link>
        </Button>
    </div>;
};

export default LogOutButton;
