'use client'

import React, { useEffect, useState } from 'react'; // Import useState
import "../authStyle.css"
import Image from 'next/image'
import { FaDiscord, FaGoogle } from "react-icons/fa";
import { Input } from '~/components/ui/input'
import { Button, buttonVariants } from '~/components/ui/button' // Removed buttonVariants as not directly used in the button component
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
  FormMessage, // Import FormMessage for error display
} from "~/components/ui/form"
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '~/hooks/use-toast';
import { ToastAction } from "~/components/ui/toast"
import { Session } from 'next-auth'; // Assuming Session is passed as prop
import ViewfinderLogo from '~/components/misc/Logo';
import { ModeToggle } from '~/components/navigationBar/DarkModeToggle';
import Link from 'next/link';
import { cn } from '~/lib/utils';
import SocialMediaLogins from '../socialMediaLogins';
// import { cn } from '~/lib/utils'; // Only needed if you use cn function here

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

  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator

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
      case 'CredentialsSignin': // This will be the error for failed email/password login
        return {
          title: "Login Failed",
          description: "Invalid email or password. Please check your credentials.",
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
      case 'verifyEmail': // Message from successful Supabase signup requiring verification
        return {
          title: "Account Created!",
          description: "Please check your email to verify your account before logging in.",
          variant: "default" as const, // Or a different variant like "success" if you have one
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

  // NEW: onSubmit function for credentials login
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    const result = await signIn('credentials', {
      email: values.email,
      password: values.password,
      redirect: false, // Prevent NextAuth.js from redirecting on failure, let us handle it
    });

    setIsLoading(false);

    if (result?.error) {
      // result.error will contain the error string from NextAuth.js
      // e.g., "CredentialsSignin"
      const toastOptions = getErrorMessage(result.error);
      toast(toastOptions);
      // Optionally, if you want to clear the URL error param here too
      router.replace('/login', { scroll: false });
    } else if (result?.ok) {
      // Login successful, redirect to dashboard
      toast({
        title: "Login Successful!",
        description: "Welcome back!",
        // If you want a ToastAction that takes them to the dashboard, use this:
        // action: <ToastAction altText="Go to dashboard" onClick={() => router.push('/play/dashboard')}>Go to Dashboard</ToastAction>,
      });
      router.push('/play/dashboard');
    }
  }

  const router = useRouter();

  // Redirect if session exists
  useEffect(() => {
    if (session?.user) {
      router.push('/feed');
    }
  }, [router, session]);

  // Effect for displaying toast on initial load (for OAuth or other direct errors)
  useEffect(() => {
    // Check for `error` param from OAuth or other NextAuth.js redirects
    if (error) {
      const toastOptions = getErrorMessage(error);
      toast(toastOptions);
      // Optionally clear the error from the URL to prevent re-toasting on re-renders
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('error');
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    }
    // Also check for `message` param (e.g., from Supabase signup)
    const message = searchParams.get('message');
    if (message) {
      const toastOptions = getErrorMessage(message);
      toast(toastOptions);
      // Clear the message from the URL
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('message');
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    }
  }, [error, searchParams, toast, router]); // Added all dependencies

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
                        <FormMessage /> {/* Added FormMessage for email */}
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
                        <FormMessage /> {/* Added FormMessage for password */}
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
                      <Button className='px-4 py-2 w-28' type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                      </Button>
                      <Button className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs' variant={'link'}>Having trouble?</Button>
                    </div>
                  </div>
                </form>
              </Form>
              <div className="w-full">
                <SocialMediaLogins />
              </div>
            </div>
          </div>
        </div>
        <div className="LoginPaneRight h-full w-full flex justify-center items-center relative">
          <Image src={'/login.jpg'} alt={'Login Illustration'} fill style={{ objectFit: 'cover' }} className="rounded-r-lg" />
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