import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";
import { VERHICLE_TYPES } from "./booking.constant";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Slot",
      unique: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: [...VERHICLE_TYPES],
    },

    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: Number,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
