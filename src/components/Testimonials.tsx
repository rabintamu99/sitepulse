"use client";

import { InfiniteMovingCards } from './ui/infinate-moving-cards';

const testimonials = [
    {
      quote: "SitePulse has revolutionized the way we monitor our website's performance. The real-time insights are invaluable.",
      name: "Alice Johnson",
      title: "Marketing Manager",
    },
    {
      quote: "The detailed analytics provided by SitePulse have helped us identify and fix issues quickly, improving our user experience.",
      name: "Bob Smith",
      title: "Web Developer",
    },
    {
      quote: "I love how easy it is to use SitePulse. The interface is intuitive, and the data is presented in a clear and actionable way.",
      name: "Carol White",
      title: "Product Manager",
    },
    {
      quote: "SitePulse's uptime monitoring has been a game-changer for us. We can now address issues before they impact our users.",
      name: "David Brown",
      title: "IT Director",
    },
    {
      quote: "The customer support from SitePulse is top-notch. They are always available to help and provide excellent guidance.",
      name: "Eve Davis",
      title: "Customer Support Lead",
    },
  ];

export default function Testimonials() {
    return (
        <section id="testimonials" className="py-20 bg-[#0a0a0a]">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-2">What Our Users Are Saying</h2>
            <p className="text-center text-white mb-10">Real feedback from real users who have experienced the power of SitePulse.</p>
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </section>
      );
    }
    
