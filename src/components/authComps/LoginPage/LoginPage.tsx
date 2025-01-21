'use client'

import React, { useEffect } from 'react'
import "./loginPage.css"
import Image from 'next/image'
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { Checkbox } from '~/components/ui/checkbox'
import { Label } from '~/components/ui/label'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form"
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '~/hooks/use-toast';
import { ToastAction } from "~/components/ui/toast"
import { Session } from 'next-auth';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Field cannot be empty", })
    .email({ message: "This is not a valid email." }),
  password: z
    .string()
    .min(1, { message: "Field cannot be empty", })
})

const LoginPage = ({ session }: { session: Session | null }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const { toast } = useToast()

  const calltoast = () => {
    if (error === "OAuthCallbackError") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with signing you in. Please try again.",
      })
      console.log(`THE ERROR IS ${error}`);
    }
  }

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      if (session?.user) {
        router.push('/play/dashboard');
      }
    };
    checkSession().catch(() => { console.log("ERROR") });
  }, [router, session]);

  useEffect(() => {
    const timer = setTimeout(() => {
      calltoast();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="p-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-custom-lightAccent to-custom-dark text-white">
      <div className="LoginPane drop-shadow-2xl rounded-lg">
        <div className="LoginPaneLeft h-full w-full flex justify-center items-center">

          <div className="flex justify-center items-center flex-col">
            <h1 className='font-thin text-6xl mb-12'>Harmony</h1>
            <div className="flex justify-center items-start flex-col gap-4">
              <div className="flex flex-col">
                <div className="">
                  <div className=" text-lg font-bold">Login</div>
                </div>
                <div className="flex justify-center items-center flex-col text-sm text-gray-500 font-medium">Enter your credentials to login</div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="abc@example.com" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="xxxx" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="gap-2 flex items-center justify-start">
                    <Checkbox id="doNotForget" />
                    <Label htmlFor="doNotForget" className="text-gray-700 font-medium">
                      Keep me logged in
                    </Label>
                  </div>
                  <div className="">
                    <div className="flex justify-between items-center w-full gap-4">
                      <Button className='bg-custom-darkAccent px-4 py-2 w-28' type="submit">Login</Button>
                      <Button className='text-custom-darkAccent text-xs' variant={'link'}>Having trouble?</Button>
                    </div>
                  </div>
                </form>
              </Form>
              <Separator className='my-2' />
              <div className="w-full">
                <div className="flex justify-between items-center w-full gap-2 flex-col">
                  <Button className='text-custom-darkAccent text-xs w-full' variant={'outline'} onClick={() => { console.log(error) }}>Sign up</Button>
                  <Button
                    className=' text-custom-blurple hover:text-custom-blurpleHover text-xs w-full'
                    variant={'outline'}
                    onClick={() => signIn('discord')}
                  >
                    <FaDiscord className="w-4 h-4" /> Login using Discord
                  </Button>
                  <Button className=' text-red-300 hover:text-red-500 text-xs w-full' variant={'outline'}
                    onClick={() => {
                      toast({
                        variant: "destructive",
                        title: "Uh oh! Something went wrong.",
                        description: "There was a problem with your request.",
                        action: <ToastAction altText="Try again">Try again</ToastAction>,
                      })
                    }}
                  >
                    <FaGoogle className="w-4 h-4" /> Login using Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="LoginPaneRight h-full w-full flex justify-center items-center relative">
          <Image src={'/login.jpg'} alt={''} fill style={{ objectFit: 'cover' }} />
        </div>

      </div>
    </main>
  )
}

export default LoginPage