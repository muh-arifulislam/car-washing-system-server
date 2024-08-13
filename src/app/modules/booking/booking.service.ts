import { startSession } from "mongoose";
import { SLOT_STATUS } from "../slot/slot.constant";
import { Slot } from "../slot/slot.model";
import { TBooking, TBookingInput } from "./booking.interface";
import { Booking } from "./booking.model";
import AppError from "../../errors/AppError";
import { TUser } from "../user/user.interface";

const bookServiceIntoDB = async (user: TUser, payload: TBookingInput) => {
  const session = await startSession();

  const bookingDoc: TBooking = {
    service: payload.serviceId,
    slot: payload.slotId,
    customer: user._id,
    vehicleType: payload.vehicleType,
    vehicleBrand: payload.vehicleBrand,
    vehicleModel: payload.vehicleModel,
    manufacturingYear: payload.manufacturingYear,
    registrationPlate: payload.registrationPlate,
  };

  try {
    //some
    session.startTransaction();

    await Slot.findOneAndUpdate(
      {
        _id: bookingDoc.slot,
      },
      {
        isBooked: SLOT_STATUS.booked,
      },
      { session }
    );

    const result = await Booking.create([bookingDoc], { session });

    await session.commitTransaction();
    await session.endSession();

    return result;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    throw new AppError(400, "Failed to book service!");
  }
};

const getAllBookingFromDB = async () => {
  const result = await Booking.find().populate(["customer", "service", "slot"]);

  return result;
};

const getUsersBookingFromDB = async (user: TUser) => {
  const result = await Booking.find({
    customer: user._id,
  })
    .populate(["service", "slot"])
    .select("-customer");

  return result;
};

export const BookingServices = {
  bookServiceIntoDB,
  getAllBookingFromDB,
  getUsersBookingFromDB,
};
