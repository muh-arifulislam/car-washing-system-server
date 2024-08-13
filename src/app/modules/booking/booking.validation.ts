import { z } from "zod";
import { VERHICLE_TYPES } from "./booking.constant";

const createBookingSchema = z.object({
  body: z.object({
    serviceId: z.string(),
    slotId: z.string(),
    vehicleType: z.enum([...VERHICLE_TYPES]),
    vehicleBrand: z.string(),
    vehicleModel: z.string(),
    manufacturingYear: z.number(),
    registrationPlate: z.string(),
  }),
});

export const BookingValidations = { createBookingSchema };
