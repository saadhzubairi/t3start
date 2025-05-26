
import React from 'react'
import LoginPage from '~/components/main/auth/login/LoginPage';
import { auth } from '~/server/auth';

const page = async () => {

    const session = await auth();
        
    return (
        <div>
            <LoginPage session={session} />
        </div>
    )
}

export default page