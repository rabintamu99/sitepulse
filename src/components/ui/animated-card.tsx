"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface Subscription {
  User: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    image: string | null;
    plan: string;
    customerId: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  endDate: Date;
}

interface SubscriptionsCardProps {
  subscriptions: Subscription[];
}

export default function SubscriptionsCard({ subscriptions }: SubscriptionsCardProps) {
  return (
    <Card>
      <CardTitle>Your Current Plan is {subscriptions[0].User.plan}</CardTitle>
      <CardDescription>
        Your next billing date is {subscriptions[0].endDate.toLocaleDateString()}.
      </CardDescription>
    </Card>
  );
}

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "max-w-sm w-full mx-auto p-8 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
        className
      )}
    >
      {children}
    </div>
  );
};

export const CardTitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "text-lg font-semibold text-gray-800 dark:text-white py-2",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "text-sm font-normal text-neutral-600 dark:text-neutral-400 max-w-sm",
        className
      )}
    >
      {children}
    </p>
  );
};