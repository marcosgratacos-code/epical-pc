import { z } from "zod";

export const SelectionSchema = z.object({
  cpu: z.string().max(40).optional(),
  mb: z.string().max(40).optional(),
  ram: z.string().max(40).optional(),
  gpu: z.string().max(40).optional(),
  storage: z.array(z.string().max(40)).max(4).optional(),
  psu: z.string().max(40).optional(),
  case: z.string().max(40).optional(),
  cooler: z.string().max(40).optional(),
});
