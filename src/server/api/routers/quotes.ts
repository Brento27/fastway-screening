import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { ParcelData } from "@/Types/Parcel";

export const quoteRouter = createTRPCRouter({
  getQuote: publicProcedure
    .input(z.object({ waybill: z.string() }))
    .mutation(async ({ input }) => {}),
});
