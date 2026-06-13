import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/Appcontext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
const CarDetails = () => {
	const {
		navigate,
		axios,
		currency,
		pickupDate,
		setPickupDate,
		returnDate,
		setReturnDate,
	} = useAppContext();
	const { id } = useParams();

	const [car, setCar] = useState(null);
	const [cars, setCars] = useState([]);

	const fetchCars = async () => {
		try {
			const { data } = await axios.get("/api/user/all-cars");
			if (data.success) {
				setCars(data.cars);
				return data.cars;
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		(async () => {
			const carsData = await fetchCars();
			if (carsData) {
				const found = carsData.find((c) => c._id === id);
				setCar(found || null);
			}
		})();
	}, [id]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post("/api/booking/create-bookings", {
				car: id,
				pickupDate,
				returnDate,
			});
			if (data.success) {
				toast.success(data.message);
				navigate("/my-bookings");
			} else {
				toast.error(data.message);
			}
		} catch (e) {
			toast.error(e.message);
		}
	};

	return car ? (
		<motion.div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
			<button
				onClick={() => navigate(-1)}
				className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
			>
				<img
					src={assets.arrow_icon}
					className="rotate-180 opacity-65"
				/>
				Back to all cars
			</button>

			<motion.div
				initial={{ opacity: 0, y: 30 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6, ease: "easeOut" }}
				className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"
			>
				<div className="lg:col-span-2">
					<motion.img
						src={car.image}
						alt=""
						className="w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-md"
						initial={{ opacity: 0, scale: 0.98 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
					/>
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, ease: "easeOut" }}
						className="space-y-6"
					>
						<div>
							<h1 className="text-3xl font-bold">
								{car.brand} {car.model}
							</h1>
							<p className="text-gray-500 text-lg">
								{car.category} {car.year}
							</p>
						</div>
						<hr className="border-borderColor my-6" />
						<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 ">
							{[
								{
									icon: assets.users_icon,
									text: `${car.seating_capacity} Seats`,
								},
								{
									icon: assets.fuel_icon,
									text: `${car.fuel_type}`,
								},
								{
									icon: assets.car_icon,
									text: `${car.transmission}`,
								},
								{
									icon: assets.location_icon,
									text: `${car.location} `,
								},
							].map((item, index) => (
								<motion.div
									initial={{ opacity: 0, y: 10 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.4,
									}}
									key={index}
									className="flex flex-col items-center gap-2 bg-light p-4 rounded-lg"
								>
									<img src={item.icon} className="h-6 mb-1" />
									<p>{item.text}</p>
								</motion.div>
							))}
						</div>

						<div>
							<h1 className="text-xl font-medium mb-3">
								Description
							</h1>
							<p className="text-gray-500">{car.description}</p>
						</div>

						<div>
							<h1 className="text-xl font-medium mb-3">
								Features
							</h1>
							<ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
								{[
									"GPS Navigation",
									"Air Conditioning",
									"Bluetooth",
									"Heated Seats",
									"Sunroof",
									"Leather Seats",
									"Cruise Control",
								].map((feature, index) => (
									<li
										key={index}
										className="flex items-center gap-2 text-gray-500"
									>
										<img
											src={assets.check_icon}
											className="h-4"
										/>
										<p>{feature}</p>
									</li>
								))}
							</ul>
						</div>
					</motion.div>
				</div>

				<motion.form
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6,delay:0.3 }}
					onSubmit={handleSubmit}
					className="shadow-lg h-max sticky top-18 rounded-2xl p-6 space-y-6 text-gray-500"
				>
					<p className="flex items-center justify-between text-2xl text-gray-800 font-semibold">
						{currency}
						{car.pricePerDay}
						<span className="text-base text-gray-400 font-normal">
							{" "}
							per Day
						</span>
					</p>

					<hr className="border-borderColor my-6" />

					<div className="flex flex-row justify-between items-center">
						<label htmlFor="pickupdate">Pickup Date</label>
						<input
							value={pickupDate}
							type="date"
							className="border border-borderColor px-3 py-2 rounded-lg"
							required
							id="pickupdate"
							min={new Date().toISOString().split("T")[0]}
							onChange={(e) => setPickupDate(e.target.value)}
						/>
					</div>

					<div className="flex flex-row justify-between items-center">
						<label htmlFor="returndate">Return Date</label>
						<input
							value={returnDate}
							type="date"
							className="border border-borderColor px-3 py-2 rounded-lg"
							required
							id="returndate"
							onChange={(e) => setReturnDate(e.target.value)}
						/>
					</div>
					<hr className="border-borderColor my-6" />
					<button className="w-full border rounded-xl bg-primary hover:bg-primary-dull py-2 text-white transition-all  cursor-pointer ">
						Book Now
					</button>
					<p className="flex items-center justify-center py-0.5 text-gray-400">
						No credit card required to reserve.
					</p>
				</motion.form>
			</motion.div>
		</motion.div>
	) : (
		<Loader />
	);
};

export default CarDetails;
