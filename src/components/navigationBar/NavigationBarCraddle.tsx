import React from 'react'
import { NavigationBar } from './NavigationBar'
import Link from 'next/link'


const NavigationBarCraddle = () => {
    return (
        <div className="flex justify-center items-center w-full fixed  z-50 p-4">
            <div className="w-[80%] p-6 backdrop-blur-lg h-16 rounded-full bg-white/60 drop-shadow-md flex items-center justify-between flex-row ">
                <Link href="/" className="font-light">Harmony</Link>
                <NavigationBar />
            </div>
        </div>
    )
}

export default NavigationBarCraddle