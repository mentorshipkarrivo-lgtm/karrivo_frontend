
// import React from 'react';

// export default function MentoHero() {
//   return (
//     <div className="w-full min-h-screen" style={{ backgroundColor: '#062117' }}>

//       {/* ── MENTEE SECTION: Image Left, Text Right ── */}
//       <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6 sm:px-12 lg:px-20 py-20">

//         {/* Left: Image — no shadow, no border, no glow */}
//         <div className="flex-1 max-w-xl w-full">
//           <div className="rounded-2xl overflow-hidden">
//             <img
//               src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
//               alt="Mentees collaborating"
//               className="w-full h-72 sm:h-80 lg:h-96 object-cover"
//             />
//           </div>

//         </div>

//         {/* Right: Text */}
//         <div className="flex-1 max-w-xl">

//           <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
//             Accelerate Your <br />
//             <span style={{ color: '#0098cc' }}>Growth</span>
//           </h1>

//           <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-5 max-w-md">
//             Connect with industry experts who are ready to guide you through challenges, unlock new skills, and help you reach your career goals faster.
//           </p>

//           <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
//             With personalized mentorship, curated learning paths and a thriving community, you'll gain the confidence and knowledge to stand out in your field.
//           </p>

//           {/* Feature pills */}
//           <div className="flex flex-wrap gap-3 mb-10">
//             {['1-on-1 Sessions', 'Career Roadmaps', 'Peer Community', 'Live Workshops'].map(tag => (
//               <span
//                 key={tag}
//                 className="text-xs font-medium px-4 py-2 rounded-full border"
//                 style={{
//                   color: '#0098cc',
//                   borderColor: 'rgba(0,152,204,0.4)',
//                   backgroundColor: 'rgba(0,152,204,0.08)',
//                 }}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>

//         </div>
//       </div>

//     </div>
//   );
// }



import React from 'react';

export default function MentoHero() {
  return (
    <div className="w-full min-h-screen" style={{ backgroundColor: '#ffffff' }}>

      {/* ── MENTEE SECTION: Image Left, Text Right ── */}
      <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12 px-6 sm:px-12 lg:px-20 py-20">

        {/* Left: Image */}
        <div className="flex-1 max-w-xl w-full">
          <div className="rounded-2xl overflow-hidden" style={{ border: '2px solid #e0f4fc' }}>
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop"
              alt="Mentees collaborating"
              className="w-full h-72 sm:h-80 lg:h-96 object-cover"
            />
          </div>
        </div>

        {/* Right: Text */}
        <div className="flex-1 max-w-xl">

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6" style={{ color: '#0a1a22' }}>
            Accelerate Your <br />
            <span style={{ color: '#0098cc' }}>Growth</span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed mb-5 max-w-md" style={{ color: '#4b5563' }}>
            Connect with industry experts who are ready to guide you through challenges, unlock new skills, and help you reach your career goals faster.
          </p>

          <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-md" style={{ color: '#4b5563' }}>
            With personalized mentorship, curated learning paths and a thriving community, you'll gain the confidence and knowledge to stand out in your field.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mb-10">
            {['1-on-1 Sessions', 'Career Roadmaps', 'Peer Community', 'Live Workshops'].map(tag => (
              <span
                key={tag}
                className="text-xs font-medium px-4 py-2 rounded-full border"
                style={{
                  color: '#0098cc',
                  borderColor: '#0098cc',
                  backgroundColor: '#f0faff',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>

    </div>
  );
}
