import React from 'react'
import { Spinner } from '../ui/spinner'
import "./misc.css"

const FullPageSpinner = ({ message }: { message: string }) => {
    return (
        <div className="flex items-center justify-center w-full h-[100vh] relative  ">
            {/* Background Shapes */}
            <div className="absolute inset-0 -z-10 overflow-hidden bg-custom bg-custom-lightAccent fade-in-only">
                <div className="relative isolate w-full h-full border">
                    {/* Animated Shape 1 */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none top-[25%] right-[45%] h-[25rem] w-[25rem] absolute transform-gpu overflow-hidden animate-shape1 blur-3xl">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative h-full w-full bg-gradient-to-tr from-custom-darkAccent to-custom-dark  "
                        />
                    </div>

                    {/* Animated Shape 2 */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none top-[45%] right-[0%] h-[25rem] w-[25rem] absolute transform-gpu overflow-hidden animate-shape2 blur-3xl ">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative h-full w-full bg-gradient-to-tr from-custom-bright to-custom-mid"
                        />
                    </div>

                    <div
                        aria-hidden="true"
                        className="pointer-events-none top-[15%] right-[20%] h-[25rem] w-[25rem] absolute transform-gpu overflow-hidden animate-shape2 blur-3xl ">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative h-full w-full bg-gradient-to-tr from-custom-dim to-custom-dimAccent"
                        />
                    </div>

                    <div
                        aria-hidden="true"
                        className="pointer-events-none top-[15%] right-[60%] h-[25rem] w-[25rem] absolute transform-gpu overflow-hidden animate-shape2 blur-3xl ">
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative h-full w-full bg-gradient-to-tr from-custom-bright to-custom-bright"
                        />
                    </div>
                </div>
            </div>

            {/* Spinner */}
            <div className="bg-white/50 backdrop-blur-3xl border-1  border-custom-dark/40 absolute w-48 rounded-3xl flex items-center justify-center p-10 z-10 flex-col gap-4 shadow-2xl shadow-black/15 fade-in">
                <Spinner className='text-custom-darkAccent' size={"large"} />
                <p className="text-custom-darkAccent">{message}</p>
            </div>
        </div>
    )
}

export default FullPageSpinner