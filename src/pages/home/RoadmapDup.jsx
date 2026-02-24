import React from 'react';

const phaseData = [
  {
    status: "Live",
    phaseNo: "Phase 1",
    tokens: "10 Billion Tokens",
    price: "Price INR 0.01 - 0.04 Paisa (0.00012-0.00046 USD)",
    button: "Buy Now",
    // icon: "🚀",
    description: "Launch phase with exclusive early-bird benefits",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 2",
    tokens: "20 Billion Tokens",
    price: "Price INR 0.05 - 0.50 Paisa (0.00061 - 0.0061 USD)",
    button: "Coming Soon",
    // icon: "⭐",
    description: "Enhanced rewards and premium token allocation",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 3",
    tokens: "25 Billion Tokens",
    price: "Price INR 0.60 - 1.53 - Paisa (0.0071 - 0.018 USD)",
    button: "Coming Soon",
    // icon: "💎",
    description: "Diamond tier with exclusive staking benefits",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 4",
    tokens: "30 Billion Tokens",
    price: "Price INR 1.60 - 3.00 Paisa (0.091 - 0.036 USD)",
    button: "Coming Soon",
    // icon: "👑",
    description: "Premium phase with governance token access",
  },
  {
    status: "Upcoming",
    phaseNo: "Phase 5",
    tokens: "25 Billion Tokens",
    price: "Price INR 3.15 - 4.10 Paisa (0.037 - 0.049 USD)",
    button: "Coming Soon",
    // icon: "🏆",
    description: "Ultimate tier with maximum rewards potential",
  },
];

