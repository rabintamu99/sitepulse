import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer } from '@/components/ui/chart'
import React from 'react'
import { Bar, BarChart, Rectangle, XAxis } from 'recharts'

const StatusInfo = ({ monitorInfo }: { monitorInfo: any }) => {
  return (
    <Card className="lg:max-w-lg" x-chunk="charts-01-chunk-3">
      <CardHeader className="p-4 pb-0">
        <CardTitle>Website Status</CardTitle>
        <CardDescription>
          {monitorInfo.status === 200 ? "Site is Up" : "Site is Down"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
        <div className="flex items-baseline gap-1 text-green-500 text-3xl font-bold tabular-nums leading-none">
          <span className={monitorInfo.status === 200 ? "text-green-500" : "text-red-500"}>
            {monitorInfo.status === 200 ? "Site is Up" : "Site is Down"}
          </span>
        </div>
        <ChartContainer
          config={{
            steps: {
              label: "Steps",
              color: "hsl(var(--chart-1))",
            },
          }}
          className="ml-auto w-[72px]"
        >
          <BarChart
            accessibilityLayer
            margin={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
            }}
            data={monitorInfo.metrics}
          >
            <Bar
              dataKey="steps"
              fill="var(--color-steps)"
              radius={2}
              fillOpacity={0.2}
              activeIndex={6}
              activeBar={<Rectangle fillOpacity={0.8} />}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={4}
              hide
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export default StatusInfo