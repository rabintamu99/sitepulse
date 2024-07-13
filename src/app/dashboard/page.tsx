"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
export default function Home() {
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
    <div className="flex flex-col items-center justify-center h-screen mx-auto p-4 fadeIn">
      <h1 className="text-3xl font-bold mb-4 slideUp">Welcome to SitePulse</h1>
      <input
        type="text"
        value={customUrl}
        onChange={(e) => setCustomUrl(e.target.value)}
        placeholder="Enter custom URL"
        className="mb-4 p-2 border border-gray-300 text-black rounded slideUp"
        style={{ animationDelay: '0.2s' }}
      />
      {siteStatus && (
        <div className="mb-4 slideUp" style={{ animationDelay: '0.4s' }}>
          <p>Status: {siteStatus.status}</p>
          {siteStatus.statusCode && <p>Status Code: {siteStatus.statusCode}</p>}
          {siteStatus.responseTime && <p>Response Time: {siteStatus.responseTime}</p>}
          {siteStatus.ttfb && <p>TTFB: {siteStatus.ttfb}</p>}
          {siteStatus.sslInfo && (
            <div>
              <p>SSL Info:</p>
              <p>Valid From: {siteStatus.sslInfo.valid_from}</p>
              <p>Valid To: {siteStatus.sslInfo.valid_to}</p>
              <p>Issuer:</p>
              <p>C: {siteStatus.sslInfo.issuer.C}</p>
              <p>O: {siteStatus.sslInfo.issuer.O}</p>
              <p>CN: {siteStatus.sslInfo.issuer.CN}</p>
              <p>Subject:</p>
              <p>C: {siteStatus.sslInfo.subject.C}</p>
              <p>O: {siteStatus.sslInfo.subject.O}</p>
              <p>CN: {siteStatus.sslInfo.subject.CN}</p>
            </div>
          )}
        </div>
      )}
      <Link href="/dashboard">
        <p className="text-blue-500 slideUp" style={{ animationDelay: '0.6s' }}>Go to Dashboard</p>
      </Link>
    </div>
  );
}
