import React from 'react'
import { NavigationBar } from './NavigationBar'
import Link from 'next/link'
import ViewfinderLogo from '../misc/Logo'
import { ModeToggle } from './DarkModeToggle'


const NavigationBarCraddle = () => {
    return (
        <div className="flex justify-center items-center w-full fixed  z-50 p-4">
            <div className="w-[80%] p-5 backdrop-blur-lg h-16 rounded-full bg-white/80 dark:bg-secondary/60 drop-shadow-md flex items-center justify-between flex-row ">
                <div className="ml-4">
                    <ViewfinderLogo size="1.5rem" className='mr-4' />
                    <ModeToggle />
                </div>
                <NavigationBar />
            </div>
        </div>
    )
}

export default NavigationBarCraddle