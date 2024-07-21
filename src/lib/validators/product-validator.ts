import { AVAILABLE_COLORS, AVAILABLE_SIZES, AVAILABLE_SORT } from "@/constants";
import { z } from "zod";

export const productFilterValidator = z.object({
  size: z.array(z.enum(AVAILABLE_SIZES)),
  color: z.array(z.enum(AVAILABLE_COLORS)),
  sort: z.enum(AVAILABLE_SORT),
  price: z.tuple([z.number(), z.number()]),
});

export type TProductState = Omit<
  z.infer<typeof productFilterValidator>,
  "price"
> & { price: { isCustom: boolean; range: [number, number] } };
