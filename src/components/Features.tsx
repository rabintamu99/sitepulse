"use client";

import Image from 'next/image';
import { WobbleCard } from './ui/wobble-card';

const features = [
  { title: 'Real-time Monitoring', description: 'Get real-time updates on your website’s status.' },
  { title: 'Custom Alerts', description: 'Receive custom alerts for any downtime or issues.' },
  { title: 'Detailed Reports', description: 'Gain deep insights into your website performance with advanced analytics and visualizations.' },
];

export default function Features() {
  return (
    <section id="features" className="py-5">
      <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center  mb-2">Discover the Power of SitePulse</h2>
      <p className="text-center  mb-10">Explore the features that make SitePulse the ultimate tool for website monitoring and performance.</p>
        <div className="grid gap-8 mt-10 md:grid-cols-3">
           <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
            {features[0].title}
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            {features[0].description}
          </p>
        </div>
        <Image
          src="/public/image1.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
          {features[1].title}
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 ">
         {features[1].description}
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] ">
            {features[2].title}
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            {features[2].description}
          </p>
        </div>
        <Image
          src="/public/image1.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
        </div>
      </div>
    </section>
  );
}
