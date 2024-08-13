import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

const bookService = catchAsync(async (req, res) => {
  const result = await BookingServices.bookServiceIntoDB(req.user, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getUsersBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getUsersBookingFromDB(req.user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  bookService,
  getAllBookings,
  getUsersBooking,
};
