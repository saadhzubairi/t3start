/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
    useEffect,
    useState
} from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useToast } from '~/hooks/use-toast';
import { ToastAction } from "~/components/ui/toast"
import { api } from "~/trpc/react"
import { useDebounce } from 'use-debounce';
import { Textarea } from "../ui/textarea"


const formSchema = z.object({
    username: z.string()
        .min(3, { message: "Username must be at least 3 characters." }) // Example min length
        .max(20, { message: "Username must not exceed 20 characters." }) // Example max length
        .regex(/^[a-zA-Z0-9_.-]+$/, { // Example: alphanumeric, underscore, hyphen, period allowed
            message: "Username can only contain letters, numbers, underscores, hyphens, and periods.",
        }),
    bio: z.string()
})

export default function FormA() {


    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            bio: ""
        },
        mode: "onChange"
    })

    const currentUsername = form.watch("username");
    const [debouncedUsername] = useDebounce(currentUsername, 500);

    const { data: isUsernameAvailable, isLoading: isCheckingUsername } =
        api.user.isUniqueUsername.useQuery(
            { username: debouncedUsername },
            {
                enabled: debouncedUsername.length > 0 && form.formState.errors.username?.type !== 'too_short' && form.formState.errors.username?.type !== 'too_long' && form.formState.errors.username?.type !== 'invalid_string', // Only enable query if username is not empty and passes basic client-side validation
                staleTime: 1000,
                refetchOnWindowFocus: false,
                retry: false,
            }
        );

    useEffect(() => {
        if (debouncedUsername && !isCheckingUsername) {
            if (isUsernameAvailable === false) {
                // If the username is not available, set a custom error
                form.setError("username", {
                    type: "manual",
                    message: "This username is already taken.",
                });
            } else if (isUsernameAvailable === true && form.formState.errors.username?.type === 'manual') {
                // If it becomes available, clear the custom manual error
                form.clearErrors("username");
            }
        }
    }, [debouncedUsername, isUsernameAvailable, isCheckingUsername, form]);


    const getAvailabilityMessage = () => {
        if (form.formState.errors.username) {
            // If there's a Zod validation error (e.g., too short, invalid characters), show that first
            return (
                <FormMessage className="text-red-500 dark:text-red-300">
                    {form.formState.errors.username.message}
                </FormMessage>
            ); // This will display the Zod error message
        }

        if (currentUsername.length === 0) {
            return <FormDescription>This is your public display name.</FormDescription>;
        }

        if (isCheckingUsername) {
            return <FormDescription>Checking availability...</FormDescription>;
        }

        if (isUsernameAvailable === true) {
            return (
                <FormDescription className="text-green-500 dark:text-green-300">
                    Username available!
                </FormDescription>
            );
        }

        if (isUsernameAvailable === false) {
            return (
                <FormDescription className="text-red-500 dark:text-red-300">
                    This username is not available.
                </FormDescription>
            );
        }

        return <FormDescription>Enter a username to check availability.</FormDescription>;
    };

    const { mutateAsync, error, isPending } =
        api.user.updatePreUserToUser.useMutation({
            onSuccess: (updatedUser) => {
                // e.g. redirect to dashboard
                console.log("Promoted →", updatedUser);
                toast(
                    {
                        title: "Output",
                        description: "Sucesss",
                        variant: "default" as const,
                    }
                );
            },
            onError: (err) => {
                toast({
                    title: "Error",
                    description: err.message,
                    variant: "destructive"
                });
            },
        });
    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            /* console.log(values);
            toast(
                {
                    title: "Output",
                    description:
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">{JSON.stringify(values, null, 2)}</code>
                        </pre>,
                    variant: "default" as const,
                }
            ); */
            await mutateAsync(values);
        } catch (err: any) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-72 space-y-8 max-w-3xl mx-auto py-10">

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Choose a unique username</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder=""
                                    className="dark:bg-gray-900"
                                    type="text"
                                    {...field} />
                            </FormControl>
                            {getAvailabilityMessage()}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Write a short bio for yourself</FormLabel>
                            <FormControl>
                                <Textarea
                                    className="dark:bg-gray-900"
                                    placeholder=""
                                    {...field} />
                            </FormControl>
                            {/* {getAvailabilityMessage()} */}
                        </FormItem>
                    )}
                />
                <Button disabled={isPending} type="submit">Submit</Button>
            </form>
        </Form>
    )
}