'use client'
import React from 'react';
import { LampContainer } from './ui/lamp';
import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { CardContainer, CardBody, CardItem } from './ui/3d-card';

const Pricing = () => {
  return (
    <div>
      {/* <LampContainer>
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
          Start for Free at $0
        </motion.h1>
      </LampContainer> */}
      <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8 mt-8">
        <CardContainer className="inter-var ">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark: ">
              Free Plan
              <h2 className="text-6xl ">$0</h2>
            </CardItem>
            <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Perfect for individuals or small teams to get started with website monitoring.
              <ul className="my-4 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Monitor up to 1 website
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Basic Uptime Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Basic Performance Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Monthly Performance Reports
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Email Alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Community Access
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">
              <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:">
                Try now →
              </CardItem>
              <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                Get Started Now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var ">
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-[#E2CBFF] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark: ">
              Starter Plan
              <h2 className="text-6xl ">$5</h2>
            </CardItem>
            <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Ideal for growing businesses looking for advanced website monitoring features.
              <ul className="my-4 flex flex-col gap-2">
                <li className="flex items-center gap-2">
                  <CheckIcon /> Monitor up to 10 websites
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Detailed Performance Monitoring
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Weekly Performance Reports
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Real-time Email and SMS Alerts
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Basic Error Tracking
                </li>
                <li className="flex items-center gap-2">
                  <CheckIcon /> Community Access
                </li>
              </ul>
            </CardItem>
            <div className="flex justify-between items-center mt-8">
              <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:">
                Try now →
              </CardItem>
              <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                Get Started Now
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
    </div>
  );
};

export default Pricing;
