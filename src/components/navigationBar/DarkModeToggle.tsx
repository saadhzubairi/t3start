"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { cn } from "~/lib/utils"
import { navigationMenuTriggerStyle } from "../ui/navigation-menu"



export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon"
          className={cn(
            navigationMenuTriggerStyle(),                // 1. Apply base Shadcn styles
            "hover:bg-neutral-200/20 dark:hover:bg-neutral-700/20",  // 2. Override default background to transparent
            "text-neutral-900 dark:text-neutral-100",    // 3. Set text color: dark text for light mode, light text for dark mode
            "hover:bg-neutral-200 dark:hover:bg-neutral-700/60", // 4. Hover background: light grey for light mode, dark grey for dark mode
            "hover:text-neutral-900 dark:hover:text-neutral-100", // 5. Ensure text color matches mode on hover
            "focus:bg-neutral-200 dark:focus:bg-neutral-700/60", // 6. Consistent focus style for both modes
            "focus:text-neutral-900 dark:focus:text-neutral-100", //
            "data-[active]:bg-neutral-300 dark:data-[active]:bg-neutral-600/75", // 7. Active link style for both modes
            "data-[active]:text-neutral-900 dark:data-[active]:text-neutral-100", //
            "rounded-full", // 8. Ensure the button is fully rounded
          )}
        >
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}