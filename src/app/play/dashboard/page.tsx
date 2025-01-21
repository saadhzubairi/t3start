"use client"

import React from 'react'
import { signOut } from 'next-auth/react';
import { Button } from '~/components/ui/button';

const page = () => {
  return (
    <div className='flex w-full h-full items-center justify-center p-4'>
      <Button
        className=' '
        onClick={() => signOut()}
      >
        Sign out!
      </Button>

    </div>
  )
}

export default page