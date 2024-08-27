"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"



const chartConfig = {
    responseTime: {
      label: "Response Time",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-2))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

interface Metric {
  id: number;
  status: number;
  createdAt: string;
  updatedAt: string;
  websiteId: number;
  responseTime: number;
}

interface MonitorInfo {
  id: number;
  url: string;
  status: number;
  responseTime: number;
  metrics: Metric[];
}

export default function ResponseChart({ monitorInfo }: { monitorInfo: MonitorInfo }) {
  const [timeRange, setTimeRange] = React.useState("1d")

  const getFilteredData = (days: number) => {
    if (!monitorInfo?.metrics || !Array.isArray(monitorInfo.metrics)) {
      console.log("Metric array is invalid");
      return []
    }

    // Sort metrics by createdAt in descending order
    const sortedMetrics = [...monitorInfo.metrics].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    const now = new Date()
    const startDate = new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
    console.log("Start date:", startDate);

    const filteredData = sortedMetrics
      .filter((metric) => {
        const metricDate = new Date(metric.createdAt);
        return metricDate >= startDate && metricDate <= now;
      })
      .map((metric) => ({
        date: metric.createdAt,
        responseTime: metric.responseTime
      }));

    console.log("Filtered data:", filteredData);
    return filteredData.reverse(); // Reverse to show oldest data first
  }

  const chartData = React.useMemo(() => {
    const days = timeRange === "1d" ? 1 : timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90
    console.log("Selected time range:", timeRange, "days:", days);
    return getFilteredData(days)
  }, [timeRange, monitorInfo])

  console.log("Final chartData:", chartData);

  if (!monitorInfo?.metrics || monitorInfo.metrics.length === 0) {
    return <Card><CardContent>No data available</CardContent></Card>
  }

  const formatDate = (date: Date | string) => {
    const dateObject = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObject.getTime())) {
      console.error("Invalid date:", date);
      return "Invalid Date";
    }
    return dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Response Time, ms</CardTitle>
          <CardDescription>
            Showing total visitors for the last {timeRange}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="1d" className="rounded-lg">
              Last 24 hrs
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => formatDate(value)}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => formatDate(value)}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="responseTime"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-mobile)"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}