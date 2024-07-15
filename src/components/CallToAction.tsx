"use client";

import { FC } from 'react';

const CallToAction: FC = () => {
  return (
    <section id="cta">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-white">Ready to get started?</h2>
        <p className="mt-4 text-lg text-blue-200">Sign up now and monitor your website with SitePulse.</p>
        <button className="px-6 py-3 mt-6 text-lg font-semibold text-blue-600 bg-white rounded-md hover:bg-gray-200">
          Get Started
        </button>
      </div>
    </section>
  );
}

export default CallToAction;
