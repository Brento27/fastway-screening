import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../table";

import { cn } from "@/lib/utils";
import { DeliveryService } from "@/Types/Quotes";

const Service = ({
  option,
  service,
}: {
  option: number;
  service: DeliveryService;
}) => {
  return (
    <Card className={cn("w-full", "mt-8 shadow-md shadow-orange-600")}>
      <CardHeader>
        <CardDescription>Option {option + 1}</CardDescription>
        <CardTitle>{service.type}</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">
                {service.type === "Satchel" ? "Satchel size" : "Label colour"}
              </TableHead>
              <TableHead className="w-[200px]">Price (Excl VAT)</TableHead>
              <TableHead>
                Weight limit covered by{" "}
                {service.type === "Satchel" ? "satchel" : "label"} (Kg)
              </TableHead>
              <TableHead className="text-right">Excess labels</TableHead>
              <TableHead className="text-right">
                Excess label price (excl VAT)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                {service.labelcolour}
              </TableCell>
              <TableCell>
                R{service.labelprice_normal_exgst} - R
                {(service.totalprice_normal_exgst + 5.0).toFixed(2)}
              </TableCell>
              <TableCell>{service.baseweight}</TableCell>
              <TableCell className="text-right">
                {service.excess_labels_required > 0
                  ? service.excess_labels_required
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                {" "}
                {service.excess_labels_required > 0
                  ? service.excess_label_price_normal_exgst
                  : "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Service;
