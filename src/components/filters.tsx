import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Bug,
  Circle,
  PackagePlus,
  ScrollText,
  Timer,
  XCircle,
} from "lucide-react";

export const status_options = [
  {
    value: 200,
    label: "Up",
    icon: ArrowUp,
  },
  {
    value: 500,
    label: "Down",
    icon: ArrowDown,
  },
  {
    value: "ALL",
    label: "All",
    icon: Circle,
  },
];

export const label_options = [
  {
    value: "30 seconds",
    label: "30 seconds",
    icon: Bug,
  },
  {
    value: "1 minute",
    label: "1 minute",
    icon: PackagePlus,
  },
  {
    value: "5 minutes",
    label: "5 minutes",
    icon: ScrollText,
  },
];


