import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/Appcontext";

const pageVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: { opacity: 1, y: 0 },
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const MyBookings = () => {
	const { axios, currency, user } = useAppContext();
	const [bookings, setBookings] = useState([]);
	const fetchMyBookings = async () => {
		try {
			const { data } = await axios.get("/api/booking/user-bookings");
			if (data.success) {
				setBookings(data.bookings);
			} else {
				toast.error(data.message);
			}
		} catch (e) {
			toast.error(e.message);
		}
	};

	useEffect(() => {
		user && fetchMyBookings();
	}, [user]);
	return (
		<motion.div
			className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
			initial="hidden"
			animate="visible"
			variants={pageVariants}
			transition={{ duration: 0.5, ease: "easeOut" }}
		>
			<Title
				title="My Bookings"
				subTitle="View and manage all your car bookings"
				align="left"
			></Title>

			<div>
				{bookings.map((booking, index) => (
					<motion.div
						key={index}
						className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 border border-borderColor rounded-lg mt-5 first:mt-12 "
						initial="hidden"
						animate="visible"
						variants={itemVariants}
						transition={{ duration: 0.5, delay: index*0.2 }}
					>
						<div className="md:col-span-1">
							<div className="rounded-md overflow-hidden mb-3 ">
								<img
									src={booking.car.image}
									alt=""
									className="w-full h-auto aspect-video object-cover"
								/>
							</div>
							<p className="text-lg font-medium mt-2">
								{booking.car.brand} {booking.car.model}
							</p>
							<p className="text-gray-500 ">
								{booking.car.year} {booking.car.category}{" "}
								{booking.car.location}{" "}
							</p>
						</div>

						<div className="md:col-span-2">
							<div className="flex items-center gap-2">
								<p className="bg-light rounded-full mr-3 px-2 py-1">
									Booking #{index + 1}
								</p>
								<p
									className={`${booking.status === "pending" ? "bg-red-200" : "bg-green-200"} rounded-full px-2 py-1 text-sx `}
								>
									{booking.status}
								</p>
							</div>

							<div className="flex items-start gap-2 mt-3">
								<img
									src={assets.calendar_icon_colored}
									alt=""
									className="w-4 h-4"
								/>
								<div>
									<p className="text-gray-500">
										Rental Period
									</p>
									<p>
										{booking.pickupDate.split("T")[0]} -{" "}
										{booking.returnDate.split("T")[0]}
									</p>
								</div>
							</div>

							<div className="flex items-start gap-2 mt-3">
								<img
									src={assets.location_icon_colored}
									alt=""
									className="w-4 h-4"
								/>
								<div>
									<p className="text-gray-500">
										Pickup Location
									</p>
									<p>{booking.car.location}</p>
								</div>
							</div>
						</div>
						<div className="md:col-span-1 flex flex-col justify-between gap-6">
							<div className="text-sm text-gray-500 text-right">
								<p>Total Price</p>
								<p className="text-lg font-semibold text-black">
									{currency} {booking.price}
								</p>
								<p className="mt-2 ">
									Booked on {booking.createdAt.split("T")[0]}
								</p>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default MyBookings;
