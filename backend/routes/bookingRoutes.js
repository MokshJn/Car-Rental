import express from "express";
import {
	changeBookingStatus,
	checkAvailabilityWithLocation,
	createBooking,
	getOwnerBookings,
	getUserBookings,
} from "../controllers/bookingController.js";
import { protect } from "../middlewares/auth.js";

const bookingRouter = express.Router();

bookingRouter.post("/check-availability", checkAvailabilityWithLocation);
bookingRouter.post("/create-bookings", protect, createBooking);
bookingRouter.get("/user-bookings", protect, getUserBookings);
bookingRouter.get("/owner-bookings", protect, getOwnerBookings);
bookingRouter.post("/change-status", protect, changeBookingStatus);

export default bookingRouter;
