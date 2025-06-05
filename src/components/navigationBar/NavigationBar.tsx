import * as React from "react"
import Link from "next/link"
import { auth } from "~/server/auth";
import { cn } from "~/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu"
import { buttonVariants } from "../ui/button"
import { FaArrowAltCircleRight, FaSearch, } from "react-icons/fa"
import { api } from "~/trpc/server";
import AvatarMenu from "./AvatarMenu";
import { SearchBar } from "./SearchBar";


const components: { title: string; href: string; description: string }[] = [
    {
        title: "Power & Politics",
        href: "/tags/art-deco",
        description: "Exploring the geometry, glamour, and industrial optimism of the Art Deco movement.",
    },
    {
        title: "Language & Symbolism",
        href: "/tags/brutalism",
        description: "Monolithic concrete, raw aesthetics, and architectural honesty—Brutalism’s legacy and revival.",
    },
    {
        title: "Material & Craft",
        href: "/tags/urbanism",
        description: "Design, density, and power—how cities shape and are shaped by people.",
    },
    {
        title: "Cities & Typologies",
        href: "/tags/adaptive-reuse",
        description: "How old structures find new purpose through thoughtful redesign and restoration.",
    },
    {
        title: "Histories & Lineages",
        href: "/tags/material-studies",
        description: "Stone, steel, glass, and more—materials as narrative devices in built form.",
    },
    {
        title: "Tools & Techniques",
        href: "/tags/architectural-theory",
        description: "Critical thought, design ideologies, and the philosophies behind architectural movements.",
    }
];

interface NavLinkItemProps {
    href: string;
    children: React.ReactNode;
}

const NavLinkItem: React.FC<NavLinkItemProps> = ({ href, children }) => {
    return (
        <NavigationMenuItem>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink
                    className={cn(
                        navigationMenuTriggerStyle(),                // 1. Apply base Shadcn styles
                        "bg-transparent",                            // 2. Override default background to transparent
                        "text-neutral-900 dark:text-neutral-100",    // 3. Set text color: dark text for light mode, light text for dark mode
                        "hover:bg-neutral-200 dark:hover:bg-neutral-700/60", // 4. Hover background: light grey for light mode, dark grey for dark mode
                        "hover:text-neutral-900 dark:hover:text-neutral-100", // 5. Ensure text color matches mode on hover
                        "focus:bg-neutral-200 dark:focus:bg-neutral-700/60", // 6. Consistent focus style for both modes
                        "focus:text-neutral-900 dark:focus:text-neutral-100", //
                        "data-[active]:bg-neutral-300 dark:data-[active]:bg-neutral-600/75", // 7. Active link style for both modes
                        "data-[active]:text-neutral-900 dark:data-[active]:text-neutral-100" //
                    )}
                >
                    {children}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    );
};


export async function NavigationBar() {

    const session = await auth();

    if (session?.user) {
        void api.post.getLatest.prefetch();
    }



    return (
        <NavigationMenu>
            <NavigationMenuList>
                {/* <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                            <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                    <Link
                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                        href="/"
                                    >
                                        <div className="font-black">Harmony</div>
                                        <div className="mb-2 mt-4 text-lg font-medium">
                                            shadcn/ui
                                        </div>
                                        <p className="text-sm leading-tight text-muted-foreground">
                                            Beautifully designed components built with Radix UI and
                                            Tailwind CSS.
                                        </p>
                                    </Link>
                                </NavigationMenuLink>
                            </li>
                            <ListItem href="/docs" title="Introduction">
                                Re-usable components built using Radix UI and Tailwind CSS.
                            </ListItem>
                            <ListItem href="/docs/installation" title="Installation">
                                How to install dependencies and structure your app.
                            </ListItem>
                            <ListItem href="/docs/primitives/typography" title="Typography">
                                Styles for headings, paragraphs, lists...etc
                            </ListItem>
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem> */}
                <div className="p-4 max-w-md mx-auto">
                    <SearchBar
                        /* value={'searchValue'} */
                        /* onChange={() => { console.log('Search input changed'); }} // Handle search input change)} */
                    // You can pass any standard HTML input attributes here
                    // id="main-search"
                    // name="search"
                    // className="custom-search-style"
                    />
                    {/* Optionally display the current search value */}
                    {/* {searchValue && <p className="mt-2 text-sm">Searching for: {searchValue}</p>} */}
                </div>
                <NavigationMenuItem>
                    <NavigationMenuTrigger
                        className={cn(
                            navigationMenuTriggerStyle(),                // 1. Apply base Shadcn styles
                            "bg-transparent",                            // 2. Override default background to transparent
                            "text-neutral-900 dark:text-neutral-100",    // 3. Set text color: dark text for light mode, light text for dark mode
                            "hover:bg-neutral-200 dark:hover:bg-neutral-700/60", // 4. Hover background: light grey for light mode, dark grey for dark mode
                            "hover:text-neutral-900 dark:hover:text-neutral-100", // 5. Ensure text color matches mode on hover
                            "focus:bg-neutral-200 dark:focus:bg-neutral-700/60", // 6. Consistent focus style for both modes
                            "focus:text-neutral-900 dark:focus:text-neutral-100", //
                            "data-[active]:bg-neutral-300 dark:data-[active]:bg-neutral-600/75", // 7. Active link style for both modes
                            "data-[active]:text-neutral-900 dark:data-[active]:text-neutral-100" //
                        )}
                    >Tags</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                            {components.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                    {component.description}
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                {/* Using the new NavLinkItem component */}

                <NavLinkItem href="/docs/theory-practice">Field Notes</NavLinkItem>
                <NavLinkItem href="/docs/theory-practice">Editorials</NavLinkItem>
                <NavigationMenuItem>
                    {
                        session ?
                            <AvatarMenu avatarUrl={session.user.image?.toString() ?? ""} />
                            :
                            <Link
                                className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
                                href={"/login"}
                                legacyBehavior>
                                Login <FaArrowAltCircleRight />
                            </Link>
                    }
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

/* <Button className="mx-2 px-6 bg-custom-darkAccent shadow-none h-9" variant={'default'} onClick={() =>} >Login <FaArrowAltCircleRight /></Button> */





