'use client'

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ViewMonitor from '@/components/monitor/ViewMonitor';
import { fetchMonitorInfo } from '@/app/actions';

export default function ViewMonitorPage({ searchParams }: { searchParams: { id: string } }) {
  const [monitorInfo, setMonitorInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getMonitorInfo = async () => {
      try {
        const data = await fetchMonitorInfo(searchParams.id);
        setMonitorInfo(data);
      } catch (error) {
        console.error('Error fetching monitor info:', error);
      } finally {
        setLoading(false);
      }
    };

    getMonitorInfo();

    // Set up realtime subscription
    const monitorId = parseInt(searchParams.id, 10);
    const subscription = supabase
      .channel(`website:${monitorId}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'website', filter: `id=eq.${monitorId}` }, (payload) => {
        console.log('Change received!', payload);
        setMonitorInfo(payload.new);
      })
      .subscribe();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [searchParams.id, supabase]);

  if (loading) return <div>Loading...</div>;

  console.log("monitorInfo", monitorInfo)

  return (
    <div className='h-full w-full overflow-y-auto'>
      <ViewMonitor monitorInfo={monitorInfo} />
    </div>
  );
}