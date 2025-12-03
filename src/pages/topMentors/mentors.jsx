// import React from 'react';
// import { ArrowRight, Star, Clock, Award, DollarSign } from 'lucide-react';

// export default function FindTopMentors() {
//     const mentors = [
//         {
//             image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
//             name: "Sarah Johnson",
//             title: "Senior Product Designer",
//             experience: "12 years",
//             rating: 4.9,
//             price: "$150/hour",
//             sessions: "200+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=600&fit=crop",
//             name: "Michael Chen",
//             title: "Full Stack Developer",
//             experience: "10 years",
//             rating: 4.8,
//             price: "$120/hour",
//             sessions: "180+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&h=600&fit=crop",
//             name: "Emily Rodriguez",
//             title: "UX Research Lead",
//             experience: "8 years",
//             rating: 5.0,
//             price: "$140/hour",
//             sessions: "150+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=800&h=600&fit=crop",
//             name: "David Kumar",
//             title: "Engineering Manager",
//             experience: "15 years",
//             rating: 4.9,
//             price: "$180/hour",
//             sessions: "250+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
//             name: "Lisa Thompson",
//             title: "Marketing Director",
//             experience: "11 years",
//             rating: 4.7,
//             price: "$130/hour",
//             sessions: "170+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
//             name: "James Wilson",
//             title: "Data Science Lead",
//             experience: "9 years",
//             rating: 4.8,
//             price: "$160/hour",
//             sessions: "190+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
//             name: "Sophia Martinez",
//             title: "Brand Strategist",
//             experience: "7 years",
//             rating: 4.9,
//             price: "$110/hour",
//             sessions: "140+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop",
//             name: "Ryan Patterson",
//             title: "Startup Founder & CEO",
//             experience: "13 years",
//             rating: 5.0,
//             price: "$200/hour",
//             sessions: "220+ sessions"
//         },
//         {
//             image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800&h=600&fit=crop",
//             name: "Alexandra Lee",
//             title: "Career Coach",
//             experience: "10 years",
//             rating: 4.8,
//             price: "$125/hour",
//             sessions: "300+ sessions"
//         }
//     ];

//     return (
//         <div className="min-h-screen" style={{ backgroundColor: '#062117' }}>
//             {/* Hero Section - 100vh */}
//             <div className="relative h-screen flex items-center justify-center overflow-hidden">
//                 <div
//                     className="absolute inset-0 bg-cover bg-center"
//                     style={{
//                         backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop)',
//                     }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

//                 <div className="relative z-10 text-center px-6 max-w-5xl">
//                     <div className="mb-8">
//                         <span
//                             className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-6"
//                             style={{ backgroundColor: '#0098cc' }}
//                         >
//                             Top Rated Mentors
//                         </span>
//                     </div>
//                     <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
//                         Connect with the World's Greatest Mentors
//                     </h1>
//                     <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
//                         Find experienced professionals ready to guide you. Browse mentors by expertise,
//                         experience, and pricing to accelerate your career growth.
//                     </p>
//                     <button
//                         className="px-10 py-4 rounded-lg text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3"
//                         style={{ backgroundColor: '#0098cc' }}
//                     >
//                         Browse All Mentors
//                         <ArrowRight className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             {/* Mentors Grid Section */}
//             <div className="px-6 py-20">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="text-center mb-16">
//                         <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
//                             Find Your Perfect Mentor
//                         </h2>
//                         <p className="text-xl text-gray-400 max-w-2xl mx-auto">
//                             Browse our top-rated mentors with verified experience and transparent pricing
//                         </p>
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
//                         {mentors.map((mentor, index) => (
//                             <div
//                                 key={index}
//                                 className="group relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
//                             >
//                                 <div className="relative h-64 overflow-hidden">
//                                     <img
//                                         src={mentor.image}
//                                         alt={mentor.name}
//                                         className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                                     />
//                                     <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1">
//                                         <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                                         <span className="text-white font-semibold text-sm">{mentor.rating}</span>
//                                     </div>
//                                 </div>

//                                 <div className="p-6">
//                                     <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-opacity-80 transition-colors">
//                                         {mentor.name}
//                                     </h3>
//                                     <p className="text-gray-400 mb-4">{mentor.title}</p>

//                                     <div className="space-y-3 mb-5">
//                                         <div className="flex items-center gap-2 text-sm text-gray-300">
//                                             <Award className="w-4 h-4" style={{ color: '#0098cc' }} />
//                                             <span>{mentor.experience} experience</span>
//                                         </div>
//                                         <div className="flex items-center gap-2 text-sm text-gray-300">
//                                             <Clock className="w-4 h-4" style={{ color: '#0098cc' }} />
//                                             <span>{mentor.sessions}</span>
//                                         </div>
//                                         <div className="flex items-center gap-2 text-sm font-semibold text-white">
//                                             <DollarSign className="w-4 h-4" style={{ color: '#0098cc' }} />
//                                             <span>{mentor.price}</span>
//                                         </div>
//                                     </div>

