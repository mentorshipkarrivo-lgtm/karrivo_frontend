


import React, { useEffect, useState } from 'react';
// import login from '../assets/Images/loginReg.svg'
import login from '../assets/Images/jaicoin.svg'

const Logo = () => {
  const [particles, setParticles] = useState([]);

  // Generate floating particles
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          speed: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.4 + 0.1,
          symbol: ['₿', '$', '€', '¥', '£', '₹'][Math.floor(Math.random() * 6)]
        });
      }
      setParticles(newParticles);
    };
    
    generateParticles();
  }, []);

  // All Icons with custom color palette
  const Icons = {
    bitcoin: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <span className="text-white font-bold text-xs">₿</span>
      </div>
    ),
    ethereum: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <span className="text-white font-bold text-xs">Ξ</span>
      </div>
    ),
    stocks: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/>
        </svg>
      </div>
    ),
    dollar: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <span className="text-white font-bold text-xs">$</span>
      </div>
    ),
    portfolio: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      </div>
    ),
    growth: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M7 14l5-5 5 5z"/>
        </svg>
      </div>
    ),
    investment: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
        </svg>
      </div>
    ),
    bonds: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
        </svg>
      </div>
    ),
    profits: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      </div>
    ),
    users: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
          <path d="M16 3.128a4 4 0 0 1 0 7.744"/>
          <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
          <circle cx="9" cy="7" r="4"/>
        </svg>
      </div>
    ),
    rupees: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12"/>
          <path d="M6 8h12"/>
          <path d="m6 13 8.5 8"/>
          <path d="M6 13h3"/>
          <path d="M9 13c6.667 0 6.667-10 0-10"/>
        </svg>
      </div>
    ),
    usd: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/>
          <path d="M12 18V6"/>
        </svg>
      </div>
    ),
    shares: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="4.5" r="2.5"/>
          <path d="m10.2 6.3-3.9 3.9"/>
          <circle cx="4.5" cy="12" r="2.5"/>
          <path d="M7 12h10"/>
          <circle cx="19.5" cy="12" r="2.5"/>
          <path d="m13.8 17.7 3.9-3.9"/>
          <circle cx="12" cy="19.5" r="2.5"/>
        </svg>
      </div>
    ),
    trending: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 16v5"/>
          <path d="M16 14v7"/>
          <path d="M20 10v11"/>
          <path d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"/>
          <path d="M4 18v3"/>
          <path d="M8 14v7"/>
        </svg>
      </div>
    ),
    analytics: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 17V9"/>
          <path d="M18 17V5"/>
          <path d="M3 3v16a2 2 0 0 0 2 2h16"/>
          <path d="M8 17v-3"/>
        </svg>
      </div>
    ),
    wallet: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 14h.01"/>
          <path d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"/>
        </svg>
      </div>
    ),
    crypto: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <span className="text-white font-bold text-xs">₿</span>
      </div>
    ),
    money: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <span className="text-white font-bold text-xs">💰</span>
      </div>
    ),
    chart: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        borderColor: '#bace27'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M3 3v18h18v-2H5V3H3z"/>
          <path d="M7 12l4-4 4 4 4-4v10H7z"/>
        </svg>
      </div>
    ),
    bank: () => (
      <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2" style={{
        background: 'linear-gradient(135deg, #074e53 0%, #bace27 100%)',
        borderColor: '#074e53'
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
          <path d="M12 2L2 7v2h20V7L12 2z"/>
          <path d="M5 11v8h2v-8H5z"/>
          <path d="M9 11v8h2v-8H9z"/>
          <path d="M13 11v8h2v-8h-2z"/>
          <path d="M17 11v8h2v-8h-2z"/>
          <path d="M2 19h20v2H2v-2z"/>
        </svg>
      </div>
    )
  };

  // Orbital dot indicators
  const OrbitDot = ({ delay, size = "small" }) => (
    <div 
      className={`absolute rounded-full ${size === "small" ? "w-1 h-1" : "w-1.5 h-1.5"} opacity-60`}
      style={{
        background: 'linear-gradient(135deg, #bace27 0%, #074e53 100%)',
        animation: `pulse 2s ease-in-out infinite ${delay}s`
      }}
    ></div>
  );

  return (
    <div className="relative h-[400px] w-[500px] overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute pointer-events-none select-none"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: `${particle.size * 3}px`,
              opacity: particle.opacity * 0.3,
              color: '#bace27',
              animation: `float ${particle.speed * 10}s ease-in-out infinite`,
              animationDelay: `${particle.id * 0.1}s`
            }}
          >
            {particle.symbol}
          </div>
        ))}
      </div>

      {/* Main Orbiting Component */}
      <div className="flex items-center justify-center h-full">
        <div className="relative flex h-[400px] w-[400px] items-center justify-center">
          
          {/* Orbital rings with custom colors */}
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Outer orbital ring */}
            <div 
              className="absolute rounded-full opacity-40 shadow-2xl"
              style={{
                width: '300px',
                height: '300px',
                background: `conic-gradient(from 0deg, transparent, rgba(7, 78, 83, 0.3), transparent, rgba(186, 206, 39, 0.3), transparent)`,
                animation: 'rotate 30s linear infinite'
              }}
            ></div>
            <div 
              className="absolute rounded-full border-2"
              style={{
                width: '340px',
                height: '340px',
                borderColor: 'rgba(186, 206, 39, 0.3)'
              }}
            >
              {/* Dots on outer ring */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
                <div key={i} className="absolute" style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-170px)`
                }}>
                  <OrbitDot delay={i * 0.2} size="large" />
                </div>
              ))}
            </div>

            {/* Middle orbital ring */}
            <div 
              className="absolute rounded-full opacity-35"
              style={{
                width: '260px',
                height: '260px',
                background: `conic-gradient(from 90deg, transparent, rgba(186, 206, 39, 0.25), transparent, rgba(7, 78, 83, 0.25), transparent)`,
                animation: 'rotate 35s linear infinite'
              }}
            ></div>
            <div 
              className="absolute rounded-full border border-dashed"
              style={{
                width: '280px',
                height: '280px',
                borderColor: 'rgba(7, 78, 83, 0.3)'
              }}
            >
              {/* Dots on middle ring */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <div key={i} className="absolute" style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-140px)`
                }}>
                  <OrbitDot delay={i * 0.3} />
                </div>
              ))}
            </div>
            
            {/* Inner orbital ring */}
            <div 
              className="absolute rounded-full opacity-50"
              style={{
                width: '200px',
                height: '200px',
                background: `conic-gradient(from 180deg, transparent, rgba(186, 206, 39, 0.3), transparent, rgba(7, 78, 83, 0.3), transparent)`,
                animation: 'rotate 20s linear infinite reverse'
              }}
            ></div>
            <div 
              className="absolute rounded-full border-2"
              style={{
                width: '220px',
                height: '220px',
                borderColor: 'rgba(7, 78, 83, 0.4)'
              }}
            >
              {/* Dots on inner ring */}
              {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((angle, i) => (
                <div key={i} className="absolute" style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-110px)`
                }}>
                  <OrbitDot delay={i * 0.2} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Outer orbit - 12 icons */}
          {[Icons.bitcoin, Icons.ethereum, Icons.stocks, Icons.dollar, Icons.profits, Icons.users, Icons.rupees, Icons.usd, Icons.crypto, Icons.money, Icons.chart, Icons.bank].map((IconComponent, index) => {
            const angle = (360 / 12) * index;
            const radius = 170;
            
            return (
              <div
                key={`outer-${index}`}
                className="absolute z-10"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                  animation: `spin-outer 30s linear infinite`,
                }}
              >
                <div className="relative">
                  <IconComponent />
                  <div className="absolute -inset-1 rounded-full blur-sm opacity-60" style={{
                    background: 'linear-gradient(135deg, #085359 0%, rgba(7, 78, 83, 0.2) 100%)'
                  }}></div>
                </div>
              </div>
            );
          })}

          {/* Middle orbit - 8 icons */}
          {[Icons.portfolio, Icons.wallet, Icons.ethereum, Icons.profits, Icons.shares, Icons.trending, Icons.analytics, Icons.investment].map((IconComponent, index) => {
            const angle = (360 / 8) * index;
            const radius = 140;
            
            return (
              <div
                key={`middle-${index}`}
                className="absolute z-10"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                  animation: `spin-middle 35s linear infinite`,
                }}
              >
                <div className="relative">
                  <IconComponent />
                  <div className="absolute -inset-1 rounded-full blur-sm opacity-50" style={{
                    background: 'linear-gradient(135deg, rgba(186, 206, 39, 0.15) 0%, rgba(7, 78, 83, 0.15) 100%)'
                  }}></div>
                </div>
              </div>
            );
          })}
          
          {/* Inner orbit - 9 icons */}
          {[Icons.growth, Icons.investment, Icons.bonds, Icons.shares, Icons.trending, Icons.analytics, Icons.wallet, Icons.bitcoin, Icons.dollar].map((IconComponent, index) => {
            const angle = (360 / 9) * index;
            const radius = 110;
            
            return (
              <div
                key={`inner-${index}`}
                className="absolute z-10"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
                  animation: `spin-inner 20s linear infinite reverse`,
                }}
              >
                <div className="relative">
                  <IconComponent />
                  <div className="absolute -inset-1 rounded-full blur-sm opacity-40" style={{
                    background: 'linear-gradient(135deg, rgba(7, 78, 83, 0.2) 0%, rgba(186, 206, 39, 0.2) 100%)'
                  }}></div>
                </div>
              </div>
            );
          })}
          
          {/* Central image - using placeholder div since we can't import the actual image */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="relative">
              <div className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold" style={{
                color: 'white',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
              }}>
                <img src={login} alt=""  width={100} className='ml-2'/>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes spin-outer {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-170px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-170px) rotate(-360deg);
          }
        }

        @keyframes spin-middle {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-140px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateY(-140px) rotate(-360deg);
          }
        }
        
        @keyframes spin-inner {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateY(-110px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg) translateY(-110px) rotate(360deg);
          }
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(180deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.6;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default Logo;