import React from 'react'
import Navbar from '@/components/navbar'
import { Separator } from '@/components/ui/separator'

interface BillingLayoutProps {
  children: React.ReactNode
}

export default function BillingLayout({ children }: BillingLayoutProps) {
  return (
    <div className="flex flex-col gap-2 max-w-[1100px] mx-auto">
      <div className="flex flex-col mt-5">
        <div>
          <h2 className="text-2xl font-bold">Current Plan</h2>
          <p className="text-base">
            Billing Information and Payment Details
          </p>
        </div>
        <div>
          <Navbar />
          <Separator className="my-4" />
          {children}
        </div>
      </div>
    </div>
  )
}