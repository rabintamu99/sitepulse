"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const billingLinks = [
  { name: "Plan Detail", href: "/billing" },
  { name: "Subscriptions", href: "/billing/subscriptions" },
//   { name: "Billing Details", href: "/billing/billing-details" },
//   { name: "Current Usage", href: "/billing/current-usage" },
];

interface ExamplesNavProps extends React.HTMLAttributes<HTMLDivElement> {
  menuItems?: { name: string; href: string }[];
}

export default function Navbar({ className, menuItems = billingLinks, ...props }: ExamplesNavProps) {
  const pathname = usePathname();

  return (
    <div className="relative">
      <div className={cn("my-7 flex items-center", className)} {...props}>
        {menuItems.map((link) => (
          <Link
            href={link.href}
            key={link.href}
            className={cn(
              "flex h-7 items-center justify-center rounded-full px-4 text-center text-sm transition-colors hover:text-primary",
              pathname === link.href
                ? "bg-muted font-medium text-primary"
                : "text-muted-foreground"
            )}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
}