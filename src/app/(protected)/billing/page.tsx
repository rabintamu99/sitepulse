import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { PaymentLink } from '@/lib/constant'
import { auth } from '@/auth'
import React from 'react'
import { CheckIcon } from 'lucide-react'
import Navbar from '@/components/navbar'
import { Separator } from '@/components/ui/separator'

export default  async function Billing() {

const session = await auth()

  return (
        <div className="flex items-center justify-center flex-col md:flex-row gap-4 md:gap-8 p-4 md:p-8 overflow-y-auto">
        <CardContainer>
        <CardBody className={`bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black ${session?.user?.plan === 'free' ? 'border-[#bb92ee] ' : 'border-black/[0.1]'}  w-full md:!w-[350px] h-auto rounded-xl p-6 border`}>
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
            <CardItem translateZ={20} className="px-4 py-2 rounded-full border text-xs font-normal">
                {session?.user?.plan === 'free' ? 'Current Plan' : ''}
              </CardItem>
              <CardItem translateZ={20} as="a" href={process.env.STRIPE_MONTHLY_PLAN_LINK + "?prefilled_email=" + session?.user?.email} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                Check Usage →
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        <CardContainer className="inter-var ">
        <CardBody className={`bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black ${session?.user?.plan === 'premium' ? 'border-[#E2CBFF] ' : 'border-white/[0.2]'} border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border`}>
            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark: ">
              Premium Plan
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
            <CardItem translateZ={20} className="px-4 py-2 rounded-full border text-xs font-normal">
                {session?.user?.plan === 'premium' ? 'Current Plan' : '10 Days Free Trial'}
              </CardItem>
              <CardItem translateZ={20} as="a" href={process.env.STRIPE_MONTHLY_PLAN_LINK + "?prefilled_email=" + session?.user?.email} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                Try Now →
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
      </div>
  )
}