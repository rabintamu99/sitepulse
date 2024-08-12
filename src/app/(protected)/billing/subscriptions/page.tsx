import React from 'react'
import {prisma} from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import SubscriptionsCard from '@/components/ui/animated-card'


export default async function Subscriptions() {

    const subscriptions = await prisma.subscription.findMany(
        {
            include: {
                User: true
            }
        }
    )
    console.log(subscriptions)

  return (
    <div>
      <SubscriptionsCard subscriptions={subscriptions} />
    </div>
  )
}