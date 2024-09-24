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
    <section id="features" className="py-10 bg-green-50 w-full px-4 md:px-10">
      <div className="w-full mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-center">
          Discover the Power of SitePulse
        </h1>
        <p className="text-center mb-10">
          Explore the features that make SitePulse the ultimate tool for website monitoring and performance.
        </p>
        <div className="mt-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5 px-10">
          {/* First WobbleCard at position 1 */}
          <WobbleCard
            containerClassName="col-span-1 bg-white shadow hover:bg-gray-100 rounded-lg"
          >
            <h2 className="text-left text-xl font-semibold text-red-500">
              {features[0].title}
            </h2>
            <p className="mt-2 text-left text-base text-gray-700">
              {features[0].description}
            </p>
            <Image
              src="https://ai-saas-template-aceternity.vercel.app/_next/image?url=%2Fheader.png&w=3840&q=75"
              width={500}
              height={300}
              alt="feature image"
              className="mt-2 rounded-lg max-h-48 object-cover"
            />
          </WobbleCard>

          {/* Second WobbleCard at position 2 */}
          <WobbleCard
            containerClassName="col-span-1 bg-white shadow hover:bg-gray-100 rounded-lg"
          >
            <h2 className="text-left text-xl font-semibold text-red-500">
              {features[1].title}
            </h2>
            <p className="mt-2 text-left text-base text-gray-700">
              {features[1].description}
            </p>
            <Image
              src="https://ai-saas-template-aceternity.vercel.app/_next/image?url=%2Fheader.png&w=3840&q=75"
              width={500}
              height={300}
              alt="feature image"
              className="mt-2 rounded-lg max-h-48 object-cover"
            />
          </WobbleCard>

          {/* Third WobbleCard at position 3 */}
          <WobbleCard
            containerClassName="col-span-1 md:col-span-2 lg:col-span-2 bg-white shadow hover:bg-gray-100 rounded-lg"
          >
            <h2 className="text-left text-xl font-semibold text-red-500">
              {features[2].title}
            </h2>
            <p className="mt-2 text-left text-base text-gray-700">
              {features[2].description}
            </p>
            <Image
              src="https://ai-saas-template-aceternity.vercel.app/_next/image?url=%2Fheader.png&w=3840&q=75"
              width={500}
              height={300}
              alt="feature image"
              className="mt-2 rounded-lg max-h-48 object-cover"
            />
          </WobbleCard>

          {/* Fourth WobbleCard at position 4 */}
          <WobbleCard
            containerClassName="row-span-1 md:row-span-2 col-span-1 lg:col-span-1 bg-white shadow hover:bg-gray-100 rounded-lg"
          >
            <h2 className="text-left text-xl font-semibold text-red-500">
              Right Section
            </h2>
            <p className="mt-2 text-left text-base text-gray-700">
              This section covers the height of the left section.
            </p>
            <Image
              src="https://ai-saas-template-aceternity.vercel.app/_next/image?url=%2Fheader.png&w=3840&q=75"
              width={500}
              height={300}
              alt="feature image"
              className="mt-2 rounded-lg max-h-48 object-cover"
            />
          </WobbleCard>
        </div>
      </div>
    </section>
  );
}
