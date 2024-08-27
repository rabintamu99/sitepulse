import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { LockIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Bar, BarChart, LabelList, Rectangle, XAxis, YAxis } from 'recharts'

const SslDomain = ({ monitorInfo }: { monitorInfo: any }) => {
    console.log(monitorInfo)

    const daysLeft = Math.floor((new Date(monitorInfo.sslExpiry).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
    const { data: session, status } = useSession()
    const isFreePlan = session?.user?.plan === "free"
  return (
    <Card className="max-w-xs relative" x-chunk="charts-01-chunk-2">
            {isFreePlan && (
              <div className={`absolute inset-0 flex items-center justify-center dark:bg-black dark:bg-opacity-55 bg-white bg-opacity-75 z-10 rounded-lg`}>
                <Button variant="outline" className="rounded-full" onClick={() => alert('Upgrade Now')}>Upgrade Now</Button>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><LockIcon className="text-green-500"/>Domain & SSL </CardTitle>
              <CardDescription>
                your domain and ssl are both active
              </CardDescription>
            </CardHeader>
            <CardContent className={`grid gap-4 ${isFreePlan ? 'blur-sm' : ''} rounded-lg`}>
              <div className="grid auto-rows-min gap-2">
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                  Jan 1, 2024
                  <span className="text-sm font-normal text-muted-foreground">
                  Domain valid until
                  </span>
                </div>
                <ChartContainer
                  config={{
                    steps: {
                      label: "Steps",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-auto h-[32px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    layout="vertical"
                    margin={{
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    data={[
                      {
                        date: "2024",
                        steps: 1,
                      },
                    ]}
                  >
                    <Bar
                      dataKey="steps"
                      fill="var(--color-steps)"
                      radius={4}
                      barSize={32}
                    >
                      <LabelList
                        position="insideLeft"
                        dataKey="date"
                        offset={8}
                        fontSize={12}
                        fill="white"
                      />
                    </Bar>
                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                    <XAxis dataKey="steps" type="number" hide />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="grid auto-rows-min gap-2">
                <div className="flex items-baseline gap-1 text-2xl font-bold tabular-nums leading-none">
                {new Date(monitorInfo.sslExpiry).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                  <span className="text-sm font-normal text-muted-foreground">
                  SSL valid until
                  </span>
                </div>
                <ChartContainer
                  config={{
                    steps: {
                      label: "Steps",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-auto h-[32px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    layout="vertical"
                    margin={{
                      left: 0,
                      top: 0,
                      right: 0,
                      bottom: 0,
                    }}
                    data={[
                      {
                        date: `${daysLeft} days left`,
                        steps: daysLeft,
                      },
                    ]}
                  >
                    <Bar
                      dataKey="steps"
                      fill="var(--color-steps)"
                      radius={4}
                      barSize={34}
                    >
                      <LabelList
                        position="insideLeft"
                        dataKey="date"
                        offset={8}
                        fontSize={12}
                        fill="hsl(var(--muted-foreground))"
                      />
                    </Bar>
                    <YAxis dataKey="date" type="category" tickCount={1} hide />
                    <XAxis dataKey="steps" type="number" hide />
                  </BarChart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
  )
}

export default SslDomain