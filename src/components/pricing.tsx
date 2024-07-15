'use client'
import React from 'react';
import { LampContainer } from './ui/lamp';
import { motion } from 'framer-motion';
import { HoverBorderGradient } from './ui/hover-gradient';

const Pricing = () => {
  return (
    <div>
      <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Start for Free at $0.00
       
      </motion.h1>
      <HoverBorderGradient
        containerClassName="rounded-full"
        as="button"
        className="dark:bg-black bg-black text-white dark:text-white flex items-center space-x-2"
      >
        <span>Get Started</span>
      </HoverBorderGradient>
    </LampContainer>
      </div>
  );
};

export default Pricing;