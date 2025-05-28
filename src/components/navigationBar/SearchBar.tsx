// ~/components/ui/search-bar.tsx
"use client";

import * as React from "react";
import { Search } from "lucide-react"; // Import the Search icon
import { Input } from "~/components/ui/input"; // Import Shadcn's Input component
import { cn } from "~/lib/utils"; // Assuming you have your cn utility function

type SearchBarProps = React.InputHTMLAttributes<HTMLInputElement>

const SearchBar = React.forwardRef<HTMLInputElement, SearchBarProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {/* Search icon */}
        <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />

        {/* Input field */}
        <Input
          type="text"
          placeholder="Search..." // Placeholder text
          className={cn(
            "w-full rounded-full border border-input bg-background pl-9 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
SearchBar.displayName = "SearchBar";

export { SearchBar };