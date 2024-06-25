import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import { TRPCError } from "@trpc/server";
import { FranchiseInfo } from "@/Types/Franchise";
import { LocationData } from "@/Types/Location";
import { z } from "zod";
import { QuotePriceCalculationSchema } from "@/validation/QuotePriceCalculation";
import { QuoteDetails } from "@/Types/Quotes";

export const quoteRouter = createTRPCRouter({
  getLocation: publicProcedure
    .input(
      z.object({
        town: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      try {
        const res = await fetch(`${env.LOCATION_API_URL}&term=${input.town}`);

        if (!res.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch data: ${res.statusText}`,
          });
        }

        // Read the response text
        const text = await res.text();

        // Extract JSON data from the JSONP response
        const jsonpData = text.match(/callback\((.*)\)/);
        if (!jsonpData || jsonpData.length < 2) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to parse JSONP response",
          });
        }
        // Parse the extracted JSON string
        /*eslint-disable*/
        const data = JSON.parse(jsonpData[1]!);

        // Return the parsed data
        console.log(data.result);
        return data.result as LocationData[];
      } catch (error) {
        console.log(error);
        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unexpected error occurred",
        });
      }
    }),
  getPriceCalculationQuote: publicProcedure
    .input(QuotePriceCalculationSchema)
    .mutation(async ({ input }) => {
      try {
        // const res = await fetch(
        //   `${env.API_URL}/latest/psc/pickuprf/${input.postcode}/${env.API_COUNTRY_CODE}?api_key=${env.API_KEY}`,
        // );

        // if (!res.ok) {
        //   throw new TRPCError({
        //     code: "BAD_REQUEST",
        //     message: `Failed to fetch data: ${res.statusText}`,
        //   });
        // }

        // const data = await res.json();

        // if (data.error) {
        //   throw new TRPCError({
        //     code: "INTERNAL_SERVER_ERROR",
        //     message: data.error,
        //   });
        // }

        let dimensions = "";

        if (input.length && input.width && input.height) {
          dimensions = `&LengthInCm=${input.length}&WidthInCm=${input.width}&HeightInCm=${input.height}`;
        }

        const quoteRes = await fetch(
          `${env.API_URL}/latest/psc/lookup/${env.API_FRANCHISE_CODE}/${input.sendingToTown}/${input.postcode}?WeightInKg=${input.weight}${dimensions}&api_key=${env.API_KEY}`,
        );

        if (!quoteRes.ok) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: `Failed to fetch data: ${quoteRes.statusText}`,
          });
        }

        const quoteData = await quoteRes.json();

        if (quoteData.error) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: quoteData.error,
          });
        }

        console.log(quoteData.result);

        return quoteData.result as QuoteDetails;
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
