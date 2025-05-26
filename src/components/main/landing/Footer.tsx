import React from "react";

const Footer = () => {
    return (
        <div className="flex justify-center items-center bg-custom-stone-100/50 dark:bg-secondary/30 border-t-1 border border-custom-stone-100 dark:border-gray-900 h-16 gap-4 text-sm select-none cursor-pointer text-black/70 dark:text-gray-300">
            <div className="">Help</div>
            <div className="">Status</div>
            <div className="">About</div>
            <div className="">Press</div>
            <div className="">Blog</div>
            <div className="">Privacy</div>
            <div className="">Rules</div>
            <div className="">Text to speech</div>
        </div>
    );
};

export default Footer;
