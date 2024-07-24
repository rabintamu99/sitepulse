import React from 'react'

export default function Settings() {

  return (
    <div className="flex flex-col gap-2 max-w-[1200px] mx-auto mt-5">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between bg-background/50 text-2xl backdrop-blur-lg">
        <span>Settings</span>
      </h1>
      <div className="flex flex-col gap-10 mt-5">
        <div>
          <h2 className="text-2xl font-bold">User Profile</h2>
          <p className="text-base">
          Configure your preferences and account settings
          </p>
        </div>
      </div>
    </div>
  )
}