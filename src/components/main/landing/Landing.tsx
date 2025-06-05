import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Button } from '../../ui/button' // Assuming this is your custom button component
import ScrollAnimated from '~/components/misc/ScrollAnimated'

import { AuthorCard, Author } from "./AuthorCard"; // Adjust path
import { ArticleCard, Article } from "./ArticleCard"; // Adjust path
import { Scroll } from 'lucide-react'
import Footer from './Footer'

// --- Mock Data (Replace with your actual data fetching logic) ---
const mockAuthors: Author[] = [
  { id: "1", name: "Elena Rodriguez", imageUrl: "https://i.pravatar.cc/150?u=elena", titleOrBio: "Architectural Historian & Urban Theorist.", profileUrl: "/authors/elena-rodriguez" },
  { id: "2", name: "Marcus Chen", imageUrl: "https://i.pravatar.cc/150?u=marcus", titleOrBio: "Sustainable Design Architect & Educator.", profileUrl: "/authors/marcus-chen" },
  { id: "3", name: "Aisha Khan", titleOrBio: "Landscape Architect & Environmental Planner.", profileUrl: "/authors/aisha-khan" }, // Example without image
  { id: "4", name: "David Miller", imageUrl: "https://i.pravatar.cc/150?u=david", titleOrBio: "Structural Engineer & Architectural Consultant.", profileUrl: "/authors/david-miller" },
];

const mockArticles: Article[] = [
  { id: "a1", title: "Ziggurats of Capital: Ascension and Authority in Midtown’s Art Deco Spires", imageUrl: "https://cdn.vox-cdn.com/thumbor/sMDmYq8MBpA_EveoCLntn_M5RVg=/0x0:1332x2000/1200x900/filters:focal(493x325:705x537):no_upscale()/cdn.vox-cdn.com/uploads/chorus_image/image/62562649/181229_10_44_59_5DS21938.34.jpg", category: "Architecture & Power", excerpt: "Midtown's stepped setbacks echo ziggurat temples, celebrating commerce while casting shadows over crowded streets below.", authorName: "Elena Rodriguez", publishDate: "2025-05-20", articleUrl: "/articles/ai-symbiosis" },
  { id: "a2", title: "Ornament as Ambition: Reading the Lexicon of Chrysler and Her Kin", imageUrl: "https://cdn.vox-cdn.com/thumbor/fdVNarIpZYd9idKkqbpQHyDpLCA=/0x53:3000x1624/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/8502487/52989844.jpg", category: "Design Language", excerpt: "Chrome eagles glare skyward, broadcasting corporate bravado through streamlined motifs and geometric Chrysler crown rhythms.", authorName: "Marcus Chen", publishDate: "2025-05-15", articleUrl: "/articles/quantum-leaps" },
  { id: "a3", title: "The Machine Age Dreams in Terracotta: Material Mythologies of 1930s Manhattan", imageUrl: "https://www.brownstoner.com/wp-content/uploads/2020/01/brooklyn-terra-cotta-history-building-1.jpg", category: "Material Histories", excerpt: "Practical tips and strategies for protecting your digital footprint in an increasingly connected world.", authorName: "Aisha Khan", publishDate: "2025-05-10", articleUrl: "/articles/digital-privacy-guide" },
];
// --- End Mock Data ---

