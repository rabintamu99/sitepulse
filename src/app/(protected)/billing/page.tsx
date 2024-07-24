import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import React from 'react'


type Props = {}

export default function Billing() {

  return (
    <div className="flex flex-col gap-2 max-w-[1200px] mx-auto mt-5">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between bg-background/50 text-2xl backdrop-blur-lg">
        <span>Billing</span>
      </h1>
      <div className="flex flex-col mt-5">
        <div>
          <h2 className="text-2xl font-bold">Current Plan</h2>
          <p className="text-base">
          Billing Information and Payment Details

          </p>
        </div>
        <div>
        <CardContainer>
          <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:bg-black dark:border-[#E2CBFF] border-black/[0.1] w-full md:!w-[350px] h-auto rounded-xl p-6 border">
            <CardItem translateZ="50" className="text-xl font-bold text-neutral-600 dark: ">
              Free Plan
              <h2 className="text-6xl ">$0</h2>
            </CardItem>
            <CardItem translateZ="60" className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300">
              Perfect for individuals or small teams to get started with website monitoring.
              {/* <ul className="my-4 flex flex-col gap-2">
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
              </ul> */}
            </CardItem>
            <div className="flex justify-between items-center mt-8">
              <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl text-xs font-normal dark:">
                Current Plan
              </CardItem>
              <CardItem translateZ={20} as="button" className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold">
                Upgrade Now →
              </CardItem>
            </div>
          </CardBody>
        </CardContainer>
        </div>
      </div>
    </div>
  )
}