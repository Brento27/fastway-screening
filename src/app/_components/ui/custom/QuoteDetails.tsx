import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import { cn } from "@/lib/utils";

const QuoteDetails = ({
  from,
  delivery_timeframe_days,
  to,
  delfranchise,
}: {
  from: string;
  delivery_timeframe_days: string;
  to: string;
  delfranchise: string;
}) => {
  return (
    <Card className={cn("w-full", " shadow-md shadow-orange-600")}>
      <CardHeader>
        <CardTitle>Quote Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {/* <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" /> */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2">
          <p className="leaing-none text-md ">
            <span className="font-bold text-orange-500">Pickup location:</span>{" "}
            {from}
          </p>
          <p className="text-md  leading-none">
            <span className="font-bold text-orange-500">Delivery time:</span>{" "}
            {delivery_timeframe_days} days
          </p>
          <p className="text-md  leading-none">
            <span className="font-bold text-orange-500">
              Delivery location:
            </span>{" "}
            {to}
          </p>
          <p className="text-md  leading-none">
            <span className="font-bold text-orange-500">
              Delivery franchise:
            </span>{" "}
            {delfranchise}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuoteDetails;
