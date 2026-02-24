import React, { useState } from 'react';
import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Flame, Zap, Eye, Clock } from 'lucide-react';

const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

const topPosts = [
  'What Makes Jaimax Coins the Future of Crypto?',
  'Top 5 Wallets to Store Your Jaimax Safely',
  'Jaimax Tokenomics Explained in Simple Terms',
  'How to Stake and Earn Jaimax Coins Easily',
  'Latest Updates on Jaimax Coin Partnerships'
];

const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

const allPosts = [
  {
    image: defaultImage,
    category: 'Crypto News',
    date: 'June 6, 2025',
    title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
    excerpt: 'Jaimax reaches an all-time high value with huge community support and institutional backing driving unprecedented growth.',
    trending: true,
    views: '12.5K',
    readTime: '3'
  },
  {
    image: defaultImage,
    category: 'Wallets',
    date: 'June 4, 2025',
    title: 'Top secure wallets to store your Jaimax Coins',
    excerpt: 'Explore the most trusted and secure wallet solutions specifically designed for Jaimax cryptocurrency storage.',
    featured: true,
    views: '8.2K',
    readTime: '5'
  },
  {
    image: defaultImage,
    category: 'Market Trends',
    date: 'June 2, 2025',
    title: 'Jaimax outpaces other altcoins in 2025 market surge',
    excerpt: 'Comprehensive analysis shows Jaimax leading the altcoin rally with superior performance metrics.',
    views: '15.7K',
    readTime: '4'
  },
  {
    image: defaultImage,
    category: 'DeFi',
    date: 'June 1, 2025',
    title: 'Integrating Jaimax with DeFi projects for better yield',
    excerpt: 'Revolutionary DeFi integration strategies that maximize yield potential through Jaimax ecosystem.',
    views: '9.4K',
    readTime: '6'
  },
  {
    image: defaultImage,
    category: 'NFTs',
    date: 'May 28, 2025',
    title: 'NFT creators embrace Jaimax for seamless transactions',
    excerpt: 'How Jaimax is transforming the NFT landscape with faster, cheaper, and more efficient transactions.',
    hot: true,
    views: '11.1K',
    readTime: '4'
  },
  {
    image: defaultImage,
    category: 'Blockchain',
    date: 'May 25, 2025',
    title: 'Jaimax blockchain architecture deep dive analysis',
    excerpt: 'Technical breakdown of Jaimax innovative blockchain infrastructure and scalability solutions.',
    views: '7.8K',
    readTime: '8'
  }
];

