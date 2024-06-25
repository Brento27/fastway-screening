import { z } from "zod";

export const QuotePriceCalculationSchema = z.object({
  weight: z.coerce
    .number()
    .min(1, "Weight must be greater than 0 KG")
    .max(30, "Weight must be less than 30 KG"),
  postcode: z.string().length(4, "Postcode must be 4 characters"),
  sendingToTown: z.string().min(3, "Town must be at least 3 characters"),
  length: z.string().optional(),
  height: z.string().optional(),
  width: z.string().optional(),
});
