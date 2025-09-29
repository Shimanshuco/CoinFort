import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaShieldAlt, FaCoins, FaMobile, FaLock } from 'react-icons/fa';
import { HiSparkles, HiLightningBolt } from 'react-icons/hi';

const Home = () => {
  const features = [
    {
      icon: <FaShieldAlt className="text-3xl text-blue-600" />,
      title: "Secure & Safe",
      description: "Your private keys are encrypted and stored locally. We never have access to your funds."
    },
    {
      icon: <FaCoins className="text-3xl text-green-600" />,
      title: "Multi-Chain Support",
      description: "Support for Ethereum and Solana with more chains coming soon."
    },
    {
      icon: <FaMobile className="text-3xl text-purple-600" />,
      title: "Mobile Responsive",
      description: "Beautiful interface that works perfectly on all devices and screen sizes."
    },
    {
      icon: <FaLock className="text-3xl text-red-600" />,
      title: "HD Wallet Support",
      description: "Generate multiple accounts from a single seed phrase using standard derivation paths."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 px-4"
      >
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              CoinFort
            </h1>
            <div className="flex items-center justify-center gap-2 mb-6">
              <HiSparkles className="text-yellow-500 text-2xl" />
              <span className="text-xl text-gray-600 font-medium">Your Digital Fortress</span>
              <HiSparkles className="text-yellow-500 text-2xl" />
            </div>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 leading-relaxed"
          >
            The most secure and user-friendly way to manage your crypto wallets.
            <br className="hidden md:block" />
            Create, import, and manage multiple accounts with ease.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link
              to="/wallet"
              className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <HiLightningBolt className="text-xl" />
              Get Started
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity -z-10"></span>
            </Link>
            
            <a
              href="#features"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300 hover:scale-105"
            >
              Learn More
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section 
        id="features"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 px-4 bg-white/70 backdrop-blur-sm"
      >
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose CoinFort?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with security, simplicity, and user experience in mind.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="py-20 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white shadow-2xl"
          >
            <h3 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Secure Your Crypto?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who trust CoinFort with their digital assets.
            </p>
            <Link
              to="/wallet"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Start Managing Wallets
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
