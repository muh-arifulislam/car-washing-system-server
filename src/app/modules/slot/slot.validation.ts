import { z } from "zod";

const createSlotSchema = z.object({
  body: z.object({
    service: z.string(),
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const SlotValidations = { createSlotSchema };
