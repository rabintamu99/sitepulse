"use client";

import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Olivia",
    username: "@oliviaSiteMgr",
    body: "This app gives me peace of mind knowing that I’ll be notified immediately if something goes wrong with my site. Fantastic tool!",
    img: "https://avatar.vercel.sh/olivia",
  },
  {
    name: "Liam",
    username: "@liamSysAdmin",
    body: "Monitoring multiple websites used to be a hassle, but this app makes it simple and efficient. It’s a must-have for any system admin.",
    img: "https://avatar.vercel.sh/liam",
  },
  {
    name: "Lucas",
    username: "@lucasDevOps",
    body: "The ability to track uptime over time has really helped us improve our service reliability. A true asset for any DevOps team.",
    img: "https://avatar.vercel.sh/lucas",
  },
  {
    name: "Ava",
    username: "@avaWebConsult",
    body: "I love the user-friendly interface and the comprehensive reports. It’s easy to manage all my clients’ sites in one place!",
    img: "https://avatar.vercel.sh/ava",
  },
  {
    name: "Noah",
    username: "@noahWebMaster",
    body: "The customization options for monitoring and notifications are just what I needed. Now I can focus on growth, not downtime.",
    img: "https://avatar.vercel.sh/noah",
  },
  {
    name: "Ella",
    username: "@ellaCloudEng",
    body: "The real-time status page is a game changer for transparency with my clients. They appreciate the updates, and I love the control.",
    img: "https://avatar.vercel.sh/ella",
  },
  {
    name: "Emily",
    username: "@emilyTech",
    body: "This monitoring tool has saved me countless hours. Real-time alerts keep my sites running smoothly.",
    img: "https://avatar.vercel.sh/emily",
  },
  {
    name: "David",
    username: "@davidWebDev",
    body: "The uptime insights and detailed metrics are invaluable for my web development projects. Highly recommended!",
    img: "https://avatar.vercel.sh/david",
  },
  {
    name: "Sophia",
    username: "@sophiaOps",
    body: "I can’t imagine managing my client sites without this tool. The automated incident notifications are a game-changer.",
    img: "https://avatar.vercel.sh/sophia",
  },
  {
    name: "Michael",
    username: "@michaelAdmin",
    body: "From ease of use to the detailed reporting, this app has everything I need to ensure my websites are always up and running.",
    img: "https://avatar.vercel.sh/michael",
  },
];


const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-40 w-full cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export default function MarqueeDemoVertical() {
  return (
    <section id="testimonials" className="py-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-2">What Our Users Are Saying</h2>
        <p className="text-center mb-10">Real feedback from real users who have experienced the power of SitePulse.</p>
        
        <div className="relative flex h-[500px] w-full flex-row items-center justify-center overflow-hidden rounded-lg">
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            {firstRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover vertical className="[--duration:20s]">
            {secondRow.map((review) => (
              <ReviewCard key={review.username} {...review} />
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white dark:from-background"></div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white dark:from-background"></div>
        </div>
      </div>
    </section>
  );
}
