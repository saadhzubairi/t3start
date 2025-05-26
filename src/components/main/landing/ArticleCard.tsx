// src/components/landing/ArticleCard.tsx
"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

// Define an interface for the Article props
export interface Article {
  id: string;
  title: string;
  imageUrl?: string;
  category?: string;
  excerpt: string;
  authorName: string;
  publishDate: string; // Could be a Date object, formatted to string for display
  articleUrl: string;
  // Add any other relevant article details
}

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl h-full">
      {article.imageUrl && (
        <div className="relative w-full h-52 sm:h-48"> {/* Aspect ratio for the image */}
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill // Use fill with a positioned parent
            style={{ objectFit: 'cover' }} // Prioritize 'fill' and 'style' for Next 13+ App Router
            className="transition-transform duration-500 group-hover:scale-105" // Example hover effect for group
          />
        </div>
      )}
      <CardHeader className="pt-4 pb-2">
        <div className="flex flex-wrap items-center gap-2 mb-2">
            {article.category && (
            <Badge variant="secondary" className="text-xs">
                {article.category}
            </Badge>
            )}
             <p className="text-xs text-muted-foreground">
                {new Date(article.publishDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}
            </p>
        </div>
        <CardTitle className="text-lg sm:text-xl font-semibold leading-tight hover:text-primary transition-colors">
          <Link href={article.articleUrl}>{article.title}</Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow py-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{article.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-3 pb-4 flex-col items-start sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted-foreground mb-2 sm:mb-0">
            By <span className="font-medium text-foreground">{article.authorName}</span>
        </p>
        <Button asChild variant="default" size="sm" className="w-full mt-2 sm:mt-0 sm:w-auto">
          <Link href={article.articleUrl}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};