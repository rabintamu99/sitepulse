"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import MonitoringCard from './ui/monitoring-card';

type SSLInfo = {
  valid_from: string;
  valid_to: string;
  issuer: {
    C: string;
    O: string;
    CN: string;
  };
  subject: {
    C: string;
    O: string;
    CN: string;
  };
};

type SiteStatus = {
  status: string;
  statusCode?: number;
  responseTime?: number;
  ttfb?: number;
  sslInfo?: SSLInfo;
};

export default function AddWebsite() {
  const router = useRouter();
  const [siteStatus, setSiteStatus] = useState<SiteStatus | null>(null);
  const [customUrl, setCustomUrl] = useState<string>('');

  useEffect(() => {
    const checkSiteStatus = async (url: string) => {
      try {
        const response = await fetch(`/api/monitor?url=${encodeURIComponent(url)}`);
        const data = await response.json();
        setSiteStatus(data);
      } catch (error) {
        console.error('Error checking site status:', error);
      }
    };

    if (customUrl) {
      checkSiteStatus(customUrl);
    }
  }, [customUrl]);

  return (
    <div className="flex flex-col w-[1200px] items-center min-w-8xl mx-auto h-screen p-4 fadeIn bg-gray-900 ">
      <h1 className="text-3xl font-bold mb-4">Hi, Welcome back Rabin Gurung 🎉</h1>
      <input
        type="text"
        value={customUrl}
        onChange={(e) => setCustomUrl(e.target.value)}
        placeholder="Enter custom URL"
        className="mb-4 p-2 border border-gray-300 text-black rounded-lg slideUp focus:outline-none focus:border-blue-500 transition-all"
        style={{ animationDelay: '0.2s' }}
      />
      {siteStatus && (
               <div className="flex flex-col items-center mb-4 slideUp " style={{ animationDelay: '0.4s', width: '1200px' }}>
               <MonitoringCard
                 siteName={customUrl}
                 status={siteStatus.status}
                 uptime="18h 46m"
                 checkInterval="3m"
               />
               {/* <div className="mt-4 p-4 bg-gray-800 rounded-lg shadow-lg w-full">
                 <h2 className="text-xl font-semibold mb-2">Site Details</h2>
                 <p>Status: {siteStatus.status}</p>
                 {siteStatus.statusCode && <p>Status Code: {siteStatus.statusCode}</p>}
                 {siteStatus.responseTime && <p>Response Time: {siteStatus.responseTime} ms</p>}
                 {siteStatus.sslInfo && (
                   <div>
                     <p className="mt-2 font-medium">SSL Info:</p>
                     <p>Valid From: {siteStatus.sslInfo.valid_from}</p>
                     <p>Valid To: {siteStatus.sslInfo.valid_to}</p>
                     <p>Issuer: {siteStatus.sslInfo.issuer.O}</p>
                     <p>Subject: {siteStatus.sslInfo.subject.O}</p>
                   </div>
                 )}
               </div> */}
             </div>
      )}
    </div>
  );
}
