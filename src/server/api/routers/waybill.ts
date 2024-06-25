import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { ParcelData } from "@/Types/Parcel";
import { waybillSchema } from "@/validation/waybill";

export const waybillRouter = createTRPCRouter({
  getWaybill: publicProcedure
    .input(waybillSchema)
    .mutation(async ({ input }) => {
      try {
        const res = await fetch(
          `${env.API_URL}/latest/tracktrace/detail/${input.waybill}?api_key=${env.API_KEY}`,
        );

        if (!res.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch data: ${res.statusText}`,
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parcelData = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (parcelData?.error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            // eslint-disable-next-line
            message: parcelData?.error,
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return parcelData?.result?.Scans as ParcelData[];
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
  getWaybillFromParams: publicProcedure
    .input(waybillSchema)
    .query(async ({ input }) => {
      if (!input.waybill) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Waybill is required",
        });
      }
      try {
        const res = await fetch(
          `${env.API_URL}/latest/tracktrace/detail/${input.waybill}?api_key=${env.API_KEY}`,
        );

        if (!res.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch data: ${res.statusText}`,
          });
        }
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const parcelData = await res.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (parcelData?.error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            // eslint-disable-next-line
            message: parcelData?.error,
          });
        }

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        return parcelData?.result?.Scans as ParcelData[];
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
});
