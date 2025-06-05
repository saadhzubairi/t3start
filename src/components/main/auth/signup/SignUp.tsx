/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'

import React, { useEffect, useState } from 'react'; // Import useState
import "../authStyle.css"; // Ensure styles here don't override dark mode colors for backgrounds/text
import Image from 'next/image';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { Checkbox } from '~/components/ui/checkbox';
import { Label } from '~/components/ui/label';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '~/hooks/use-toast';
import { ToastAction } from "~/components/ui/toast";
import ViewfinderLogo from '~/components/misc/Logo';
import { ModeToggle } from '~/components/navigationBar/DarkModeToggle';
import { signIn } from 'next-auth/react'; // Import signIn for OAuth providers
import Link from 'next/link'; // Import Link
import SocialMediaLogins from '../socialMediaLogins';
import ScrollAnimated from '~/components/misc/ScrollAnimated';
import FadeIn from '~/components/misc/FadeIn';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "This is not a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." })
    .max(50, { message: "Password cannot exceed 50 characters." }),
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"],
});


const SignupPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    },
  });

  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error'); // Error from NextAuth.js redirect (e.g., if social signup fails)

  const [isLoading, setIsLoading] = useState(false); // State for loading indicator on form submission

  // Effect to display toast when an error param is present (e.g., from NextAuth.js OAuth)
  useEffect(() => {
    if (error) {
      // You can refine this to handle specific NextAuth.js errors if needed
      // For now, a generic destructive toast for any URL error param
      toast({
        variant: "destructive",
        title: "Sign-up Error",
        description: "An issue occurred during sign-up. Please try again or use another method.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      // Optionally clear the error from the URL to prevent re-toasting on re-renders
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete('error');
      router.replace(`?${newSearchParams.toString()}`, { scroll: false });
    }
  }, [error, toast, router, searchParams]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true); // Set loading state to true
    try {
      const response = await fetch('/api/auth/supabase-signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: values.email, password: values.password }), // Only send email and password to backend
      });

      const data = await response.json(); // Parse the response

      if (response.ok) {
        toast({
          title: "Sign up successful!",
          description: data.requiresEmailVerification
            ? "Please check your email to verify your account. You can log in after verification."
            : "You have successfully signed up. You can now log in.",
          action: <ToastAction altText="Go to login" onClick={() => router.push('/login')}>Go to Login</ToastAction>, // Action button to go to login
        });
        // Redirect to login page after successful signup (and possibly verification message)
        router.push('/login');
      } else {
        // Handle specific errors from your API route (e.g., duplicate email)
        toast({
          title: "Sign up failed.",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (apiError) {
      console.error('Client-side network/API call error:', apiError);
      toast({
        title: "Sign up failed.",
        description: "Could not connect to the server. Please check your internet connection.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setIsLoading(false); // Reset loading state
    }
  }

  return (
    <main className="p-10 flex h-[100vh] lg:flex-col md:flex-row items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-neutral-900 dark:to-neutral-950">
      <FadeIn>
        <div className="LoginPane h-[80vh] drop-shadow-2xl rounded-lg bg-white dark:bg-neutral-800">
          <div className="LoginPaneLeft h-full w-full flex justify-center items-center">
            <div className="flex justify-center items-center flex-col p-8 md:p-12">

              <div className='font-thin text-6xl mb-12'>
                <ScrollAnimated>
                  <ViewfinderLogo size="2.5rem" />
                </ScrollAnimated>
              </div>
              <div className="flex justify-center delay dela items-start flex-col gap-4 w-full max-w-sm">
                <ScrollAnimated delay={"100"}>
                  <div className="flex flex-col">
                    <div className="">
                      <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Sign Up</div>
                    </div>
                    <div className="flex justify-center items-center flex-col text-sm text-neutral-500 dark:text-neutral-400 font-medium">Create your new account</div>
                  </div>
                </ScrollAnimated>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <ScrollAnimated delay={"200"}>
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
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </ScrollAnimated>
                    <ScrollAnimated delay={"300"}>
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-neutral-700 dark:text-neutral-300">Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="" {...field} className='bg-neutral-100 dark:bg-neutral-700 shadow-md' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </ScrollAnimated>
                    {
                      false && (<FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-neutral-700 dark:text-neutral-300">Confirm Password</FormLabel>
                            <FormControl>
                              <Input type="password" placeholder="" {...field} className='bg-neutral-100 dark:bg-neutral-700 shadow-md' />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />)
                    }
                    <ScrollAnimated delay={"300"}>
                      <div className="flex flex-col gap-4">
                        <div className="gap-2 flex items-center justify-start">
                          <Checkbox id="terms" />
                          <Label htmlFor="terms" className="text-neutral-700 dark:text-neutral-300 font-medium">
                            I agree to the terms and conditions
                          </Label>
                        </div>
                        <div className="">
                          <Button className='px-4 py-2 w-full' type="submit" disabled={isLoading}>
                            {isLoading ? 'Signing up...' : 'Sign Up'}
                          </Button>
                        </div>
                      </div>
                    </ScrollAnimated>
                  </form>
                </Form>

                <div className="w-full">
                  <ScrollAnimated delay={"300"}>
                    <SocialMediaLogins />
                  </ScrollAnimated>
                </div>
              </div>
            </div>
          </div>
          <div className="LoginPaneRight h-full w-full flex justify-center items-center relative">
            <Image src={'/login.webp'} alt={'Sign Up'} fill style={{ objectFit: 'cover' }} className="rounded-r-lg" />
            <div className="absolute top-2 right-2">
              <ModeToggle />
            </div>
          </div>
        </div>
      </FadeIn>
    </main>
  );
}

export default SignupPage;