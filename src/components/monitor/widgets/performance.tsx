import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import { useSession } from 'next-auth/react'
import React from 'react'
import { Bar, BarChart, PolarAngleAxis, RadialBar, RadialBarChart, Rectangle, XAxis } from 'recharts'

const PerformanceInfo = ({ monitorInfo }: { monitorInfo: any }) => {
      const { data: session, status } = useSession()
  const isFreePlan = session?.user?.plan === "free"
  return (
    <Card className="max-w-xs relative" x-chunk="charts-01-chunk-5">
            {isFreePlan && (
              <div className="absolute inset-0 flex items-center justify-center dark:bg-black dark:bg-opacity-55 bg-white bg-opacity-75 z-10 rounded-lg">
                <Button variant="outline" className="rounded-full" onClick={() => alert('Upgrade Now')}>Upgrade Now</Button>
              </div>
            )}
            <CardContent className={`flex gap-4 p-4 ${isFreePlan ? 'blur-sm' : ''} rounded-lg`}>
              <div className="grid items-center gap-2">
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">Page Load Time</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    562/600
                    <span className="text-sm font-normal text-muted-foreground">ms</span>
                  </div>
                </div>
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">TTFB</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    73/120
                    <span className="text-sm font-normal text-muted-foreground">ms</span>
                  </div>
                </div>
                <div className="grid flex-1 auto-rows-min gap-0.5">
                  <div className="text-sm text-muted-foreground">DNS lookup time</div>
                  <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                    8
                    <span className="text-sm font-normal text-muted-foreground">ms</span>
                  </div>
                </div>
              </div>
              <ChartContainer
                config={{
                  move: {
                    label: "Move",
                    color: "hsl(var(--chart-1))",
                  },
                  exercise: {
                    label: "Exercise",
                    color: "hsl(var(--chart-2))",
                  },
                  stand: {
                    label: "Stand",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="mx-auto aspect-square w-full max-w-[80%]"
              >
                <RadialBarChart
                  margin={{
                    left: -10,
                    right: -10,
                    top: -10,
                    bottom: -10,
                  }}
                  data={[
                    {
                      activity: "stand",
                      value: (8 / 12) * 100,
                      fill: "var(--color-stand)",
                    },
                    {
                      activity: "exercise",
                      value: (46 / 60) * 100,
                      fill: "var(--color-exercise)",
                    },
                    {
                      activity: "move",
                      value: (245 / 360) * 100,
                      fill: "var(--color-move)",
                    },
                  ]}
                  innerRadius="20%"
                  barSize={24}
                  startAngle={90}
                  endAngle={450}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    dataKey="value"
                    tick={false}
                  />
                  <RadialBar dataKey="value" background cornerRadius={5} />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>
  )
}

export default PerformanceInfo