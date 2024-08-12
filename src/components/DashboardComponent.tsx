"use client"

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  Line,
  LineChart,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ReferenceLine,
  XAxis,
  YAxis,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Separator } from "@/components/ui/separator"
import { BiSolidLockAlt } from "react-icons/bi"
import { formatDistanceToNow } from 'date-fns';
import { PaddingIcon } from "@radix-ui/react-icons"
import { LockIcon } from "lucide-react"
import Link from "next/link"
import  LineChartComponent  from "@/components/ui/line-chart"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"

// Extend the User type to include the plan property
declare module "next-auth" {
  interface User {
    plan?: string;
  }
}

export default function ViewMonitor({ websites }: any) {
//   const displayUrl = websites.url.replace(/^https?:\/\//, '');
//   const formattedUpdatedAt = formatDistanceToNow(new Date(websites.updatedAt), { addSuffix: true });
  const { data: session, status } = useSession()
  const isFreePlan = session?.user?.plan === "premium"

  return (
    <>
    <div className="chart-wrapper mx-auto grid w-[1200px] grid-cols-1 sm:grid-cols-2 gap-6 sm:p-8">
        <div className="grid w-[800px] gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="lg:max-w-md" x-chunk="charts-01-chunk-3">
              <CardHeader className="p-4 pb-0">
                <CardTitle>Website Status</CardTitle>
                <CardDescription>
                  Over the last 7 days, your distance walked and run was 12.5 miles per day.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                <div className="flex items-baseline gap-1 text-green-500 text-3xl font-bold tabular-nums leading-none">
                  <span className={websites.status === 200 ? "text-green-500" : "text-red-500"}>
                    {websites.status === 200 ? "Site is Up" : "Site is Down"}
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
                    data={[
                      { date: "2024-01-01", steps: 200 },
                      { date: "2024-01-02", steps: 200 },
                      { date: "2024-01-03", steps: 200 },
                      { date: "2024-01-04", steps: 200 },
                      { date: "2024-01-05", steps: 200 },
                      { date: "2024-01-06", steps: 200 },
                      { date: "2024-01-07", steps: 200 },
                    ]}
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
            <Card className="max-w-md" x-chunk="charts-01-chunk-3">
              <CardHeader className="p-4 pb-0">
                <CardTitle>Last 24 hours</CardTitle>
                <CardDescription>
                  Over the last 24 hours, average response time was {websites.responseTime}ms
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                  {websites.responseTime}
                  <span className="text-sm font-normal text-muted-foreground">ms</span>
                </div>
                <ChartContainer
                  config={{
                    steps: {
                      label: "Response Time",
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
                    data={[
                      { date: "2024-01-01", steps: 2000 },
                      { date: "2024-01-02", steps: 2100 },
                      { date: "2024-01-03", steps: 2200 },
                      { date: "2024-01-04", steps: 1300 },
                      { date: "2024-01-05", steps: 1400 },
                      { date: "2024-01-06", steps: 2500 },
                      { date: "2024-01-07", steps: 1600 },
                    ]}
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
          </div>
        </div>
       
      </div>
    </>
  )
}