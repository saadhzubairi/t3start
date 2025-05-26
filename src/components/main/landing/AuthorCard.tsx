// src/components/landing/AuthorCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Using next/image for optimized images
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

// Define an interface for the Author props
export interface Author {
  id: string;
  name: string;
  imageUrl?: string;
  titleOrBio: string; // Can be a short title or a brief bio
  profileUrl: string;
  // Add any other relevant author details, e.g., social links
}

interface AuthorCardProps {
  author: Author;
}

export const AuthorCard: React.FC<AuthorCardProps> = ({ author }) => {
  return (
    <Card className="flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:shadow-2xl h-full">
      <CardHeader className="pt-6 pb-2">
        <Avatar className="w-28 h-28 mx-auto border-4 border-border hover:border-primary transition-colors">
          {author.imageUrl ? (
            <AvatarImage src={author.imageUrl} alt={author.name} />
          ) : null}
          <AvatarFallback className="text-3xl">
            {author.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .substring(0, 2)
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent className="flex-grow px-4 py-2">
        <CardTitle className="text-xl font-semibold mt-2">{author.name}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mt-1 line-clamp-2">
          {author.titleOrBio}
        </CardDescription>
      </CardContent>
      <CardFooter className="pb-6 pt-3">
        <Button asChild variant="outline" className="w-full sm:w-auto">
          <Link href={author.profileUrl}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};