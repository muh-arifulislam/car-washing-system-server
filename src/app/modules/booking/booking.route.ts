import { Router } from "express";
import { BookingControllers } from "./booking.controller";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import validateAuth from "../../middlewares/validateAuth";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

router.post(
  "/",
  validateAuth(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingSchema),
  BookingControllers.bookService
);

router.get(
  "/",
  validateAuth(USER_ROLE.admin),
  BookingControllers.getAllBookings
);

router.get(
  "/my-bookings",
  validateAuth(USER_ROLE.user),
  BookingControllers.getUsersBooking
);

export const BookingRoutes = router;
