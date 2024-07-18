'use client'
import React, { useEffect } from 'react'
import { ModeToggle } from '../ui/mode-toogle'
import { Book, Headphones, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { AvatarIcon } from '@radix-ui/react-icons'


type Props = {
    credits: number;
    tier: 'Free' | 'Pro' | 'Unlimited';
  }

const InfoBar = (props: Props) => {
//   const { credits, tier, setCredits, setTier } = useBilling()

//   const onGetPayment = async () => {
//     const response = await onPaymentDetails()
//     if (response) {
//       setTier(response.tier!)
//       setCredits(response.credits!)
//     }
//   }

//   useEffect(() => {
//     onGetPayment()
//   }, [])

  return (
    <div className="flex flex-row justify-end gap-6 items-center px-8 py-4 w-full dark:bg-black ">
      <span className="flex items-center gap-2 font-bold">
        <p className="text-sm font-light">Plan</p>
          <span>Free</span>
      </span>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Headphones />
          </TooltipTrigger>
          <TooltipContent>
            <p>Contact Support</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger>
            <Book />
          </TooltipTrigger>
          <TooltipContent>
            <p>Guide</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AvatarIcon className='w-6 h-6' />
    </div>
  )
}

export default InfoBar