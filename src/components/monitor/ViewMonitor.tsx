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
import { Button } from "../ui/button"
import { ConstantColorFactor } from "three"

declare module "next-auth" {
  interface User {
    plan?: string;
  }
}

export default function ViewMonitor({ monitorInfo }: any) {
  const displayUrl = monitorInfo.url.replace(/^https?:\/\//, '');
  const formattedUpdatedAt = formatDistanceToNow(new Date(monitorInfo.updatedAt), { addSuffix: true });
  const sslExpiryDate = new Date(monitorInfo.sslInfo.valid_to);
    const daysLeft = Math.ceil((sslExpiryDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const { data: session, status } = useSession()
  const isFreePlan = session?.user?.plan === "free"
  
  
  const getLastSevenDaysMetrics = (metrics: any[]) => {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return metrics
      .filter(metric => new Date(metric.createdAt) >= sevenDaysAgo)
      .map(metric => ({
        date: new Date(metric.createdAt).toISOString().split('T')[0], // Format date as YYYY-MM-DD
        status: metric.status === 200 ? 1 : 0, // Assuming 1 for "Up" and 0 for "Down"
      }));
  };

  const getLast24HoursMetrics = (metrics: any[]) => {
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    return metrics
      .filter(metric => new Date(metric.createdAt) >= oneDayAgo)
      .map(metric => ({
        date: new Date(metric.createdAt).toISOString().split('T')[0], // Format date as YYYY-MM-DD
        status: metric.status === 200 ? 1 : 0, // Assuming 1 for "Up" and 0 for "Down"
      }));
  };

  const metricsData = getLastSevenDaysMetrics(monitorInfo.metrics);
  const last24HoursData = getLast24HoursMetrics(monitorInfo.metrics);

  console.log(getLastSevenDaysMetrics(monitorInfo.metrics))
  console.log(metricsData)
  console.log(last24HoursData)

  return (
    <>
      <div className="mx-6 max-w-full">
        <Link href="/monitors" className="text-muted-foreground hover:underline mb-4 inline-block">
          ← Back to Monitors
        </Link>
        
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center"> 
          <div className="flex relative">
            <span className={`w-3 h-3 ${monitorInfo.status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full`}></span>
            <span className={`w-3 h-3 animate-ping ${monitorInfo.status === 200 ? "bg-green-500" : "bg-red-500"} rounded-full absolute top-0 left-0`}></span>
          </div>
          <div className="flex flex-col ml-2">
            <h1 className="font-medium text-2xl sm:text-3xl flex items-center gap-2">
              {displayUrl}
            </h1>
            <div className="text-xs text-muted-foreground mt-1">
              <span className="font-medium">Website URL:</span> <Link className="hover:underline" href={`${monitorInfo.url}`}>{monitorInfo.url}</Link>
              <span className="font-medium ml-2">Last checked:</span> {formattedUpdatedAt}
            </div>
          </div>
        </div>
      </div>
      <div className="chart-wrapper mx-auto grid w-full grid-cols-1 sm:grid-cols-2 gap-4 sm:p-5">
        <div className="grid w-[900px] gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    data={metricsData}
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
                  Over the last 24 hours, average response time was {monitorInfo.responseTime}ms
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-row items-baseline gap-4 p-4 pt-0">
                <div className="flex items-baseline gap-1 text-3xl font-bold tabular-nums leading-none">
                  {monitorInfo.responseTime}
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
                    data={last24HoursData}
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
          <div className="w-full">
            <LineChartComponent />
          </div>
        </div>
        <div className="grid w-full justify-end gap-6">
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
                {new Date(monitorInfo.sslInfo.valid_to).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
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
        </div>
      </div>
    </>
  )
}