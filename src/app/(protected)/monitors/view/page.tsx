'use client'

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import ViewMonitor from '@/components/monitor/ViewMonitor';

export default function ViewMonitorPage({ searchParams }: { searchParams: { id: string } }) {
  const [monitorInfo, setMonitorInfo] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const monitorId = parseInt(searchParams.id, 10);

    // Initial fetch
    const fetchMonitorInfo = async () => {
      const { data, error } = await supabase
        .from('Website')
        .select('*, user:userId(*), Metric(*)')
        .eq('id', monitorId)
        .single();

      if (error) console.error('Error fetching monitor info:', error);
      else setMonitorInfo(data);
    };

    fetchMonitorInfo();

    console.log("monitorInfo", monitorInfo)

    // Set up realtime subscription
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

  if (!monitorInfo) return <div>Loading...</div>;

  return (
    <div className='h-full w-full overflow-y-auto'>
      <ViewMonitor monitorInfo={monitorInfo} />
    </div>
  );
}