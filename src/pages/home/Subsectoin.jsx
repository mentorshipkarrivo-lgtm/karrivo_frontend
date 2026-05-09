import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Search, CalendarCheck, TrendingUp } from "lucide-react";

const points = [
    {
        icon: Search,
        title: "Discover top mentors",
        desc: "Explore highly experienced mentors from different industries and find the right guidance for your personal and professional journey.",
        num: "01",
    },
    {
        icon: CalendarCheck,
        title: "Schedule personalized sessions",
        desc: "Book one-on-one mentorship sessions, get expert advice, and receive practical strategies tailored to your career goals.",
        num: "02",
    },
    {
        icon: TrendingUp,
        title: "Achieve faster growth",
        desc: "Build strong mentor relationships, gain real-world insights, and accelerate your success with continuous support and learning.",
        num: "03",
    },
];

const MentorConnect = () => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [active, setActive] = useState(-1);

    useEffect(() => {
        if (!inView) return;
        points.forEach((_, i) => {
            setTimeout(() => setActive(i), 500 + i * 700);
        });
    }, [inView]);

    const mentorLink = "https://www.karrivo.com/";

    return (
        <section id="mentorship" className="py-14 relative overflow-hidden bg-white">

            {/* desktop-only angled slab */}
            <div
                className="hidden lg:block absolute inset-y-0 right-0 w-[58%] bg-[#f5f5f0] pointer-events-none"
                style={{ clipPath: "polygon(24% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            />

            <div className="max-w-7xl mx-auto px-5 relative">
                <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center justify-between min-h-[520px]">

                    {/* LEFT */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="text-center lg:text-left"
                    >

                        <h2 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold text-[#1a1a2e] leading-[1.1] tracking-tight mb-7">
                            Empower Your Growth With{" "}
                            <span className="text-[#00a6df]">Expert Mentorship</span>
                        </h2>

                        <p className="text-[#1a1a2e]/70 text-sm sm:text-base leading-relaxed mb-3 sm:mb-5">
                            Connect with industry professionals who can guide your career,
                            improve your skills, and help you make smarter decisions for your future.
                        </p>

                        <p className="text-[#1a1a2e]/70 text-sm sm:text-base leading-relaxed mb-3 sm:mb-5">
                            Learn directly from{" "}
                            <span className="font-semibold text-[#00a6df] hover:text-[#1a1a2e] transition-colors duration-300">
                                <a href={mentorLink} target="_blank" rel="noopener noreferrer">
                                    trusted mentors
                                </a>
                            </span>{" "}
                            who provide real-world knowledge, practical advice, and personalized
                            support for every stage of your journey.
                        </p>

                        <p className="text-[#1a1a2e]/70 text-sm sm:text-base leading-relaxed">
                            Whether you're a student, working professional, or entrepreneur,
                            this platform helps you grow faster with meaningful mentorship and
                            continuous learning opportunities.
                        </p>
                    </motion.div>

                    {/* RIGHT: vertical stepper */}
                    <div
                        ref={ref}
                        className="flex flex-col lg:pl-6 max-w-md mx-auto w-full lg:max-w-none lg:mx-0"
                    >
                        {points.map(({ icon: Icon, title, desc }, i) => {
                            const isActive = active >= i;
                            const isLast = i === points.length - 1;

                            return (
                                <div key={title} className="flex gap-0 items-stretch">

                                    {/* connector column */}
                                    <div className="flex flex-col items-center w-14 flex-shrink-0">

                                        {/* icon circle */}
                                        <div className="relative w-12 h-12 flex-shrink-0">
                                            <div className="absolute inset-0 rounded-full border-2 border-[#00a6df]" />
                                            <motion.div
                                                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00a6df] to-[#1a1a2e]"
                                                initial={{ scale: 0 }}
                                                animate={isActive ? { scale: 1 } : { scale: 0 }}
                                                transition={{
                                                    duration: 0.45,
                                                    ease: [0.34, 1.56, 0.64, 1],
                                                }}
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <Icon
                                                    className="w-5 h-5 transition-colors duration-300"
                                                    style={{
                                                        color: isActive
                                                            ? "#ffffff"
                                                            : "#00a6df",
                                                    }}
                                                    strokeWidth={1.75}
                                                />
                                            </div>
                                        </div>

                                        {/* line */}
                                        {!isLast && (
                                            <div className="relative w-px flex-1 my-1 bg-[#00a6df]/15 overflow-hidden min-h-[48px]">
                                                <motion.div
                                                    className="absolute top-0 left-0 w-full bg-gradient-to-b from-[#00a6df] to-[#1a1a2e]"
                                                    initial={{ height: "0%" }}
                                                    animate={
                                                        active >= i + 1
                                                            ? { height: "100%" }
                                                            : { height: "0%" }
                                                    }
                                                    transition={{
                                                        duration: 0.5,
                                                        delay: 0.2,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* content */}
                                    <motion.div
                                        className="pb-10 pt-1 flex-1 min-w-0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={
                                            isActive
                                                ? { opacity: 1, x: 0 }
                                                : { opacity: 0, x: 20 }
                                        }
                                        transition={{
                                            duration: 0.45,
                                            delay: 0.15,
                                            ease: "easeOut",
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-1.5 pl-5">
                                            <p className="text-[#1a1a2e] font-semibold text-sm sm:text-[15px] leading-snug">
                                                {title}
                                            </p>
                                        </div>

                                        <p className="text-[#1a1a2e]/60 text-xs sm:text-sm leading-relaxed pl-5">
                                            {desc}
                                        </p>
                                    </motion.div>

                                </div>
                            );
                        })}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MentorConnect;