//                                     <button
//                                         className="w-full py-3 rounded-lg text-white font-semibold transition-all hover:shadow-lg"
//                                         style={{ backgroundColor: '#0098cc' }}
//                                     >
//                                         Book Session
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     {/* View All Button */}
//                     <div className="flex justify-center">
//                         <button
//                             className="px-12 py-4 rounded-lg text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-xl inline-flex items-center gap-3"
//                             style={{ backgroundColor: '#0098cc' }}
//                         >
//                             View All Mentors
//                             <ArrowRight className="w-5 h-5" />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award } from 'lucide-react';
import MentorshipLanding from './MentorMentee';
import MentorMenteePlatform from './MentorMentee';
import BecomeMentorHero from '../BecomeMentor/becomeMentor';
import MentorMenteeHero from '../BecomeMentor/MentorMenteeHero';

export default function FindTopMentors() {
    const navigate = useNavigate();

    const mentors = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
            name: "Robert Fox",
            title: "Web Designer",
            experience: "12 years",
            rating: 4.9,
            price: "$150/hour",
            sessions: "200+ sessions",
            bio: "Experienced web designer specializing in modern UI/UX patterns and responsive design.",
            skills: ["UI Design", "Figma", "Responsive Design", "Prototyping"]
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
            name: "Dianne Russell",
            title: "Marketing Coordinator",
            experience: "10 years",
            rating: 4.8,
            price: "$120/hour",
            sessions: "180+ sessions",
            bio: "Marketing expert with a focus on digital strategies and brand development.",
            skills: ["Digital Marketing", "SEO", "Brand Strategy", "Content Marketing"]
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
            name: "Jenny Wilson",
            title: "UI/UX Designer",
            experience: "8 years",
            rating: 5.0,
            price: "$140/hour",
            sessions: "150+ sessions",
            bio: "Passionate about creating user-centered designs that solve real problems.",
            skills: ["User Research", "Wireframing", "UI Design", "User Testing"]
        },
        {
            id: 4,
            image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
            name: "Albert Flores",
            title: "Project Manager",
            experience: "15 years",
            rating: 4.9,
            price: "$180/hour",
            sessions: "250+ sessions",
            bio: "Certified PMP with expertise in agile methodologies and team leadership.",
            skills: ["Agile", "Scrum", "Team Management", "Strategic Planning"]
        },
        {
            id: 5,
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
            name: "Ronald Richards",
            title: "Product Designer",
            experience: "11 years",
            rating: 4.7,
            price: "$130/hour",
            sessions: "170+ sessions",
            bio: "Product designer focused on creating innovative solutions for complex problems.",
            skills: ["Product Strategy", "Design Systems", "User Research", "Prototyping"]
        },
        {
            id: 6,
            image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
            name: "Jerome Bell",
            title: "Development Lead",
            experience: "9 years",
            rating: 4.8,
            price: "$160/hour",
            sessions: "190+ sessions",
            bio: "Full-stack developer with expertise in modern web technologies and architecture.",
            skills: ["React", "Node.js", "Cloud Architecture", "DevOps"]
        },
        {
            id: 7,
            image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
            name: "Darrell Steward",
            title: "Business Development",
            experience: "7 years",
            rating: 4.9,
            price: "$110/hour",
            sessions: "140+ sessions",
            bio: "Business development specialist helping companies scale and grow.",
            skills: ["Sales Strategy", "Partnerships", "Market Analysis", "Growth Hacking"]
        },
        {
            id: 8,
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop",
            name: "Ronald Richards",
            title: "Business Development",
            experience: "13 years",
            rating: 5.0,
            price: "$200/hour",
            sessions: "220+ sessions",
            bio: "Senior business strategist with a track record of successful ventures.",
            skills: ["Business Strategy", "Startup Consulting", "Fundraising", "Market Entry"]
        }
    ];

    const handleMentorClick = (mentor) => {
        navigate(`/mentor/${mentor.id}`, { state: { mentor } });
    };

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#062117' }}>
            {/* Hero Section - 100vh */}
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop)',
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />

                <div className="relative z-10 text-center px-6 max-w-5xl">
                    <div className="mb-8">
                        <span
                            className="inline-block px-4 py-2 rounded-full text-sm font-semibold text-white mb-6"
                            style={{ backgroundColor: '#0098cc' }}
                        >
                            Top Rated Mentors
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        Connect with the World's Greatest Mentors
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Find experienced professionals ready to guide you. Browse mentors by expertise,
                        experience, and pricing to accelerate your career growth.
                    </p>
                    <button
                        className="px-10 py-4 rounded-lg text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl inline-flex items-center gap-3"
                        style={{ backgroundColor: '#0098cc' }}
                    >
                        Browse All Mentors
                        <Award className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Mentors Grid Section */}
            <div className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Our Expert Mentors
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Connect with industry professionals ready to guide your journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {mentors.map((mentor) => (
                            <div
                                key={mentor.id}
                                onClick={() => handleMentorClick(mentor)}
                                className="group relative bg-gray-100 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl"
                            >
                                <div className="relative h-72 overflow-hidden bg-gray-200">
                                    <img
                                        src={mentor.image}
                                        alt={mentor.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />

                                    {/* Award Badge */}
                                    <div
                                        className="absolute bottom-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                                        style={{ backgroundColor: '#0098cc' }}
                                    >
                                        <Award className="w-5 h-5 text-white" />
                                    </div>
                                </div>

                                <div className="p-5 bg-white">
                                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                                        {mentor.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {mentor.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <MentorMenteePlatform />
            <BecomeMentorHero />
     
        </div>

        
    );
}