const Landing = () => {
  return (
    <div className='bg-gradient-to-b from-custom-lightAccent to-custom-darkAccent min-h-screen flex flex-col'>
      {/* HERO SECTION */}
      <div className='relative h-[70vh] md:h-[85vh] w-full flex items-center justify-center text-center overflow-hidden'>
        {/* Background Image with Gradient Overlay */}

        <div className='absolute inset-0 z-0'>
          <Image
            src='/Landing/nyc.jpg'
            alt='Architectural cityscape'
            layout='fill'
            objectFit='cover'
            quality={100}
            className='opacity-80' // Adjust opacity as needed
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 to-custom-darkAccent/20'></div>
        </div>

        {/* Hero Content */}
        <ScrollAnimated>
          <div className='delay- relative z-10 flex flex-col items-center justify-center text-white p-6'>
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl mb-6 shadow-sm'>
              Where Inspiration Takes Form.
            </h1>
            <p className='text-lg sm:text-xl text-zinc-300 max-w-xl mb-8'>
              Exploring the intersection of design, innovation, and the built environment.
            </p>
            <Link href="#featured-articles" passHref >
              <Button variant="outline" className='bg-transparent border-custom-lightAccent text-custom-lightAccent hover:bg-custom-lightAccent hover:text-custom-dark transition-colors duration-300 text-lg px-8 py-3'>
                Explore Articles <FaArrowRight className='ml-2.5 w-5 h-5' />
              </Button>
            </Link>
          </div>
        </ScrollAnimated>
      </div >
      {/* MAIN CONTENT SECTION */}
      < div className='flex-grow container mx-auto px-6 lg:px-8 py-16' >
        {/* Featured Articles Section */}
        <ScrollAnimated>
          <section className="pb-6 px-6 pt-10 bg-custom-stone-100/50 dark:bg-secondary/30 rounded-3xl">
            <div className="container">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
                Latest Articles
              </h2>
              <p className="text-center text-muted-foreground mb-10 sm:mb-12 max-w-xl mx-auto">
                Dive into our newest selection of articles, offering fresh perspectives and valuable insights.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {mockArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimated>

        {/* Featured Authors Section */}
        <ScrollAnimated>
          <section className="py-12 sm:py-20">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-center mb-3">
                Featured Authors
              </h2>
              <p className="text-center text-muted-foreground mb-10 sm:mb-12 max-w-xl mx-auto">
                Meet the brilliant minds shaping our community and contributing their expertise.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {mockAuthors.map(author => (
                  <AuthorCard key={author.id} author={author} />
                ))}
              </div>
            </div>
          </section>
        </ScrollAnimated>



        <ScrollAnimated>
          {/* About Section - Optional */}
          <section className='my-24'>
            <div className='max-w-3xl mx-auto text-center'>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
                About Harmony Arch
              </h2>
              <p className='text-lg text-gray-600 dark:text-zinc-400 mb-6'>
                Harmony Arch is a curated space for architects, designers, and enthusiasts to explore the evolving world of architecture. We delve into groundbreaking projects, innovative materials, and the philosophies that shape our built environment. Our mission is to inspire and inform, fostering a deeper appreciation for the art and science of architecture.
              </p>
              <Link href="/about" passHref legacyBehavior>
                <Button variant="outline" className='bg-transparent border-gray-700 dark:border-custom-midAccent text-gray-700 dark:text-custom-midAccent hover:bg-gray-700 hover:text-white dark:hover:bg-custom-midAccent dark:hover:text-custom-dark transition-colors duration-300 text-md px-6 py-2.5'>
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </section>
        </ScrollAnimated>


        <ScrollAnimated>
          {/* Call to Action / Subscribe Section */}
          <section className=' bg-custom-stone-100/50 dark:bg-secondary/30 backdrop-blur-sm p-8 md:p-12 rounded-3xl'>
            <div className='max-w-2xl mx-auto text-center'>
              <h2 className='text-2xl sm:text-3xl font-bold text-custom-lightAccent mb-4'>
                Stay Inspired
              </h2>
              <p className='text-gray-700 dark:text-zinc-300 mb-6'>
                Subscribe to our newsletter for the latest articles, interviews, and architectural showcases delivered straight to your inbox.
              </p>
              <form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-grow p-3 rounded-md bg-custom-light/10 border border-custom-midAccent text-zinc-200 placeholder-zinc-400 focus:ring-2 focus:ring-custom-brightAccent focus:border-custom-brightAccent outline-none'
                  required
                />
                <Button type='submit' className=' hover:bg-opacity-80  text-md px-6 py-3 h-full'>
                  Subscribe <FaArrowRight className='ml-2 w-4 h-4' />
                </Button>
              </form>
            </div>
          </section>
        </ScrollAnimated>
      </div >
      {/* Decorative Abstract Shapes - Kept subtle */}
      {/* < div className='relative isolate -z-10' >
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 -top-80 transform-gpu overflow-hidden blur-3xl sm:-top-[20rem]' // Adjusted position
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-custom-midAccent to-custom-light opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]' // Reduced opacity
          />
        </div>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 top-[calc(100%-50rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-60rem)]' // Adjusted position for bottom
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-custom-brightAccent to-custom-darkAccent opacity-15 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]' // Reduced opacity
          />
        </div>
      </div > */}
      <Footer />
    </div >
  );
}





export default Landing