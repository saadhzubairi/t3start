
import React from 'react'
import Dashboard from '~/components/play/Dashboard'
import { auth } from '~/server/auth';


const page = async () => {
  const session = await auth();

  return (
    <div>
      <Dashboard session={session} />
    </div>
  )
}

export default page