const TokenRoadmap = () => {
  return (
    <div className="min-h-screen relative overflow-hidden p-4 md:p-8" style={{
      background: 'linear-gradient(135deg, #095258 0%, #1c994a 50%, #095258 100%)'
    }}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 rounded-full opacity-10 animate-pulse" style={{
          background: 'radial-gradient(circle, #bbcf28 0%, transparent 70%)'
        }}></div>
        <div className="absolute top-40 right-32 w-96 h-96 rounded-full opacity-5 animate-pulse delay-1000" style={{
          background: 'radial-gradient(circle, #1c994a 0%, transparent 70%)'
        }}></div>
        <div className="absolute bottom-32 left-40 w-64 h-64 rounded-full opacity-10 animate-pulse delay-2000" style={{
          background: 'radial-gradient(circle, #bbcf28 0%, transparent 70%)'
        }}></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block p-1 rounded-full mb-6" style={{
            background: 'linear-gradient(45deg, #bbcf28, #1c994a, #bbcf28)'
          }}>
            <div className="bg-black px-6 py-2 rounded-full">
              <span className="text-sm font-medium text-white tracking-widest uppercase">Token Sale</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white mb-6 tracking-tight">
            Token Sale{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-green-400 to-yellow-300 animate-pulse">
                Roadmap
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent opacity-50"></div>
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light">
            Join our phased token launch journey
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Central Timeline - Enhanced */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 z-0" style={{
            background: 'linear-gradient(to bottom, #bbcf28 0%, #1c994a 50%, #bbcf28 100%)',
            boxShadow: '0 0 20px rgba(188, 207, 40, 0.3)'
          }}></div>
          
          {/* Left Timeline for mobile - Enhanced */}
          <div className="md:hidden absolute left-6 h-full w-1 z-0" style={{
            background: 'linear-gradient(to bottom, #bbcf28 0%, #1c994a 50%, #bbcf28 100%)',
            boxShadow: '0 0 15px rgba(188, 207, 40, 0.3)'
          }}></div>
          
          {/* Timeline Phases */}
          <div className="space-y-8 md:space-y-24">
            {phaseData.map((phase, index) => (
              <div key={index} className="relative">
                
                {/* Desktop Layout - Alternating sides */}
                <div className="hidden md:grid md:grid-cols-2 md:gap-8 md:items-center md:min-h-[200px]">
                  
                  {/* Left Side - Even indices (0, 2, 4) */}
                  {index % 2 === 0 ? (
                    <div className="flex justify-end pr-4">
                      <div className="w-80 relative group">
                        <div className={`relative backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                          phase.status === 'Live' 
                            ? 'bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20 border-green-400/40 ring-2 ring-green-400/50' 
                            : 'bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 border-gray-600/30 hover:border-gray-500/50'
                        }`} style={{
                          backdropFilter: 'blur(20px)',
                          boxShadow: phase.status === 'Live' 
                            ? '0 25px 50px rgba(28, 153, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                            : '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                        }}>
                          {/* Floating Icon */}
                          <div className="absolute -top-6 left-8 text-4xl transform group-hover:scale-110 transition-transform duration-300">
                            {phase.icon}
                          </div>
                          
                          {/* Status Badge - Redesigned */}
                          <div className="absolute -top-4 right-8">
                            <div className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide ${
                              phase.status === 'Live' 
                                ? 'text-white shadow-xl' 
                                : 'bg-gray-700/80 text-gray-300 border border-gray-600/50'
                            }`} style={{
                              background: phase.status === 'Live' 
                                ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 100%)' 
                                : undefined,
                              boxShadow: phase.status === 'Live' 
                                ? '0 15px 30px rgba(28, 153, 74, 0.4), 0 0 20px rgba(28, 153, 74, 0.3)' 
                                : 'none'
                            }}>
                              {phase.status}
                              {phase.status === 'Live' && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                              )}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="mt-8">
                            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{phase.phaseNo}</h3>
                            <p className="text-gray-400 text-sm mb-6 italic">{phase.description}</p>
                            
                            <div className="space-y-4 mb-8">
                              <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/20 border border-green-400/20">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-300 animate-pulse"></div>
                                <span className="font-bold text-green-300">{phase.tokens}</span>
                              </div>
                              
                              <div className="p-3 rounded-xl bg-black/20 border border-gray-600/20">
                                <div className="text-gray-300 text-sm leading-relaxed font-medium">
                                  {phase.price}
                                </div>
                              </div>
                            </div>
                            
                            <button className={`w-full py-4 px-8 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 ${
                              phase.status === 'Live'
                                ? 'text-white shadow-2xl hover:shadow-green-400/25'
                                : 'bg-gray-700 hover:bg-gray-600 text-gray-300 cursor-not-allowed'
                            }`} style={{
                              background: phase.status === 'Live' 
                                ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 50%, #1c994a 100%)' 
                                : undefined,
                              boxShadow: phase.status === 'Live' 
                                ? '0 20px 40px rgba(28, 153, 74, 0.3)' 
                                : 'none'
                            }}>
                              {phase.button}
                            </button>
                          </div>
                          
                          {/* Connecting Line Enhanced */}
                          <div className="absolute top-1/2 right-0 transform translate-x-full -translate-y-1/2 w-8 h-1 z-10" style={{
                            background: 'linear-gradient(to right, #bbcf28, #1c994a)',
                            boxShadow: '0 0 10px rgba(188, 207, 40, 0.5)'
                          }}></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  
                  {/* Right Side - Odd indices (1, 3) */}
                  {index % 2 === 1 ? (
                    <div className="flex justify-start pl-4">
                      <div className="w-80 relative group">
                        <div className={`relative backdrop-blur-xl rounded-3xl p-8 border shadow-2xl transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 ${
                          phase.status === 'Live' 
                            ? 'bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20 border-green-400/40 ring-2 ring-green-400/50' 
                            : 'bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 border-gray-600/30 hover:border-gray-500/50'
                        }`} style={{
                          backdropFilter: 'blur(20px)',
                          boxShadow: phase.status === 'Live' 
                            ? '0 25px 50px rgba(28, 153, 74, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
                            : '0 25px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                        }}>
                          {/* Floating Icon */}
                          <div className="absolute -top-6 right-8 text-4xl transform group-hover:scale-110 transition-transform duration-300">
                            {phase.icon}
                          </div>
                          
                          {/* Status Badge */}
                          <div className="absolute -top-4 left-8">
                            <div className={`relative px-6 py-2 rounded-full text-sm font-bold tracking-wide ${
                              phase.status === 'Live' 
                                ? 'text-white shadow-xl' 
                                : 'bg-gray-700/80 text-gray-300 border border-gray-600/50'
                            }`} style={{
                              background: phase.status === 'Live' 
                                ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 100%)' 
                                : undefined,
                              boxShadow: phase.status === 'Live' 
                                ? '0 15px 30px rgba(28, 153, 74, 0.4), 0 0 20px rgba(28, 153, 74, 0.3)' 
                                : 'none'
                            }}>
                              {phase.status}
                              {phase.status === 'Live' && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                              )}
                            </div>
                          </div>
                          
                          {/* Content */}
                          <div className="mt-8">
                            <h3 className="text-3xl font-black text-white mb-2 tracking-tight">{phase.phaseNo}</h3>
                            <p className="text-gray-400 text-sm mb-6 italic">{phase.description}</p>
                            
                            <div className="space-y-4 mb-8">
                              <div className="flex items-center space-x-3 p-3 rounded-xl bg-black/20 border border-green-400/20">
                                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-green-300 animate-pulse"></div>
                                <span className="font-bold text-green-300">{phase.tokens}</span>
                              </div>
                              
                              <div className="p-3 rounded-xl bg-black/20 border border-gray-600/20">
                                <div className="text-gray-300 text-sm leading-relaxed font-medium">
                                  {phase.price}
                                </div>
                              </div>
                            </div>
                            
                            <button className={`w-full py-4 px-8 rounded-2xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-105 ${
                              phase.status === 'Live'
                                ? 'text-white shadow-2xl hover:shadow-green-400/25'
                                : 'bg-gray-700 hover:bg-gray-600 text-gray-300 cursor-not-allowed'
                            }`} style={{
                              background: phase.status === 'Live' 
                                ? 'linear-gradient(135deg, #1c994a 0%, #bbcf28 50%, #1c994a 100%)' 
                                : undefined,
                              boxShadow: phase.status === 'Live' 
                                ? '0 20px 40px rgba(28, 153, 74, 0.3)' 
                                : 'none'
                            }}>
                              {phase.button}
                            </button>
                          </div>
                          
                          {/* Connecting Line Enhanced */}
                          <div className="absolute top-1/2 left-0 transform -translate-x-full -translate-y-1/2 w-8 h-1 z-10" style={{
                            background: 'linear-gradient(to left, #bbcf28, #1c994a)',
                            boxShadow: '0 0 10px rgba(188, 207, 40, 0.5)'
                          }}></div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                  
                  {/* Timeline Node - Enhanced */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className={`relative w-8 h-8 rounded-full border-4 ${
                      phase.status === 'Live' 
                        ? 'border-4 shadow-2xl' 
                        : 'bg-gray-600 border-gray-500'
                    }`} style={{
                      backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
                      borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
                      boxShadow: phase.status === 'Live' 
                        ? '0 0 30px rgba(188, 207, 40, 0.6), inset 0 2px 4px rgba(255, 255, 255, 0.2)' 
                        : 'none'
                    }}>
                      {phase.status === 'Live' && (
                        <>
                          <div className="absolute inset-0 rounded-full animate-ping bg-green-400 opacity-75"></div>
                          <div className="absolute inset-2 rounded-full bg-white opacity-30"></div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Mobile Layout - Enhanced */}
                <div className="md:hidden flex items-center">
                  {/* Timeline Node */}
                  <div className="absolute left-6 transform -translate-x-1/2 z-20">
                    <div className={`relative w-6 h-6 rounded-full border-2 ${
                      phase.status === 'Live' 
                        ? 'border-2 shadow-xl' 
                        : 'bg-gray-600 border-gray-500'
                    }`} style={{
                      backgroundColor: phase.status === 'Live' ? '#bbcf28' : '#6b7280',
                      borderColor: phase.status === 'Live' ? '#1c994a' : '#6b7280',
                      boxShadow: phase.status === 'Live' 
                        ? '0 0 20px rgba(188, 207, 40, 0.5)' 
                        : 'none'
                    }}>
                      {phase.status === 'Live' && (
                        <div className="absolute inset-0 rounded-full animate-ping bg-yellow-400 opacity-75"></div>
                      )}
                    </div>
                  </div>

                  {/* Connecting Line */}
                  <div className="ml-8 w-8 h-1 z-10" style={{
                    background: 'linear-gradient(to right, #bbcf28, #1c994a)',
                    boxShadow: '0 0 8px rgba(188, 207, 40, 0.4)'
                  }}></div>

                  {/* Card - Mobile Enhanced */}
                  <div className="flex-1 ml-3">
                    <div className={`relative backdrop-blur-xl rounded-2xl p-5 border shadow-xl transform transition-all duration-300 ${
                      phase.status === 'Live' 
                        ? 'bg-gradient-to-br from-green-500/20 via-green-400/15 to-green-600/20 border-green-400/30' 
                        : 'bg-gradient-to-br from-gray-800/40 via-gray-700/40 to-gray-800/40 border-gray-600/30'
                    }`} style={{
                      backdropFilter: 'blur(15px)',
                      boxShadow: phase.status === 'Live' 
                        ? '0 20px 40px rgba(28, 153, 74, 0.15)' 
                        : '0 20px 40px rgba(0, 0, 0, 0.2)'
                    }}>
                      {/* Icon */}
                      <div className="absolute -top-3 left-4 text-2xl">
                        {phase.icon}
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute -top-3 right-4">
                        <span className={`px-4 py-1 rounded-full text-xs font-bold ${
                          phase.status === 'Live' 
                            ? 'text-white shadow-lg' 
                            : 'bg-gray-700 text-gray-300'
                        }`} style={{
                          background: phase.status === 'Live' 
                            ? 'linear-gradient(135deg, #1c994a, #bbcf28)' 
                            : undefined,
                          boxShadow: phase.status === 'Live' 
                            ? '0 10px 20px rgba(28, 153, 74, 0.3)' 
                            : 'none'
                        }}>
                          {phase.status}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <div className="mt-4">
                        <h3 className="text-xl font-black text-white mb-1">{phase.phaseNo}</h3>
                        <p className="text-gray-400 text-xs mb-4 italic">{phase.description}</p>
                        
                        <div className="space-y-3 mb-5">
                          <div className="flex items-center space-x-2 p-2 rounded-lg bg-black/20">
                            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-green-300"></div>
                            <span className="font-bold text-green-300 text-sm">{phase.tokens}</span>
                          </div>
                          
                          <div className="p-2 rounded-lg bg-black/20">
                            <div className="text-gray-300 text-xs leading-relaxed">
                              {phase.price}
                            </div>
                          </div>
                        </div>
                        
                        <button className={`w-full py-3 px-6 rounded-xl font-bold text-sm transition-all duration-300 ${
                          phase.status === 'Live'
                            ? 'text-white shadow-xl'
                            : 'bg-gray-700 text-gray-300 cursor-not-allowed'
                        }`} style={{
                          background: phase.status === 'Live' 
                            ? 'linear-gradient(135deg, #1c994a, #bbcf28)' 
                            : undefined,
                          boxShadow: phase.status === 'Live' 
                            ? '0 15px 30px rgba(28, 153, 74, 0.2)' 
                            : 'none'
                        }}>
                          {phase.button}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        </div>      
      </div>
    </div>
  );
};

export default TokenRoadmap;