const BlogLayout = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredPost, setHoveredPost] = useState(null);

  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div 
      className="min-h-screen  px-12 py-8"
      style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
    >
      <div className="w-full mx-0">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar - Cohesive Teal/Cyan Theme */}
          <aside className="lg:col-span-1 space-y-6">
            
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search insights..."
                    className="w-full bg-transparent text-cyan-100 placeholder-cyan-300/60 focus:outline-none text-sm"
                  />
                  <Search className="absolute right-0 top-0 text-cyan-400 w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-cyan-100 text-sm">Categories</h3>
                </div>
                <div className="space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                        activeCategory === cat
                          ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-100 shadow-lg border border-cyan-400/40'
                          : 'text-cyan-300/70 hover:text-cyan-200 hover:bg-cyan-500/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Posts */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-teal-950/80 to-cyan-950/70 backdrop-blur-xl rounded-2xl border border-teal-400/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="w-4 h-4 text-teal-400" />
                  <h3 className="font-semibold text-teal-100 text-sm">Trending</h3>
                </div>
                <div className="space-y-3">
                  {topPosts.slice(0, 4).map((post, i) => (
                    <div key={i} className="flex items-start gap-3 group/item cursor-pointer">
                      <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-full flex items-center justify-center border border-teal-400/40">
                        <span className="text-xs font-bold text-teal-200">{i + 1}</span>
                      </div>
                      <p className="text-xs text-teal-200/80 group-hover/item:text-teal-100 transition-colors line-clamp-2 leading-relaxed">
                        {post}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Community */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative bg-gradient-to-br from-cyan-950/80 to-teal-950/70 backdrop-blur-xl rounded-2xl border border-cyan-400/30 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-semibold text-cyan-100 text-sm">Community</h3>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[...Array(6)].map((_, idx) => (
                    <div key={idx} className="aspect-square rounded-lg overflow-hidden border border-cyan-400/25 hover:border-cyan-300/50 transition-all duration-300 group/img">
                      <img
                        src={defaultImage}
                        alt={`community ${idx + 1}`}
                        className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content - Matching Teal/Cyan Theme */}
          <main className="lg:col-span-3">
            
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center  justify-between">
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 mb-2">
                    Crypto Insights
                  </h1>
                  <p className="text-cyan-200/70 text-sm">Latest news and analysis from the blockchain world</p>
                </div>
                <div className="text-right">
                  <p className="text-teal-300/80 text-sm">{filteredPosts.length} articles</p>
                  <p className="text-teal-400/60 text-xs">Updated daily</p>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2   xl:grid-cols-3 gap-8 w-full">
              {filteredPosts.map((post, idx) => (
                <article
                  key={idx}
                  className="group relative h-full w-full "
                  onMouseEnter={() => setHoveredPost(idx)}
                  onMouseLeave={() => setHoveredPost(null)}
                >
                  {/* Glow Effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                  
                  {/* Card */}
                  <div className="relative h-full p-2 bg-gradient-to-br from-slate-900/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-cyan-400/20 group-hover:border-cyan-400/40 overflow-hidden transition-all duration-500 flex flex-col">
                    
                    {/* Image */}
                    <div className="relative aspect-video overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      
                      {/* Badges - All using Teal/Cyan variations */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {post.trending && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-500/90 to-cyan-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
                            <TrendingUp className="w-3 h-3" />
                            Trending
                          </span>
                        )}
                        {post.featured && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-cyan-500/90 to-teal-500/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-cyan-400/50">
                            <Star className="w-3 h-3" />
                            Featured
                          </span>
                        )}
                        {post.hot && (
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-teal-600/90 to-cyan-600/90 backdrop-blur-sm rounded-full text-xs font-medium text-white border border-teal-400/50">
                            <Flame className="w-3 h-3" />
                            Hot
                          </span>
                        )}
                      </div>

                      {/* Views */}
                      <div className="absolute top-3 right-3">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-cyan-200">
                          <Eye className="w-3 h-3" />
                          {post.views}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-500/15 to-teal-500/15 backdrop-blur-sm rounded-full text-xs font-medium text-cyan-300 border border-cyan-400/25">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1 text-xs text-teal-400/80">
                          <Calendar className="w-3 h-3" />
                          {post.date}
                        </div>
                      </div>
                      
                      {/* Title */}
                      <h3 className="font-bold text-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-teal-300 transition-all duration-300 mb-3 line-clamp-2 flex-grow">
                        {post.title}
                      </h3>
                      
                      {/* Excerpt */}
                      <p className="text-sm text-gray-300 group-hover:text-cyan-100/90 line-clamp-3 mb-4 flex-grow transition-colors duration-300">
                        {post.excerpt}
                      </p>
                      
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-3 border-t border-cyan-700/30 mt-auto">
                        <button className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-all duration-300 group-hover:translate-x-1">
                          Read More 
                          <ArrowRight className="w-4 h-4" />
                        </button>
                        
                        <div className="inline-flex items-center gap-1 text-xs text-teal-400/70">
                          <Clock className="w-3 h-3" />
                          {post.readTime} min read
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Load More */}
            <div className="mt-12 text-center">
              <button className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-300"></div>
                <div className="relative px-8 py-4 bg-gradient-to-r from-cyan-600/25 to-teal-600/25 backdrop-blur-xl rounded-xl border border-cyan-400/40 text-cyan-100 font-semibold transition-all duration-300 hover:scale-105">
                  Load More Articles
                </div>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogLayout;

// import React, { useState } from 'react';
// import { Search, TrendingUp, Star, Users, Calendar, ArrowRight, Flame, Zap } from 'lucide-react';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support.',
//     trending: true,
//     views: '12.5K'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted wallets for Jaimax users.',
//     featured: true,
//     views: '8.2K'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Altcoins are booming but Jaimax leads the rally.',
//     views: '15.7K'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Learn how Jaimax supports new generation DeFi apps.',
//     views: '9.4K'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'Faster, cheaper, and smarter NFT minting using Jaimax.',
//     hot: true,
//     views: '11.1K'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [hoveredPost, setHoveredPost] = useState(null);

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div 
//       className="flex flex-col lg:flex-row gap-8 px-6 py-12 min-h-screen"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       {/* Sidebar */}
//       <aside className="lg:w-1/4 w-full space-y-8 transform transition-all duration-700 hover:scale-[1.02]">
//         {/* Search Bar */}
//         <div className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-slate-900/60 to-gray-900/40 backdrop-blur-xl rounded-xl border border-violet-400/30 overflow-hidden">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Search crypto insights..."
//               aria-label="Search crypto blog"
//               className="w-full p-4 pl-12 bg-transparent text-white placeholder-violet-200/70 focus:outline-none transition-all duration-300"
//             />
//             <Search className="absolute left-4 top-4 text-violet-400 w-5 h-5 group-focus-within:text-violet-300 transition-colors" />
//             <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//           </div>
//         </div>

//         {/* Categories */}
//         <nav aria-label="Categories" className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-emerald-900/40 to-teal-900/30 backdrop-blur-xl rounded-xl border border-emerald-400/30 p-6 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
//             <div className="flex items-center gap-2 mb-4">
//               <TrendingUp className="w-5 h-5 text-emerald-400" />
//               <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-teal-300">
//                 Categories
//               </h2>
//             </div>
//             <ul className="space-y-2">
//               {categories.map((cat) => (
//                 <li
//                   key={cat}
//                   tabIndex={0}
//                   className={`relative overflow-hidden rounded-lg px-4 py-3 cursor-pointer transition-all duration-300 group/item ${
//                     activeCategory === cat 
//                       ? 'bg-gradient-to-r from-emerald-500/30 to-teal-500/30 text-emerald-200 font-semibold shadow-lg border border-emerald-400/40' 
//                       : 'text-gray-300 hover:text-emerald-200 hover:bg-emerald-500/10'
//                   }`}
//                   onClick={() => setActiveCategory(cat)}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') setActiveCategory(cat);
//                   }}
//                 >
//                   <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 to-teal-400/10 opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
//                   <span className="relative z-10">{cat}</span>
//                   {activeCategory === cat && (
//                     <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
//                       <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
//                     </div>
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </nav>

//         {/* Top Posts */}
//         <nav aria-label="Top Posts" className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-amber-600/20 to-orange-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-amber-900/40 to-orange-900/30 backdrop-blur-xl rounded-xl border border-amber-400/30 p-6 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
//             <div className="flex items-center gap-2 mb-4">
//               <Flame className="w-5 h-5 text-amber-400" />
//               <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
//                 Trending Now
//               </h2>
//             </div>
//             <ul className="space-y-3">
//               {topPosts.map((post, i) => (
//                 <li
//                   key={i}
//                   tabIndex={0}
//                   className="group/post flex items-start gap-3 hover:bg-amber-500/10 rounded-lg p-3 cursor-pointer transition-all duration-300"
//                   onClick={() => {}}
//                   onKeyDown={(e) => {
//                     if (e.key === 'Enter') {};
//                   }}
//                 >
//                   <div className="relative">
//                     <span className="text-lg font-bold text-amber-300 bg-gradient-to-br from-amber-500/30 to-orange-500/30 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-lg border border-amber-400/40">
//                       {i + 1}
//                     </span>
//                     {i < 3 && (
//                       <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-200 group-hover/post:text-amber-200 transition-colors line-clamp-2 flex-1">
//                     {post}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </nav>

//         {/* Jaimax Socials */}
//         <div className="relative group">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//           <div className="relative bg-gradient-to-br from-blue-900/40 to-indigo-900/30 backdrop-blur-xl rounded-xl border border-blue-400/30 p-6 overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-400"></div>
//             <div className="flex items-center gap-2 mb-4">
//               <Users className="w-5 h-5 text-blue-400" />
//               <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300">
//                 Community Hub
//               </h2>
//             </div>
//             <div className="grid grid-cols-3 gap-3">
//               {[...Array(9)].map((_, idx) => (
//                 <div key={idx} className="relative group/img overflow-hidden rounded-lg">
//                   <img
//                     src={defaultImage}
//                     alt={`jaimax social ${idx + 1}`}
//                     className="w-full aspect-square object-cover border border-blue-300/30 group-hover/img:border-blue-400/60 transition-all duration-300 group-hover/img:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"></div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Posts Grid */}
//       <main className="lg:w-3/4 w-full">
//         <div className="mb-6 flex items-center justify-between">
//           <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
//             Latest Insights
//           </h1>
//           <div className="flex items-center gap-2 text-gray-400">
//             <span className="text-sm">{filteredPosts.length} articles</span>
//           </div>
//         </div>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {filteredPosts.map((post, idx) => (
//             <article
//               key={idx}
//               className="group relative rounded-2xl overflow-hidden transition-all duration-500 hover:scale-105"
//               onMouseEnter={() => setHoveredPost(idx)}
//               onMouseLeave={() => setHoveredPost(null)}
//             >
//               {/* Background Glow */}
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              
//               {/* Card Content */}
//               <div className="relative bg-gradient-to-br from-slate-900/70 to-gray-900/50 backdrop-blur-xl border border-slate-400/20 group-hover:border-purple-400/40 rounded-2xl overflow-hidden transition-all duration-500">
//                 {/* Image Section */}
//                 <div className="relative overflow-hidden">
//                   <img 
//                     src={post.image} 
//                     alt={`Post: ${post.title}`} 
//                     className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" 
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
//                   {/* Badges */}
//                   <div className="absolute top-3 left-3 flex gap-2">
//                     {post.trending && (
//                       <span className="flex items-center gap-1 text-xs font-medium text-red-200 bg-gradient-to-r from-red-500/80 to-pink-500/80 backdrop-blur-sm px-2 py-1 rounded-full border border-red-400/40">
//                         <TrendingUp className="w-3 h-3" />
//                         Trending
//                       </span>
//                     )}
//                     {post.featured && (
//                       <span className="flex items-center gap-1 text-xs font-medium text-yellow-200 bg-gradient-to-r from-yellow-500/80 to-amber-500/80 backdrop-blur-sm px-2 py-1 rounded-full border border-yellow-400/40">
//                         <Star className="w-3 h-3" />
//                         Featured
//                       </span>
//                     )}
//                     {post.hot && (
//                       <span className="flex items-center gap-1 text-xs font-medium text-orange-200 bg-gradient-to-r from-orange-500/80 to-red-500/80 backdrop-blur-sm px-2 py-1 rounded-full border border-orange-400/40">
//                         <Flame className="w-3 h-3" />
//                         Hot
//                       </span>
//                     )}
//                   </div>

//                   {/* Views */}
//                   <div className="absolute top-3 right-3">
//                     <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
//                       {post.views} views
//                     </span>
//                   </div>
//                 </div>
                
//                 {/* Content Section */}
//                 <div className="p-6 space-y-4">
//                   <div className="flex items-center justify-between">
//                     <span className="text-xs font-medium text-purple-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-purple-400/30">
//                       {post.category}
//                     </span>
//                     <div className="flex items-center gap-1 text-xs text-gray-400">
//                       <Calendar className="w-3 h-3" />
//                       {post.date}
//                     </div>
//                   </div>
                  
//                   <h3 className="font-bold text-xl text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 line-clamp-2">
//                     {post.title}
//                   </h3>
                  
//                   <p className="text-sm text-gray-300 line-clamp-3 group-hover:text-gray-200 transition-colors duration-300">
//                     {post.excerpt}
//                   </p>
                  
//                   <div className="flex items-center justify-between pt-2">
//                     <button className="flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium transition-all duration-300 group-hover:translate-x-1">
//                       Read More 
//                       <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
//                     </button>
                    
//                     <div className="flex items-center gap-1">
//                       <Zap className="w-4 h-4 text-yellow-400" />
//                       <span className="text-xs text-gray-400">2 min read</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Hover Effect Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
//               </div>
//             </article>
//           ))}
//         </div>

//         {/* Load More */}
//         {filteredPosts.length > 0 && (
//           <div className="mt-12 text-center">
//             <button className="relative group px-8 py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-xl border border-purple-400/30 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
//               <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
//               <span className="relative z-10">Load More Articles</span>
//             </button>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default BlogLayout;
// import React, { useState } from 'react';
// import { Search } from 'lucide-react';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support.'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted wallets for Jaimax users.'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Altcoins are booming but Jaimax leads the rally.'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Learn how Jaimax supports new generation DeFi apps.'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'Faster, cheaper, and smarter NFT minting using Jaimax.'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div 
//       className="flex flex-col lg:flex-row gap-8 px-6 py-12 min-h-screen"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95) 0%, rgba(8,83,89,0.9) 100%)' }}
//     >
//       {/* Sidebar */}
//       <aside className="lg:w-1/4 w-full space-y-8 transform transition-all duration-700 hover:scale-105">
//         <div className="relative group">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search crypto blog..."
//             aria-label="Search crypto blog"
//             className="w-full p-3 rounded-lg pl-12 bg-white/15 backdrop-blur-sm border border-amber-300/40 text-white placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300 shadow-lg"
//           />
//           <Search className="absolute left-4 top-3.5 text-amber-400 w-5 h-5 group-focus-within:text-amber-300 transition-colors" />
//         </div>

//         <nav aria-label="Categories" className="bg-gradient-to-br from-teal-500/25 to-cyan-600/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/40 shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300">Categories</h2>
//           <ul className="space-y-3">
//             {categories.map((cat) => (
//               <li
//                 key={cat}
//                 tabIndex={0}
//                 className={`hover:bg-teal-500/20 rounded-lg px-3 py-2 cursor-pointer transition-all duration-300 ${
//                   activeCategory === cat 
//                     ? 'bg-gradient-to-r from-cyan-500/25 to-teal-500/25 text-cyan-200 font-semibold border-l-4 border-cyan-400 shadow-md' 
//                     : 'text-gray-200 hover:text-cyan-200'
//                 }`}
//                 onClick={() => setActiveCategory(cat)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') setActiveCategory(cat);
//                 }}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <nav aria-label="Top Posts" className="bg-gradient-to-br from-slate-600/30 to-teal-700/25 backdrop-blur-sm rounded-xl p-6 border border-slate-400/40 shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-slate-300 to-cyan-300">Top Posts</h2>
//           <ul className="space-y-4">
//             {topPosts.map((post, i) => (
//               <li
//                 key={i}
//                 tabIndex={0}
//                 className="flex items-start gap-3 hover:bg-slate-500/20 rounded-lg p-2 cursor-pointer transition-all duration-300 group"
//                 onClick={() => {}}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {};
//                 }}
//               >
//                 <span className="text-lg font-bold text-slate-300 bg-slate-500/25 rounded-full w-8 h-8 flex items-center justify-center text-sm shadow-md">
//                   {i + 1}
//                 </span>
//                 <p className="text-sm text-gray-200 group-hover:text-slate-200 transition-colors">{post}</p>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div className="bg-gradient-to-br from-teal-600/25 to-emerald-700/20 backdrop-blur-sm rounded-xl p-6 border border-teal-400/40 shadow-lg">
//           <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-300">Jaimax Socials</h2>
//           <div className="grid grid-cols-3 gap-2">
//             {[...Array(9)].map((_, idx) => (
//               <img
//                 key={idx}
//                 src={defaultImage}
//                 alt={`jaimax social ${idx + 1}`}
//                 className="rounded-lg border border-emerald-300/40 hover:border-green-400/60 transition-all duration-300 hover:scale-105 shadow-sm"
//               />
//             ))}
//           </div>
//         </div>
//       </aside>

//       {/* Posts Grid */}
//       <main className="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
//         {filteredPosts.map((post, idx) => (
//           <article
//             key={idx}
//             className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-slate-700/40 to-gray-800/30 backdrop-blur-sm border border-slate-400/30 hover:border-cyan-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/15 shadow-lg"
//           >
//             <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 to-blue-500/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
//             <img 
//               src={post.image} 
//               alt={`Post: ${post.title}`} 
//               className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
//             />
            
//             <div className="p-6 space-y-3 relative z-10">
//               <div className="flex items-center gap-2">
//                 <span className="text-xs font-medium text-cyan-200 bg-cyan-500/25 px-3 py-1 rounded-full shadow-sm">
//                   {post.category}
//                 </span>
//                 <span className="text-xs text-gray-300">{post.date}</span>
//               </div>
              
//               <h3 className="font-bold text-lg text-white group-hover:text-cyan-200 transition-colors duration-300 line-clamp-2">
//                 {post.title}
//               </h3>
              
//               <p className="text-sm text-gray-200 line-clamp-3">
//                 {post.excerpt}
//               </p>
              
//               <div className="pt-2">
//                 <button className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-300 group-hover:underline">
//                   Read More →
//                 </button>
//               </div>
//             </div>
//           </article>
//         ))}
//       </main>
//     </div>
//   );
// };

// export default BlogLayout;


// import React, { useState } from 'react';
// import { Search } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Tilt from 'react-parallax-tilt';

// const categories = ['All', 'Blockchain', 'Market Trends', 'DeFi', 'NFTs', 'Crypto News', 'Wallets'];

// const topPosts = [
//   'What Makes Jaimax Coins the Future of Crypto?',
//   'Top 5 Wallets to Store Your Jaimax Safely',
//   'Jaimax Tokenomics Explained in Simple Terms',
//   'How to Stake and Earn Jaimax Coins Easily',
//   'Latest Updates on Jaimax Coin Partnerships'
// ];

// const defaultImage = 'https://cdn.britannica.com/36/241736-050-D40F2AEC/Abstract-cryptocurrency-with-gold-bitcoin-background.jpg';

// const allPosts = [
//   {
//     image: defaultImage,
//     category: 'Crypto News',
//     date: 'June 6, 2025',
//     title: 'Jaimax Coin hits new ATH amid rising crypto adoption',
//     excerpt: 'Jaimax reaches an all-time high value with huge community support.'
//   },
//   {
//     image: defaultImage,
//     category: 'Wallets',
//     date: 'June 4, 2025',
//     title: 'Top secure wallets to store your Jaimax Coins',
//     excerpt: 'Explore the most trusted wallets for Jaimax users.'
//   },
//   {
//     image: defaultImage,
//     category: 'Market Trends',
//     date: 'June 2, 2025',
//     title: 'Jaimax outpaces other altcoins in 2025 market surge',
//     excerpt: 'Altcoins are booming but Jaimax leads the rally.'
//   },
//   {
//     image: defaultImage,
//     category: 'DeFi',
//     date: 'June 1, 2025',
//     title: 'Integrating Jaimax with DeFi projects for better yield',
//     excerpt: 'Learn how Jaimax supports new generation DeFi apps.'
//   },
//   {
//     image: defaultImage,
//     category: 'NFTs',
//     date: 'May 28, 2025',
//     title: 'NFT creators embrace Jaimax for seamless transactions',
//     excerpt: 'Faster, cheaper, and smarter NFT minting using Jaimax.'
//   }
// ];

// const BlogLayout = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [activeCategory, setActiveCategory] = useState('All');

//   const filteredPosts = allPosts.filter(post => {
//     const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
//     return matchesSearch && matchesCategory;
//   });

//   return (
//     <div
//       className="flex flex-col lg:flex-row gap-8 px-6 py-12 min-h-screen text-gray-900"
//       style={{ background: 'linear-gradient(135deg, rgba(8,83,89,0.95), rgba(6,100,105,0.9))' }}
//     >
//       {/* Sidebar */}
//       <motion.aside
//         className="lg:w-1/4 w-full space-y-10 text-yellow-300"
//         initial={{ x: -50, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 0.6 }}
//       >
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Search crypto blog..."
//             aria-label="Search crypto blog"
//             className="w-full p-2 rounded pl-10 text-gray-900"
//           />
//           <Search className="absolute left-3 top-2.5 text-gray-600 w-5 h-5" />
//         </div>

//         <nav aria-label="Categories">
//           <h2 className="text-xl font-semibold mb-3">Categories</h2>
//           <ul className="space-y-2">
//             {categories.map((cat) => (
//               <li
//                 key={cat}
//                 tabIndex={0}
//                 className={`hover:underline cursor-pointer ${
//                   activeCategory === cat ? 'font-bold text-yellow-400' : 'text-yellow-100'
//                 }`}
//                 onClick={() => setActiveCategory(cat)}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') setActiveCategory(cat);
//                 }}
//               >
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <nav aria-label="Top Posts">
//           <h2 className="text-xl font-semibold mb-3">Top Posts</h2>
//           <ul className="space-y-3">
//             {topPosts.map((post, i) => (
//               <li
//                 key={i}
//                 tabIndex={0}
//                 className="flex items-start gap-3 hover:underline cursor-pointer text-yellow-200"
//                 onClick={() => {}}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {};
//                 }}
//               >
//                 <span className="text-xl font-bold text-yellow-400">{i + 1}</span>
//                 <p className="text-sm">{post}</p>
//               </li>
//             ))}
//           </ul>
//         </nav>

//         <div>
//           <h2 className="text-xl font-semibold mb-3">Jaimax Socials</h2>
//           <div className="grid grid-cols-3 gap-2">
//             {[...Array(9)].map((_, idx) => (
//               <img
//                 key={idx}
//                 src={defaultImage}
//                 alt={`jaimax social ${idx + 1}`}
//                 className="rounded"
//               />
//             ))}
//           </div>
//         </div>
//       </motion.aside>

//       {/* Posts Grid */}
//       <motion.main
//         className="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 gap-6"
//         initial={{ opacity: 0, y: 50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, delay: 0.2 }}
//       >
//         {filteredPosts.map((post, idx) => (
//           <Tilt glareEnable={true} glareMaxOpacity={0.4} scale={1.05} transitionSpeed={400} key={idx} className="rounded-xl">
//             <motion.div
//               className="relative rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/40 transition duration-300 border border-yellow-400"
//               style={{ backgroundColor: '#caf0f8' }}
//               whileHover={{ scale: 1.03 }}
//             >
//               <div
//                 className="absolute inset-0 pointer-events-none rounded-xl"
//                 style={{ backgroundColor: 'rgba(167, 201, 87, 0.15)' }}
//               ></div>

//               <img src={post.image} alt={`Post: ${post.title}`} className="w-full h-48 object-cover relative z-10" />
//               <div className="p-4 space-y-1 relative z-10">
//                 <p className="text-sm font-medium text-blue-900">{post.category} / {post.date}</p>
//                 <h3 className="font-semibold text-lg text-blue-900 hover:underline cursor-pointer">{post.title}</h3>
//                 <p className="text-sm text-gray-900">{post.excerpt}</p>
//               </div>
//             </motion.div>
//           </Tilt>
//         ))}
//       </motion.main>
//     </div>
//   );
// };

// export default BlogLayout;
