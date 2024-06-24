import { z } from "zod";

export const waybillSchema = z.object({
  waybill: z.string().length(12, { message: "Waybill must be 12 characters" }),
});
