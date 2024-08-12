import React from 'react'
import IntegrationComponent from '@/components/IntegrationComponent'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { SiGmail } from 'react-icons/si'
import ConnectionCard from '@/components/setting/ConnectComponent'

type Props = {}

export default function Connections() {

  return (
    <div className="flex flex-col gap-2 max-w-[1100px] mx-auto">
      <div className="flex flex-col gap-10 mt-5">
        <div>
          <h2 className="text-2xl font-bold">Integration with Third-Party Services</h2>
          <p className="text-base">
          Connect with popular tools like Slack, Microsoft Teams, or 
          Line for alert management.
          </p>
        </div>
       <ConnectionCard />
      </div>
    </div>
  )
}