// import Ripple from '@/components/magicui/ripple'
// import React from 'react'

// const loading = () => {
//   return (
//     <div>
//         <Ripple numCircles={10} mainCircleOpacity={0.3} mainCircleSize={1} />
//     </div>
//   )
// }

// export default loading

"use client"
import React from "react";
import { motion } from "framer-motion";

export default function Ripple() {
  const RIPPLE_VARIANTS = {
    start: {
      opacity: 1,
      scale: 0,
    },
    end: {
      opacity: 0,
      scale: 3,
    },
  };
 
  const RIPPLE_TRANSITION$ = {
    duration: 2,
    ease: "easeInOut",
    repeat: Number.POSITIVE_INFINITY,
    repeatDelay: 1,
  };
 
  return (
    <>
      <div className="flex flex-col items-center justify-center w-10 h-10">
        <motion.div
          className="absolute w-full h-full rounded-full opacity-0 bg-neutral-500"
          variants={RIPPLE_VARIANTS}
          initial="start"
          animate="end"
          transition={RIPPLE_TRANSITION$}
        />
        <motion.div
          className="absolute w-full h-full rounded-full opacity-0 bg-neutral-500"
          variants={RIPPLE_VARIANTS}
          initial="start"
          animate="end"
          transition={{ ...RIPPLE_TRANSITION$, delay: 0.5 }}
        />
        <motion.div
          className="absolute w-full h-full rounded-full opacity-0 bg-neutral-500"
          variants={RIPPLE_VARIANTS}
          initial="start"
          animate="end"
          transition={{ ...RIPPLE_TRANSITION$, delay: 1 }}
        />
      </div>
      
      </>
  );
}