

import React from 'react';
import { motion } from 'framer-motion';
import sevices from "../../assets/Images/services.svg";
import jaicoins from "../../assets/Images/jaicoins.svg";
import jaimaxthreecoins from "../../assets/Images/JaimaxthreeCoin4.png";
import frameTwo from "../../assets/Images/securitymeasure.svg";
import serviceImg from "../../assets/Images/serviceImg.svg";
import profits from "../../assets/Images/profits.svg";
import access from "../../assets/Images/accessToprofit.svg";
import rocket2 from '../../assets/Images/rocket2.svg'
import eye from "../../assets/Images/eye.svg";
import features from "../../assets/Images/Futures.svg";
import backlogo from "../../assets/Images/backlogo.svg";
const bounceUpVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const ServicesComponent = () => {
  const onClickNavigateToLogin = () => {
    console.log("Navigate to login");
  };

  return (
    <div
  className="min-h-screen bg-cover bg-center"
  style={{
    backgroundImage: `linear-gradient(to bottom, rgba(9,86,89,0.95), rgba(4,92,97,0.95)), url('${backlogo}')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    
  }}
>
      {/* Services Section */}
      <div className="container mx-auto px-4 py-16" id="services">
        <div className="text-center mb-12">
          <img src={sevices} alt="services" className="mx-auto mb-4" />
          <h2 className="text-4xl font-bold text-white mb-4" style={{ 
            background: 'linear-gradient(to right, #bbcf28, #1d974a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Our Service Offerings
          </h2>
          <p className="text-gray-100 text-lg uppercase tracking-wider">
            We offer various services like
          </p>
        </div>

        <div className="mt-12 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Security Measures */}
            <motion.div
              variants={bounceUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
                   style={{ 
                     background: 'rgba(187, 207, 40, 0.3)',
                     boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #bbcf28, #1d974a)' }}></div> */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #bbcf28, #1d974a)' }}>
                    <img src={jaicoins} alt="jaicoin" className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold text-xl">
                    Security Measures
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Our KYC verification and Google Authenticator features
                  fortify your account against unauthorized access. Trust in
                  our platform to protect your digital holdings and secure
                  your financial future.
                </p>
              </div>
            </motion.div>

            {/* Decorative Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center">
                <img src={frameTwo} alt="frame" className="mx-auto filter drop-shadow-lg" />
              </div>
            </div>

            {/* Secure Crypto Wallet */}
            <motion.div
              variants={bounceUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
                   style={{ 
                     background: 'rgba(187, 207, 40, 0.3)',
                     boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #1d974a, #bbcf28)' }}></div> */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #1d974a, #bbcf28)' }}>
                    <img src={jaicoins} alt="jaicoin" className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold text-xl">
                    Secure Crypto Wallet
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Cryptocurrencies are shielded by state-of-the-art security
                  protocols, ensuring your digital wealth remains
                  impenetrable. Experience the convenience of managing and
                  accessing your assets securely, anytime, anywhere.
                </p>
              </div>
            </motion.div>

            {/* Decorative Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center">
                <img src={serviceImg} alt="frame" className="mx-auto filter drop-shadow-lg" />
              </div>
            </div>

            {/* Access to Profits */}
            <motion.div
              variants={bounceUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
                   style={{ 
                     background: 'rgba(187, 207, 40, 0.3)',
                     boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #045c61, #1d974a)' }}></div> */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #045c61, #1d974a)' }}>
                    <img src={profits} alt="profits" className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold text-xl">
                    Access to Profits
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Convert your investments into real-world gains, making the
                  most of your financial endeavors. Enjoy the flexibility and
                  speed you deserve.
                </p>
              </div>
            </motion.div>

            {/* Decorative Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center">
                <img src={access} alt="frame" className="mx-auto filter drop-shadow-lg" />
              </div>
            </div>

            {/* Financial Growth */}
            <motion.div
              variants={bounceUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
                   style={{ 
                     background: 'rgba(187, 207, 40, 0.3)',
                     boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #bbcf28, #095659)' }}></div> */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #bbcf28, #095659)' }}>
                    <img src={jaicoins} alt="rocket" className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold text-xl">
                    Financial Growth
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  Jaimax Coin offers plans that align with your aspirations.
                  Achieve optimal growth and maximize your returns through
                  intelligently designed investment options.
                </p>
              </div>
            </motion.div>

            {/* Decorative Image */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="text-center">
                <img src={eye} alt="frame" className="mx-auto filter drop-shadow-lg" />
              </div>
            </div>

            {/* Fund Management */}
                               <motion.div
              variants={bounceUpVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0 }}
              className="group"
            >
              <div className="relative p-8 rounded-3xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-2"
                   style={{ 
                     background: 'rgba(187, 207, 40, 0.3)',
                     boxShadow: '0 8px 32px rgba(187, 207, 40, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                   }}>
                {/* <div className="absolute top-0 left-0 w-full h-1 rounded-t-3xl" style={{ background: 'linear-gradient(to right, #bbcf28, #095659)' }}></div> */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #bbcf28, #095659)' }}>
                    <img src={jaicoins} alt="rocket" className="w-8 h-8" />
                  </div>
                  <h3 className="text-white font-bold text-xl">
                    Funds management
                  </h3>
                </div>
                <p className="text-gray-200 leading-relaxed">
                   Add money, transfer funds, and monitor your investments with
                  ease. Navigate through your financial journey smoothly as
                  you react promptly to market opportunities.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

    <div className=" text-white py-16 px-6 lg:px-24 flex flex-col lg:flex-row items-center justify-between">

      {/* Text content */}
      <div className="lg:w-1/2 space-y-6">
        <h2 className="text-green-400 text-4xl lg:text-5xl font-extrabold">
          Financial Growth
        </h2>
        <h3 className="uppercase text-white tracking-widest text-sm">
          FINANCIAL GROWTH THROUGH SMART INVESTMENTS
        </h3>
        <p className="text-2xl font-extrabold leading-snug">
          Discover a range of meticulously crafted investment plans designed to
          cater to your unique financial aspirations.
        </p>
        <p className="text-gray-300">
          At Jaimax Coin, we understand that every investor is different, and
          that’s why we offer a variety of plans tailored to your needs. Whether
          you’re a newcomer looking to start small, an experienced investor
          seeking substantial growth, or someone planning for retirement, our
          plans provide you with the tools, strategies, and support to achieve
          your goals. Explore our diverse investment options and embark on a
          journey towards financial success with Jaimax Coin.
        </p>
        <button className="bg-[#C6F839] text-black px-6 py-3 rounded-full font-semibold hover:bg-[#b5e634] transition">
          Invest now
        </button>
      </div>

      {/* Rocket Illustration */}
      <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
        <img
          src={jaimaxthreecoins}
          alt="Rocket Boosting Growth"
          className="w-[500px] max-w-full"
        />
      </div>
    </div>

    </div>
  );
};

export default ServicesComponent;
