import { z } from "zod";

// Define metricSchema
const metricSchema = z.object({
  id: z.number(),
  websiteId: z.number(),
  status: z.number(),
  responseTime: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const websitesSchema = z.object({
  id: z.number(),
  url: z.string(),
  status: z.number(),
  responseTime: z.number(),
  updatedAt: z.date().optional(),
  createdAt: z.date().optional(),
  userId: z.string(),
  metrics: z.array(metricSchema).optional(), // Make metrics optional
});

export type WebsiteType = z.infer<typeof websitesSchema>;

export type MetricType = {
  id: number;
  websiteId: number;
  status: number;
  responseTime: number;
  createdAt: Date;
  updatedAt: Date;
};