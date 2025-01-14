import React from 'react'
import "./loginPage.css"
import Image from 'next/image'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'

const LoginPage = () => {
  return (
    <main className="p-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FCFEF1] to-[#FCFFE6] text-white">
      <div className="LoginPane drop-shadow-2xl">
        <div className="LoginPaneLeft h-full w-full flex justify-center items-center">
          <div className="flex justify-center items-center flex-col">
            <h1 className='font-thin text-6xl mb-12'>Wexler</h1>
            <div className="flex justify-center items-start flex-col gap-4">
              <div className="flex flex-col">
                <div className="">
                  <div className=" text-lg font-bold">Login</div>
                </div>
                <div className="flex justify-center items-center flex-col text-sm text-gray-500 font-medium">Enter your credentials to get started</div>
              </div>

              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <Button className=''>
                Log in
              </Button>
            </div>
          </div>
        </div>
        <div className="LoginPaneRight h-full w-full flex justify-center items-center">

        </div>
      </div>
    </main>
  )
}

export default LoginPage