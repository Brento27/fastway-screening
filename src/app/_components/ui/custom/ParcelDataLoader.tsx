import React from "react";
import { Skeleton } from "../skeleton";

const ParcelDataLoader = ({ waybill }: { waybill: string }) => {
  return (
    <>
      <h2 className="text-2xl font-bold text-white">Tracking {waybill}</h2>
      <Skeleton className="h-36 w-80  bg-slate-300 md:w-96 lg:w-[380px]" />
      <Skeleton className="h-36 w-80 bg-slate-300 md:w-96 lg:w-[380px]" />
      <Skeleton className="h-36 w-80 bg-slate-300 md:w-96 lg:w-[380px]" />
      <Skeleton className="h-36 w-80 bg-slate-300 md:w-96 lg:w-[380px]" />
    </>
  );
};

export default ParcelDataLoader;
