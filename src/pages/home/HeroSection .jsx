import React from "react";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <section className="min-h-screen bg-[#062117] flex items-center py-16 px-6 lg:px-12 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-[#0098cc] rounded-full opacity-10 blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#0098cc] rounded-full opacity-10 blur-3xl"></div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">

                {/* LEFT SECTION */}
                <div className="space-y-8">
                    {/* Heading */}
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-white">
                        Empower Your Career Through{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0098cc] to-[#00b8f0]">
                            Mentorship
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                        Connect with industry leaders and experienced professionals who are
                        passionate about helping you achieve your career goals.
                    </p>

                    {/* Bullet Points */}
                    <div className="space-y-3 text-gray-200">
                        <div className="flex items-center gap-3">
                            <Check className="text-[#0098cc] w-5 h-5 flex-shrink-0" />
                            <p className="text-white">1-on-1 Personalized Guidance</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Check className="text-[#0098cc] w-5 h-5 flex-shrink-0" />
                            <p className="text-white">Goal-Oriented Sessions</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <Check className="text-[#0098cc] w-5 h-5 flex-shrink-0" />
                            <p className="text-white">Global Expert Network</p>
                        </div>
                    </div>



                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 mt-8">
                        <button
                            onClick={() => navigate("/mentee/apply")}
                            className="px-8 py-4 bg-gradient-to-r from-[#0098cc] to-[#00b8f0] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
                        >
                            Find Your Mentor
                            <span className="text-xl">→</span>
                        </button>

                        <button
                            onClick={() => navigate("/mentee/apply")}
                            className="px-8 py-4 border-2 border-[#0098cc] text-[#0098cc] font-semibold rounded-full hover:bg-[#0098cc] hover:text-white transition-all duration-300"
                        >
                            Become a Mentor
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div className="flex items-center gap-4 pt-4">
                        <div className="text-gray-400 text-sm">
                            <p className="font-semibold text-white">Join 10,000+ professionals</p>
                        </div>
                    </div>
                </div>

                {/* RIGHT SIDE IMAGE */}
                <div className="flex justify-center lg:justify-end">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop&q=80"
                        alt="Professional mentorship collaboration"
                        className="rounded-2xl shadow-2xl w-full max-w-lg "
                    />
                </div>
            </div>

            <style jsx>{`
                @keyframes bounce {
                    0%, 100% {
                        transform: translateY(0px);
                    }
                    50% {
                        transform: translateY(-10px);
                    }
                }

                .animate-bounce {
                    animation: bounce 2s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default HeroSection;