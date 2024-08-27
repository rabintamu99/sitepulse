"use client"

import { formatDistanceToNow } from 'date-fns';
import Link from "next/link"
import { useSession } from "next-auth/react"
import StatusInfo from "./widgets/status"
import ResponseInfo from "./widgets/response"
import SslDomain from "./widgets/sslDomain"
import PerformanceInfo from "./widgets/performance"
import ResponseChart from "./widgets/responesChart"
import Incidents from "./widgets/incidents"


declare module "next-auth" {
  interface User {
    plan?: string;
  }
}

export default function ViewMonitor({ monitorInfo }: any) {
  const displayUrl = monitorInfo.url.replace(/^https?:\/\//, '');
  const formattedUpdatedAt = formatDistanceToNow(new Date(monitorInfo.updatedAt), { addSuffix: true });
  const sslExpiryDate = new Date(monitorInfo.sslExpiry);
    const daysLeft = Math.ceil((sslExpiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const { data: session, status } = useSession()
  const isFreePlan = session?.user?.plan === "free"

  return (
    <>
      <div className="mx-6 max-w-full">
        <Link href="/monitors" className="text-muted-foreground hover:underline mb-4 inline-block">
          ← Back to Monitors
        </Link>
        
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center"> 
          <div className="flex relative">
            <span className={`w-3 h-3 ${monitorInfo.status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full`}></span>
            <span className={`w-3 h-3 animate-ping ${monitorInfo.status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full absolute top-0 left-0`}></span>
          </div>
          <div className="flex flex-col ml-2">
            <h1 className="font-medium text-2xl sm:text-3xl flex items-center gap-2">
              {displayUrl}
            </h1>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="font-medium">Website URL:</span> <Link className="hover:underline" href={`${monitorInfo.url}`}>{monitorInfo.url}</Link>
              <span className="font-medium ml-2">Last checked:</span> {formattedUpdatedAt}
            </div>
          </div>
        </div>
      </div>
      <div className="chart-wrapper mx-auto w-full p-5">
        <div className="grid gap-6 max-w-full mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <StatusInfo monitorInfo={monitorInfo} />
            <ResponseInfo monitorInfo={monitorInfo} />
            <SslDomain monitorInfo={monitorInfo} />
            <PerformanceInfo monitorInfo={monitorInfo} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <ResponseChart monitorInfo={monitorInfo} />
            {/* <Incidents monitorInfo={monitorInfo} /> */}
          </div>
        </div>
      </div>
    </>
  )
}