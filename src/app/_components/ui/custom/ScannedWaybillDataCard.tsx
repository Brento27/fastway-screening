"use client";
import {
  BellRing,
  Check,
  PackageCheck,
  PackageOpen,
  Truck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/_components/ui/card";

function getTypeDescription(scanType: string): string {
  switch (scanType) {
    case "P":
      return "Pickup";
    case "T":
      return "In Transit";
    case "D":
      return "Delivered";
    default:
      return "Unknown Type";
  }
}

function getTypeIcon(scanType: string): React.ReactNode {
  switch (scanType) {
    case "P":
      return <PackageCheck />;
    case "T":
      return <Truck />;
    case "D":
      return <PackageOpen />;
    default:
      return <></>;
  }
}

export function ScannedWaybillDataCard({
  scanType,
  description,
  date,
  location,
}: {
  scanType: string;
  description: string;
  date: string;
  location: string;
}) {
  return (
    <Card className={cn("w-[380px]")}>
      <CardHeader>
        <CardTitle>{getTypeDescription(scanType)}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="mb-4 grid grid-cols-[25px_1fr] items-start gap-2 pb-4 last:mb-0 last:pb-0">
          {getTypeIcon(scanType)}
          {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              Date/Time: {date}
            </p>
            <p className="text-muted-foreground text-sm">
              Location: {location}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
