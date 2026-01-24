import React from "react";
// import loaderImage from "../../assets/jcoin.webp";




/**
 * Loader Component
 * A visually appealing loader with a pulsing image and a spinning border, styled entirely with in-built Tailwind CSS utilities.
 * Uses Tailwind's default 'animate-spin' and 'animate-pulse'.
 * @return {JSX.Element}
 */
const Loader = () => {
    return (
        <div
            className="fixed inset-0 flex flex-col items-center justify-center
                 bg-gray-950 bg-opacity-90 z-[1000] p-4 text-white
                 font-sans"
        >
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* The Spinner Element using Tailwind's default animate-spin */}
                <div
                    className="absolute inset-0 rounded-full
                     border-4 border-solid border-teal-400 border-opacity-70
                     border-r-transparent border-b-transparent
                     animate-spin" // Using Tailwind's default animate-spin
                ></div>
                {/* The inner part of the spinner to create a more distinct "ring" look */}
                <div
                    className="absolute inset-1 rounded-full
                     border-4 border-solid border-gray-800 border-opacity-50"
                ></div>

                {/* The Image */}
                <img
                    src="https://play-lh.googleusercontent.com/FVTyFQLnL0J7laKUxApE6fZVnubfCNyS3Ge_Qb76BTQGTpWajnXsfGYW7woJw3gFJJoDmXvrBsWj-EjVGm91RA=w240-h480-rw"
                    alt="Loading JCoin"
                    className="w-24 h-24 rounded-full object-cover animate-pulse" // Using Tailwind's default animate-pulse
                    loading="lazy"
                />
            </div>

            <p className="mt-8 text-lg tracking-wide opacity-80">
                Loading...
            </p>
        </div>
    );
};

export default Loader;
