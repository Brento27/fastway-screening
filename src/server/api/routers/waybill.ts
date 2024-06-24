import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";

interface CompanyInfo {
  contactName: string;
  company: string;
  address1: string;
  address2: string;
  address3: string;
  address4: string;
  address5: string;
  address6: string;
  address7: string;
  address8: string;
  comment: string;
}

export interface ParcelData {
  Type: string;
  Courier: string;
  Description: string;
  Date: string;
  RealDateTime: string;
  Name: string;
  Franchise: string;
  Status: string;
  StatusDescription: string;
  CompanyInfo: CompanyInfo;
  UploadDate: string;
  Signature: string;
  ParcelConnectAgent: string | null; // Assuming this can be any type or null
}

export const waybillRouter = createTRPCRouter({
  getWaybill: publicProcedure
    .input(z.object({ waybill: z.string() }))
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
});
