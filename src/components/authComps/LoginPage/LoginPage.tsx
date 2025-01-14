import React from 'react'
import "./loginPage.css"
import Image from 'next/image'
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'


const LoginPage = () => {
  return (
    <main className="p-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#FCFEF1] to-[#FCFFE6] text-white">
      <div className="LoginPane drop-shadow-2xl">
        <div className="LoginPaneLeft h-full w-full flex justify-center items-center">
          <div className="flex justify-center items-center flex-col">
            <h1 className='font-thin text-6xl mb-12'>Harmony</h1>

            <div className="flex justify-center items-start flex-col gap-4">
              <div className="flex flex-col">
                <div className="">
                  <div className=" text-lg font-bold">Login</div>
                </div>
                <div className="flex justify-center items-center flex-col text-sm text-gray-500 font-medium">Enter your credentials to get started</div>
              </div>

              <Input type="email" placeholder="Email" />
              <Input type="password" placeholder="Password" />
              <div className="gap-2 flex items-center justify-center">
                <Checkbox id="doNotForget" />
                <Label htmlFor="doNotForget" className="text-gray-700 font-medium">
                  Keep me logged in
                </Label>
              </div>
              <div className="">
                <div className="flex justify-between items-center w-full gap-4">
                  <Button className='bg-custom-darkAccent px-4 py-2 w-28'>Login</Button>
                  <Button className='text-custom-darkAccent text-xs' variant={'link'}>Having trouble?</Button>
                </div>
                <Separator className='my-6' />
                <div className="">
                  <div className="flex justify-between items-center w-full gap-2 flex-col">
                    <Button className='text-custom-darkAccent text-xs w-full' variant={'outline'}>Sign up</Button>
                    <Button className=' text-custom-blurple hover:text-custom-blurpleHover text-xs w-full' variant={'outline'}>
                      <FaDiscord className="w-4 h-4" /> Login using Discord
                    </Button>
                    <Button className=' text-red-300 hover:text-red-500 text-xs w-full' variant={'outline'}>
                      <FaGoogle className="w-4 h-4" /> Login using Google
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="LoginPaneRight h-full w-full flex justify-center items-center relative">
          <Image src={'/login.jpg'} alt={''} fill style={{ objectFit: 'cover' }}/>
        </div>

      </div>
    </main>
  )
}

export default LoginPage