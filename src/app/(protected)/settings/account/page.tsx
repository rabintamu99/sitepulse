import AccountComponent from '@/components/setting/AccountComponent';
import ProfileComponent from '@/components/setting/ProfileComponent';
import React from 'react'

export default function AccountSetting() {

  return (
    <div className="flex flex-col gap-2 max-w-[1100px] mt-5">
      <AccountComponent />
    </div>
  )
}