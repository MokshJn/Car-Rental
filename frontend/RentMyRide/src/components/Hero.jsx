import React, { useState } from "react";
import { cityList ,  } from "../assets/assets";
import Card from "./Card";
import { useAppContext } from "../context/Appcontext";
import { motion } from "framer-motion";

const Hero = () => {
	const [PickupLocation, setPickupLocation] = useState("");

	const {navigate , pickupDate , setPickupDate, returnDate , setReturnDate} = useAppContext() ; 
	const submitHandler = (e) => {
		e.preventDefault();
		navigate("/cars?pickupLocation=" + PickupLocation + "&pickupDate=" + pickupDate + "&returnDate=" + returnDate);
	}
	return (
		<motion.div 
		initial={{ opacity:0}}
		animate={{ opacity:1}}
		transition={{duration:0.8 }}
		className="h-screen flex flex-col items-center justify-center gap-14 bg-light text-center ">
			<motion.h1 
			initial={{y:50 , opacity:0}}
			animate={{y:0 , opacity:1}}
			transition={{duration:0.8 , delay:0.2}}
			className="text-4xl md:text-5xl font-semibold">
				Luxury Rides on Rent
			</motion.h1>

			<motion.form 
			initial={{y:50 , opacity:0 , scale:0.95}}
			animate={{y:0 , opacity:1,scale:1 }}
			transition={{duration:0.6 , delay:0.4}}

			onSubmit={(e) => submitHandler(e)} className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 rounded-lg md:rounded-full w-full max-w-80 md:max-w-200 bg-white shadow-[0ox_8px_20px_rgb(0,0,0,0.1)]">
				<div className="flex flex-col md:flex-row items-start md:items-center gap-10  md:ml-8">
					<div className="flex flex-col items-start gap-2">
						<select
							required
							onChange={(e) => setPickupLocation(e.target.value)}
						>
							<option value="">Pickup Location</option>
							{cityList.map((city) => (
								<option value={city} key={city}>
									{city}
								</option>
							))}
						</select>
						<p className="px-1 text-sm text-gray-500">
							{PickupLocation
								? PickupLocation
								: "Please Select Location"}
						</p>
					</div>

					<div className="flex flex-col items-start gap-2">
						<label htmlFor="pickup-date">Pick-up Date</label>
						<input
							type="date"
							id="pickup-date"
							min={new Date().toISOString().split("T")[0]}
							className="text-sm text-gray-500"
							required
							value={pickupDate}
							onChange={(e) => setPickupDate(e.target.value)}
						/>
					</div>

					<div className="flex flex-col items-start gap-2">
						<label htmlFor="return-date">Return Date</label>
						<input
							type="date"
							id="return-date"
							min={new Date().toISOString().split("T")[0]}
							className="text-sm text-gray-500"
							required
							value={returnDate}
							onChange={(e) => setReturnDate(e.target.value)}
						/>
					</div>
				</div>
				<motion.button 
				whileHover={{scale:1.05}}
				whileTap={{scale:0.9}}
				className="flex items-center justify-center gap-6  px-6 py-3 max-sm:mt-4 bg-primary hover:bg-primary-dull text-white rounded-full cursor-pointer">
					Search
					<img
						src="/src/assets/search_icon.svg"
						alt="search"
						className="brightness-300"
					/>
				</motion.button>
			</motion.form>

			<motion.img
				initial={{y:100 , opacity:0}}
				animate={{y:0 , opacity:1}}
				transition={{duration:0.8 , delay:0.6}}
				src={"/src/assets/main_car.png"}
				alt="car"
				className="max-h-74"
			/>

			
		</motion.div>
	);
};

export default Hero;
