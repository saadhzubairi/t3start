'use client'

import React, { useEffect } from 'react'
import "./loginPage.css" // Ensure styles here don't override dark mode colors for backgrounds/text
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
import ViewfinderLogo from '~/components/misc/Logo';
import { useTheme } from 'next-themes'; // Import useTheme
import { ModeToggle } from '~/components/navigationBar/DarkModeToggle';

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
  const { theme } = useTheme(); // Get current theme
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]); // Added error to dependency array as calltoast depends on it

  return (
    // Assuming custom-stone-* are light. Using standard Tailwind colors for demonstration.
    // Removed global text-white. Text color will be handled by specific elements or inherited.
    <main className="p-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-neutral-900 dark:to-neutral-950">
      {/* Added background colors for light and dark modes to the LoginPane */}
      <div className="LoginPane drop-shadow-2xl rounded-lg bg-white dark:bg-neutral-800">
        <div className="LoginPaneLeft h-full w-full flex justify-center items-center">
          <div className="flex justify-center items-center flex-col p-8 md:p-12"> {/* Added some padding for better spacing */}

            <div className='font-thin text-6xl mb-12'>
              <ViewfinderLogo
                size="2.5rem"
              />
            </div>
            <div className="flex justify-center items-start flex-col gap-4 w-full max-w-sm"> {/* Added w-full and max-w-sm for better form width control */}
              <div className="flex flex-col">
                <div className="">
                  {/* Text color adapts to the LoginPane's background */}
                  <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Login</div>
                </div>
                <div className="flex justify-center items-center flex-col text-sm text-neutral-500 dark:text-neutral-400 font-medium">Enter your credentials to login</div>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        {/* Shadcn FormLabel should adapt */}
                        <FormLabel className="text-neutral-700 dark:text-neutral-300">Email</FormLabel>
                        <FormControl>
                          {/* Shadcn Input styled with background color and shadow */}
                          <Input
                            type="email"
                            placeholder="abc@example.com"
                            {...field}
                            className='bg-neutral-100 dark:bg-neutral-700 shadow-md'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 dark:text-neutral-300">Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="xxxx" {...field} className='bg-neutral-100 dark:bg-neutral-700 shadow-md' />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <div className="gap-2 flex items-center justify-start">
                    {/* Shadcn Checkbox should adapt */}
                    <Checkbox id="doNotForget" />
                    {/* Shadcn Label should adapt, but explicit color for consistency: */}
                    <Label htmlFor="doNotForget" className="text-neutral-700 dark:text-neutral-300 font-medium">
                      Keep me logged in
                    </Label>
                  </div>
                  <div className="">
                    <div className="flex justify-between items-center w-full gap-4">
                      {/* Shadcn Button (default variant) should adapt */}
                      <Button className='px-4 py-2 w-28' type="submit">Login</Button>
                      {/* Link button text color updated */}
                      <Button className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs' variant={'link'}>Having trouble?</Button>
                    </div>
                  </div>
                </form>
              </Form>
              {/* Shadcn Separator should adapt */}
              <Separator className='my-4' />
              <div className="w-full">
                <div className="flex justify-between items-center w-full gap-2 flex-col">
                  {/* Outline button text color updated. Shadcn outline buttons adapt border/bg. */}
                  <Button className='text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs w-full' variant={'outline'} onClick={() => { console.log(error) }}>Sign up</Button>
                  <Button
                    // Assuming custom-blurple is designed to work on both light/dark or you have variants.
                    // If not, apply similar dark:text-* classes.
                    className='text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 border-indigo-600 dark:border-indigo-400 text-xs w-full flex items-center justify-center gap-2' // Added flex for icon alignment
                    variant={'outline'}
                    onClick={() => signIn('discord')}
                  >
                    <FaDiscord className="w-4 h-4" /> Login using Discord
                  </Button>
                  <Button
                    className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-600 dark:border-red-400 text-xs w-full flex items-center justify-center gap-2' // Added flex for icon alignment
                    variant={'outline'}
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
          <Image src={'/login.jpg'} alt={''} fill style={{ objectFit: 'cover' }} className="rounded-r-lg" /> {/* Added rounded-r-lg if LoginPane has rounded-lg */}
          <div
            className="absolute top-2 right-2">
            <ModeToggle />
          </div>
        </div>
      </div>
    </main>
  )
}

export default LoginPage