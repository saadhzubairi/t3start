import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Button } from '../ui/button' // Assuming this is your custom button component

const Landing = () => {
  return (
    <div className='bg-gradient-to-b from-custom-lightAccent to-custom-darkAccent pb-16 min-h-screen flex flex-col'>
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
        <div className='relative z-10 flex flex-col items-center justify-center text-white p-6'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold max-w-3xl mb-6 shadow-sm'>
            Where Inspiration Takes Form.
          </h1>
          <p className='text-lg sm:text-xl text-zinc-300 max-w-xl mb-8'>
            Exploring the intersection of design, innovation, and the built environment.
          </p>
          <Link href="#featured-articles" passHref>
            <Button variant="outline" className='bg-transparent border-custom-lightAccent text-custom-lightAccent hover:bg-custom-lightAccent hover:text-custom-dark transition-colors duration-300 text-lg px-8 py-3'>
              Explore Articles <FaArrowRight className='ml-2.5 w-5 h-5' />
            </Button>
          </Link>
        </div>
      </div>

      {/* MAIN CONTENT SECTION */}
      <div className='flex-grow container mx-auto px-6 lg:px-8 py-16'>
        {/* Featured Articles Section */}
        <section id="featured-articles" className='mb-24'>
          <div className='max-w-3xl mx-auto text-center mb-12'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-100 mb-4'>
              Featured Insights
            </h2>
            <p className='text-lg text-zinc-400'>
              Dive into our latest explorations of architectural marvels and design philosophies.
            </p>
          </div>

          {/* Example Article Cards - Replace with dynamic content */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {/* Card 1 */}
            <div className='bg-custom-mid/30 backdrop-blur-md rounded-xl shadow-xl overflow-hidden group transform hover:scale-105 transition-transform duration-300'>
              <div className='relative h-56 w-full'>
                <Image
                  src='/LP1.jpg' // Replace with actual article image
                  alt='Modern Architecture Example'
                  layout='fill'
                  objectFit='cover'
                  className='group-hover:opacity-90 transition-opacity duration-300'
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-custom-lightAccent mb-2'>The Future of Sustainable Urbanism</h3>
                <p className='text-zinc-300 text-sm mb-4'>Discover how green initiatives are reshaping our cities for a better tomorrow.</p>
                <Link href="/articles/sustainable-urbanism" passHref>
                  <span className='text-custom-brightAccent hover:text-custom-lightAccent font-medium inline-flex items-center'>
                    Read More <FaArrowRight className='ml-2 w-4 h-4' />
                  </span>
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className='bg-custom-mid/30 backdrop-blur-md rounded-xl shadow-xl overflow-hidden group transform hover:scale-105 transition-transform duration-300'>
              <div className='relative h-56 w-full'>
                 {/* You can use a different image or a placeholder */}
                <Image
                  src='/Landing/nyc.png' // Replace with actual article image
                  alt='Interior Design Trends'
                  layout='fill'
                  objectFit='cover'
                  className='group-hover:opacity-90 transition-opacity duration-300'
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-custom-lightAccent mb-2'>Minimalism in Residential Design</h3>
                <p className='text-zinc-300 text-sm mb-4'>Exploring the elegance and functionality of minimalist homes.</p>
                <Link href="/articles/minimalist-design" passHref>
                  <span className='text-custom-brightAccent hover:text-custom-lightAccent font-medium inline-flex items-center'>
                    Read More <FaArrowRight className='ml-2 w-4 h-4' />
                  </span>
                </Link>
              </div>
            </div>

            {/* Card 3 */}
             <div className='bg-custom-mid/30 backdrop-blur-md rounded-xl shadow-xl overflow-hidden group transform hover:scale-105 transition-transform duration-300'>
              <div className='relative h-56 w-full'>
                 {/* You can use a different image or a placeholder */}
                <Image
                  src='/LP1.jpg' // Replace with actual article image
                  alt='Historic Preservation'
                  layout='fill'
                  objectFit='cover'
                  className='group-hover:opacity-90 transition-opacity duration-300'
                />
              </div>
              <div className='p-6'>
                <h3 className='text-xl font-semibold text-custom-lightAccent mb-2'>Reviving History: The Art of Architectural Preservation</h3>
                <p className='text-zinc-300 text-sm mb-4'>How modern techniques are saving and celebrating our architectural heritage.</p>
                <Link href="/articles/historic-preservation" passHref>
                  <span className='text-custom-brightAccent hover:text-custom-lightAccent font-medium inline-flex items-center'>
                    Read More <FaArrowRight className='ml-2 w-4 h-4' />
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section - Optional */}
        <section className='mb-24'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='text-3xl sm:text-4xl font-bold text-gray-100 mb-4'>
              About Harmony Arch
            </h2>
            <p className='text-lg text-zinc-400 mb-6'>
              Harmony Arch is a curated space for architects, designers, and enthusiasts to explore the evolving world of architecture. We delve into groundbreaking projects, innovative materials, and the philosophies that shape our built environment. Our mission is to inspire and inform, fostering a deeper appreciation for the art and science of architecture.
            </p>
             <Link href="/about" passHref>
                <Button variant="outline" className='bg-transparent border-custom-midAccent text-custom-midAccent hover:bg-custom-midAccent hover:text-custom-dark transition-colors duration-300 text-md px-6 py-2.5'>
                    Learn More About Us
                </Button>
            </Link>
          </div>
        </section>

        {/* Call to Action / Subscribe Section */}
        <section className='bg-custom-mid/20 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-lg'>
          <div className='max-w-2xl mx-auto text-center'>
            <h2 className='text-2xl sm:text-3xl font-bold text-custom-lightAccent mb-4'>
              Stay Inspired
            </h2>
            <p className='text-zinc-300 mb-6'>
              Subscribe to our newsletter for the latest articles, interviews, and architectural showcases delivered straight to your inbox.
            </p>
            <form className='flex flex-col sm:flex-row gap-4 max-w-md mx-auto'>
              <input
                type='email'
                placeholder='Enter your email'
                className='flex-grow p-3 rounded-md bg-custom-light/10 border border-custom-midAccent text-zinc-200 placeholder-zinc-400 focus:ring-2 focus:ring-custom-brightAccent focus:border-custom-brightAccent outline-none'
                required
              />
              <Button type='submit' className='bg-custom-darkAccent hover:bg-opacity-80 text-white text-md px-6 py-3'>
                Subscribe <FaArrowRight className='ml-2 w-4 h-4' />
              </Button>
            </form>
          </div>
        </section>
      </div>

        {/* Decorative Abstract Shapes - Kept subtle */}
        <div className='relative isolate -z-10'>
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
        </div>

    </div>
  )
}

export default Landing