// import React from 'react';
// import { Star } from 'lucide-react';

// export default function MentorCard({ mentor }) {
//   return (
//     <div className="bg-gradient-to-br from-[#2d5a5a] to-[#1a3d3d] rounded-3xl p-6 max-w-md hover:scale-105 transition-all duration-300 hover:shadow-2xl">
//       {/* Profile Image */}
//       <div className="relative mb-6">
//         <div className="relative overflow-hidden rounded-2xl">
//           <img
//             src={mentor.image}
//             alt={mentor.name}
//             className="w-full aspect-[4/3] object-cover"
//           />
//           {/* Rating Badge */}
//           <div className="absolute bottom-4 right-4 bg-gradient-to-r from-[#4db8a8] to-[#5ac8d8] rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
//             <Star className="w-4 h-4 text-white fill-white" />
//             <span className="text-white font-bold text-sm">{mentor.rating}</span>
//           </div>
//         </div>
//       </div>

//       {/* Mentor Info */}
//       <div className="space-y-4">
//         <h3 className="text-3xl font-bold text-white">
//           {mentor.name}
//         </h3>
        
//         <p className="text-[#a0d4cc] text-base leading-relaxed">
//           {mentor.role}
//         </p>

//         {/* Skills Tags */}
//         <div className="flex flex-wrap gap-2 pt-2">
//           {mentor.skills.map((skill, index) => (
//             <span
//               key={index}
//               className="bg-[#3d5f5f] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#4d7070] transition-colors"
//             >
//               {skill}
//             </span>
//           ))}
//         </div>

//         {/* View Profile Button */}
//         <button className="w-full bg-gradient-to-r from-[#2b7a9e] to-[#357ba8] hover:from-[#357ba8] hover:to-[#2b7a9e] text-white font-semibold py-3.5 px-6 rounded-full transition-all duration-300 hover:shadow-lg mt-6 text-base">
//           View profile
//         </button>
//       </div>
//     </div>
//   );
// }

// // Example usage with sample data
// function MentorCardShowcase() {
//   const mentors = [
//     {
//       name: 'Rick Huang',
//       role: 'Senior Software Engineer at Netflix',
//       rating: 5.0,
//       image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=450&fit=crop',
//       skills: ['Software Engineering', 'Career Development', 'Backend']
//     },
//     {
//       name: 'Ian Halter',
//       role: 'Data Science Manager at ForMotiv',
//       rating: 5.0,
//       image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=450&fit=crop',
//       skills: ['Data Science', 'Machine Learning', 'Leadership']
//     },
//     {
//       name: 'Tiziana Floruss',
//       role: 'Executive & Leadership Coach | Director of Business Operations | Certified Yoga Teacher at TravelPerk',
//       rating: 5.0,
//       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=450&fit=crop',
//       skills: ['Leadership', 'Career Coaching', 'Business Strategy']
//     }
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0a2f2f] via-[#0d3d3d] to-[#0a2f2f] p-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-white text-center mb-12">
//           Featured Mentors
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {mentors.map((mentor, index) => (
//             <MentorCard key={index} mentor={mentor} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }