import Link from "next/link";
import React from "react";
import { Button } from "~/components/ui/button";

const LogOutButton = () => {
    return <div>
        <Button asChild>
            <Link href={'/api/auth/signout'}>logout</Link>
        </Button>
    </div>;
};

export default LogOutButton;
