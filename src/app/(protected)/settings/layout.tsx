import React from 'react'
import Navbar from '@/components/navbar'
import { Separator } from '@/components/ui/separator'

interface BillingLayoutProps {
  children: React.ReactNode
}

export default function SettingLayout({ children }: BillingLayoutProps) {
  const customMenuItems = [
    { name: "Profile", href: "/settings" },
    { name: "Account", href: "/settings/account" },
    { name: "Other Settings", href: "/settings/contact" },
  ];

  return (
    <div className="flex flex-col gap-2 max-w-[1200px] mx-auto">
      <div className="flex flex-col mt-5">
        <div>
          <h2 className="text-2xl font-bold">Settings</h2>
          <p className="text-base">
            Change your settings here.
          </p>
        </div>
        <div>
          <Navbar menuItems={customMenuItems} />
          <Separator className="my-4" />
          {children}
        </div>
      </div>
    </div>
  )
}