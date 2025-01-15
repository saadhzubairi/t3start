import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { Button } from '../ui/button'

const Landing = () => {
    return (
        <div className='bg-gradient-to-b from-custom-lightAccent to-custom-dark pb-16 pt-28'>

            <div className='flex flex-col items-center justify-center text-center gap-4'>
                <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
                    <p className="text-sm font-semibold text-gray-700">Harmony is now live!</p>
                </div>
                <h1 className="max-w-4xl text-5xl font-bold md:text-6xl sm:text-6xl lg:text7xl">Teach without <span className="text-custom-darkAccent">limits</span> like your students deserve.</h1>
                <p className="mt-5 max-w-prose text-zinc-500 sm:text-lg">Harmony allows you to teach your students with modern generative AI-based real-time teaching aids that take your tutoring business to the next level.</p>
                <Button className='bg-custom-darkAccent' >Get started <FaArrowRight className='ml-2.5 w-5 h-5' /></Button>
            </div>

            <div>
                <div className='relative isolate'>
                    <div
                        aria-hidden='true'
                        className='pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80'>
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-custom-midAccent to-custom-light opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                        />
                    </div>
                    <div
                        aria-hidden='true'
                        className='pointer-events-none absolute -ml-1 blur-3xl -z-10 overflow-hidden sm:-top-80'>
                        <div
                            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-custom-brightAccent to-custom-darkAccent opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                        />
                    </div>

                    {/* IMAGE CONTAINER */}
                    <div>
                        <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                            <div className='mt-16 flow-root sm:mt-24'>
                                <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                                    <Image
                                        src='/LP2.webp'
                                        alt='product preview'
                                        width={1364}
                                        height={866}
                                        quality={100}
                                        className='rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        aria-hidden='true'
                        className='pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80'>
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className='relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x rotate-[30deg] bg-gradient-to-tr from-custom-mid to-custom-bright opacity-50 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]'
                        />
                    </div>
                </div>
            </div>

            <div className='mx-auto mt-32 max-w-5xl sm:mt-56'>
                <div className='mb-12 px-6 lg:px-8'>
                    <div className='mx-auto max-w-2xl sm:text-center'>
                        <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
                            Elevate your student&apos;s learning experience
                        </h2>
                        <p className='mt-4 text-lg text-gray-600'>
                            Your students deserve the best, and you deserve to give them that without the cost of you working way harder than you should
                        </p>
                    </div>
                </div>

                <div
                    aria-hidden='true'
                    className='pointer-events-none absolute inset-x-0 -top-40 -z-10 overflow-hidden blur-3xl sm:-top-80'>
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr  from-custom-midAccent to-custom-light opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
                    />
                </div>

                {/* steps */}
                <ol className='my-8 mx-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
                    <li className='md:flex-1 p-8 shadow-lg rounded-3xl bg-white '>
                        <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                            <span className='text-sm font-medium text-custom-darkAccent'>Step 1
                            </span>
                            <span className='text-xl font-semibold'> Sign up for an account
                            </span>
                            <span className='mt-2 text-zinc-700'>Either starting out with a free plan or choose our{' '}<Link href='/pricing' className='text-blue-700'> pro plan</Link>.
                            </span>
                        </div>
                    </li>
                    <li className='md:flex-1 p-8 shadow-lg rounded-3xl bg-white'>
                        <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                            <span className='text-sm font-medium  text-custom-darkAccent'>
                                Step 2
                            </span>
                            <span className='text-xl font-semibold'>
                                Set up your classes with students.
                            </span>
                            <span className='mt-2 text-zinc-700'>
                                Students will be asked to join your sessions with their own customized environment.
                            </span>
                        </div>
                    </li>
                    <li className='md:flex-1 p-8 shadow-lg rounded-3xl bg-white'>
                        <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
                            <span className='text-sm font-medium  text-custom-darkAccent'>
                                Step 3
                            </span>
                            <span className='text-xl font-semibold'>
                                Sky is the limit
                            </span>
                            <span className='mt-2 text-zinc-700'>
                                Keep track of progress, create new lesson plans, conduct classes. It&apos;s all really that simple.
                            </span>
                        </div>
                    </li>
                </ol>

                <div className='mx-auto max-w-6xl px-6 lg:px-8'>
                    <div className='mt-16 flow-root sm:mt-24'>
                        <div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4'>
                            <Image
                                src='/LP1.jpg'
                                alt='uploading preview'
                                width={1419}
                                height={732}
                                quality={100}
                                className='rounded-md bg-white shadow-2xl ring-1 ring-gray-900/10'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing