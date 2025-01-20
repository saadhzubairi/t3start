import React from 'react'
import { Spinner } from '../ui/spinner'
import "./misc.css"

const FullPageSpinner = ({ message }: { message: string }) => {
    return (

        <div className="flex items-center justify-center w-full h-[100vh] relative">
            {/* Background Shapes */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="relative isolate w-full h-full">
                    {/* Animated Shape 1 */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden animate-shape1 blur-3xl">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-20 aspect-[16/9] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-90 sm:left-0 sm:w-[72.1875rem]"
                        />
                    </div>

                    {/* Animated Shape 2 */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-x-0 transform-gpu overflow-hidden animate-shape2 blur-3xl">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-20 aspect-[16/9] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-90 sm:left-0 sm:w-[72.1875rem]"
                        />
                    </div>
                </div>
            </div>

            {/* Spinner */}
            <div className="absolute flex items-center justify-center w-full h-full z-10">
                <Spinner />
            </div>
        </div>

    )
}

export default FullPageSpinner