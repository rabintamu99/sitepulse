import React from 'react';
import { prisma } from '@/lib/prisma';
import ViewMonitor from '@/components/monitor/ViewMonitor';


export default async function ViewMonitorPage({params, searchParams}: any) {

  const monitorId = parseInt(searchParams.id, 10);
  const monitorInfo = await prisma.website.findUnique({
    where: {
      id: monitorId,
    },
    include: {
      user: true,
      metrics: true,
    },
  });

  return (
    <div className='h-full w-full overflow-y-auto'>
      <ViewMonitor monitorInfo={monitorInfo} />
    </div>
  );
}