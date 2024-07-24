import React from 'react'
import IntegrationComponent from '@/components/IntegrationComponent'

type Props = {}

export default function Connections() {

  return (
    <div className="flex flex-col gap-2 max-w-[1200px] mx-auto mt-5">
      <h1 className="sticky top-0 z-[10] flex items-center justify-between bg-background/50 text-2xl backdrop-blur-lg">
        <span>Connections</span>
      </h1>
      <div className="flex flex-col gap-10 mt-5">
        <div>
          <h2 className="text-2xl font-bold">Integration with Third-Party Services</h2>
          <p className="text-base">
          Connect with popular tools like Slack, Microsoft Teams, or 
          Line for alert management.
          </p>
        </div>
        <IntegrationComponent />
      </div>
    </div>
  )
}