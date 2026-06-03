import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/Appcontext";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const Navbar = () => {
	const { setShowLogin, user, logout, isOwner, axios, setIsOwner } =
		useAppContext();
	const Location = useLocation();
	const [open, setOpen] = useState(false); // open state tells whether menu is open or not on mobile display.
	const navigate = useNavigate();

	const changeRole = async () => {
		try {
			const { data } = await axios.post("/api/owner/change-role");
			if (data.success) {
				setIsOwner(true);
				toast.success(data.message);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	return (
		<motion.div
			className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b  border-borderColor relative transition-all ${Location.pathname === "/" && "bg-light"}`}
		>
			<Link to="/">
				<motion.img
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.9 }}
					src="./src/assets/logo.svg"
					alt="logo"
					className="h-8"
				/>
			</Link>
			<div
				className={`max-sm:fixed  max-sm:h-screen max-sm:w-screen max-sm:top-16 max-sm:border-t max-sm:border-borderColor right-0 flex flex-col sm:flex-row items-start sm:items-center gap-4  sm:gap-8 max-sm:p-4  transition-all duration-300 z-50 ${Location.pathname === "/" ? "bg-light" : "bg-white"} ${open ? "max-sm:translate-x-0" : "max-sm:translate-x-full"} `}
			>
				<Link to="/">Home</Link>
				<Link to="/cars">Cars</Link>
				<Link to="/my-bookings">My Bookings</Link>

				<div className="hidden lg:flex items-center text-sm  gap-2 border border-borderColor px-3 rounded-full max-w-56">
					<input
						type="text"
						className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
						placeholder="Search Product "
					/>
					<img src="/src/assets/search_icon.svg" alt="search" />
				</div>

				<div className="flex max-sm:flex-col items-start sm:items-center gap-6">
					<button
						className="cursor-pointer"
						onClick={() =>
							isOwner ? navigate("/owner") : changeRole()
						}
					>
						{isOwner ? "Dashboard" : "List Cars"}
					</button>
					<button
						className="cursor-pointer px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
						onClick={() => {
							user ? logout() : setShowLogin(true);
						}}
					>
						{user ? "Logout" : "Login"}
					</button>
				</div>
			</div>
			<button
				className="sm:hidden cursor-pointer"
				onClick={() => setOpen(!open)}
			>
				<img
					src={
						open
							? "/src/assets/close_icon.svg"
							: "/src/assets/menu_icon.svg"
					}
					alt="menu"
				/>
			</button>
		</motion.div>
	);
};

export default Navbar;
