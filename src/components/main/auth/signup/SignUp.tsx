'use client'

import React, { useEffect } from 'react';
import "../authStyle.css"; // You might want a separate CSS for signup, or a shared one.
import Image from 'next/image';
import { FaDiscord, FaGoogle } from "react-icons/fa";
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
  FormMessage, // Import FormMessage for error display
} from "~/components/ui/form";
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '~/hooks/use-toast';
import { ToastAction } from "~/components/ui/toast";
import ViewfinderLogo from '~/components/misc/Logo';
import { ModeToggle } from '~/components/navigationBar/DarkModeToggle';

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email cannot be empty." })
    .email({ message: "This is not a valid email." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }) // Added min length
    .max(50, { message: "Password cannot exceed 50 characters." }), // Added max length
  confirmPassword: z
    .string()
    .min(1, { message: "Please confirm your password." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // Path to the field that will show the error
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
  const error = searchParams.get('error');

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your signup. Please try again.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [error, toast]);


  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Signup values:", values);
    // Here you would typically call your backend API to register the user.
    // Example:
    // const response = await fetch('/api/auth/register', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ email: values.email, password: values.password }),
    // });
    // if (response.ok) {
    //   toast({
    //     title: "Account created!",
    //     description: "You can now log in with your new account.",
    //   });
    //   router.push('/login'); // Redirect to login page after successful signup
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Signup failed.",
    //     description: "Please check your details and try again.",
    //   });
    // }
    toast({
      title: "Signup Attempt",
      description: `Email: ${values.email}, Password: ${values.password}`,
    });
    // Simulate a successful signup and redirect
    setTimeout(() => {
      router.push('/login');
    }, 1500);

  }

  return (
    <main className="p-10 flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-stone-50 to-stone-100 dark:from-neutral-900 dark:to-neutral-950">
      <div className="LoginPane drop-shadow-2xl rounded-lg bg-white dark:bg-neutral-800">
        <div className="LoginPaneLeft h-full w-full flex justify-center items-center">
          <div className="flex justify-center items-center flex-col p-8 md:p-12">

            <div className='font-thin text-6xl mb-12'>
              <ViewfinderLogo size="2.5rem" />
            </div>
            <div className="flex justify-center items-start flex-col gap-4 w-full max-w-sm">
              <div className="flex flex-col">
                <div className="">
                  <div className="text-lg font-bold text-neutral-900 dark:text-neutral-100">Sign Up</div>
                </div>
                <div className="flex justify-center items-center flex-col text-sm text-neutral-500 dark:text-neutral-400 font-medium">Create your new account</div>
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
                        <FormMessage /> {/* Displays validation errors */}
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-neutral-700 dark:text-neutral-300">Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="xxxx" {...field} className='bg-neutral-100 dark:bg-neutral-700 shadow-md' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="">
                    <div className="flex justify-between items-center w-full gap-4">
                      <Button className='px-4 py-2 w-28' type="submit">Sign Up</Button>
                      <Button
                        className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-xs'
                        variant={'link'}
                        onClick={() => router.push('/login')} // Link back to login
                      >
                        Already have an account?
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
              <Separator className='my-4' />
              <div className="w-full">
                <div className="flex justify-between items-center w-full gap-2 flex-col">
                  <Button
                    className='text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 border-indigo-600 dark:border-indigo-400 text-xs w-full flex items-center justify-center gap-2'
                    variant={'outline'}
                    onClick={() => console.log("Sign up with Discord")} // Implement Discord signup
                  >
                    <FaDiscord className="w-4 h-4" /> Sign up using Discord
                  </Button>
                  <Button
                    className='text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-600 dark:border-red-400 text-xs w-full flex items-center justify-center gap-2'
                    variant={'outline'}
                    onClick={() => console.log("Sign up with Google")} // Implement Google signup
                  >
                    <FaGoogle className="w-4 h-4" /> Sign up using Google
                  </Button>
                </div>
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
    </main>
  );
}

export default SignupPage;