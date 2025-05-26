'use client'

import React, { useEffect } from 'react'
import "../authStyle.css"
import Image from 'next/image'
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Input } from '~/components/ui/input'
import { Button, buttonVariants } from '~/components/ui/button'
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
import { useTheme } from 'next-themes';
import { ModeToggle } from '~/components/navigationBar/DarkModeToggle';
import Link from 'next/link';
import { cn } from '~/lib/utils';

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

  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  console.log('LoginPage rendered. Error param:', error);

  const { toast } = useToast(); // Ensure useToast is called at the top level

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case 'OAuthAccountNotLinked':
        return {
          title: "Account Not Linked",
          description: "It looks like you already have an account registered with this email address, but it's not linked to this sign-in method. Please sign in with your original method, or link this account in your profile settings after logging in.",
          variant: "destructive" as const,
        };
      case 'EmailSignInError':
        return {
          title: "Email Sign-in Failed",
          description: "Failed to send verification email. Please try again.",
          variant: "destructive" as const,
        };
      case 'CredentialsSignin':
        return {
          title: "Invalid Credentials",
          description: "Invalid username or password. Please check your credentials.",
          variant: "destructive" as const,
        };
      case 'OAuthCallbackError':
        return {
          title: "Sign-in Failed",
          description: "There was an issue processing your sign-in with the provider. Please try again or use another method.",
          variant: "destructive" as const,
        };
      case 'Configuration':
        return {
          title: "Server Configuration Error",
          description: "A server configuration error occurred. Please try again later or contact support.",
          variant: "destructive" as const,
        };
      default:
        return {
          title: "An Unknown Error Occurred",
          description: "An unexpected error happened during sign-in. Please try again.",
          variant: "destructive" as const,
        };
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // You might want to call signIn('credentials', { email: values.email, password: values.password }); here
  }

  const router = useRouter();

  // Redirect if session exists
  useEffect(() => {
    if (session?.user) {
      router.push('/play/dashboard');
    }
  }, [router, session]);

  // NEW useEffect for displaying toast on initial load
  useEffect(() => {
    if (error) {
      // Add a small, controlled delay
      const timer = setTimeout(() => {
        const toastOptions = getErrorMessage(error);
        toast(toastOptions);
      }, 50); // Try 50ms or 100ms
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, toast]); // Depend on 'error' and 'toast'

  return (
    <main className="p-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-neutral-900 dark:to-neutral-950">
      <div className="LoginPane drop-shadow-2xl rounded-lg bg-white dark:bg-neutral-800">
        <div className="LoginPaneLeft h-full w-full flex justify-center items-center">
          <div className="flex justify-center items-center flex-col p-8 md:p-12">

            <div className='font-thin text-6xl mb-12'>
              <ViewfinderLogo
                size="2.5rem"
              />
            </div>
            <div className="flex justify-center items-start flex-col gap-4 w-full max-w-sm">
              <div className="flex flex-col">
                <div className="">
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
                        <FormLabel className="text-neutral-700 dark:text-neutral-300">Email</FormLabel>
                        <FormControl>
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
                    <Checkbox id="doNotForget" />
                    <Label htmlFor="doNotForget" className="text-neutral-700 dark:text-neutral-300 font-medium">
                      Keep me logged in
                    </Label>
                  </div>
                  <div className="">
                    <div className="flex justify-between items-center w-full gap-4">
                      <Button className='px-4 py-2 w-28' type="submit">Login</Button>
                      <Button className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs' variant={'link'}>Having trouble?</Button>
                    </div>
                  </div>
                </form>
              </Form>
              <Separator className='my-4' />
              <div className="w-full">
                <div className="flex justify-between items-center w-full gap-2 flex-col">
                  <Link href="/signup" className={cn(buttonVariants({ variant: "outline" }), 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs w-full')}>Sign up</Link>
                  <Button
                    className='text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 border-indigo-600 dark:border-indigo-400 text-xs w-full flex items-center justify-center gap-2'
                    variant={'outline'}
                    onClick={() => signIn('discord')}
                  >
                    <FaDiscord className="w-4 h-4" /> Login using Discord
                  </Button>
                  <Button
                    className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-600 dark:border-red-400 text-xs w-full flex items-center justify-center gap-2'
                    variant={'outline'}
                    onClick={() => signIn('google')}
                  >
                    <FaGoogle className="w-4 h-4" /> Login using Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="LoginPaneRight h-full w-full flex justify-center items-center relative">
          <Image src={'/login.jpg'} alt={''} fill style={{ objectFit: 'cover' }} className="rounded-r-lg" />
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