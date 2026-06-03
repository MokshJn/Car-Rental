import { createContext, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const Appcontext = createContext();

export const AppProvider = ({ children }) => {
	const navigate = useNavigate();
	const currency = import.meta.env.VITE_CURRENCY;
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [isOwner, setIsOwner] = useState(false);
	const [showLogin, setShowLogin] = useState(false);
	const [pickupDate, setPickupDate] = useState("");
	const [returnDate, setReturnDate] = useState("");

	const [cars, setCars] = useState([]);

	const fetchUser = async () => {
		try {
			const { data } = await axios.get("/api/user/data");
			if (data.success) {
				setUser(data.user);
				setIsOwner(data.user.role === "owner");
			} else {
				navigate("/");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const fetchCars = async () => {
		try {
			const { data } = await axios.get("/api/user/cars");
			if (data.success) {
				setCars(data.cars);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setToken(null);
		setUser(null);
		setIsOwner(false);
		delete axios.defaults.headers.common["Authorization"];
		toast.success("You have been logged out successfully");
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		setToken(token);
		fetchCars();
	}, []);

	useEffect(() => {
		if (token) {
			axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
			fetchUser();
		}
	}, [token]);

	const value = {
		navigate,
		currency,
		axios,
		user,
		setUser,
		token,
		setToken,
		isOwner,
		setIsOwner,
		fetchUser,
		logout,
		showLogin,
		setShowLogin,
		pickupDate,
		setPickupDate,
		returnDate,
		setReturnDate,
		cars,
		setCars,
		fetchCars,
	};
	return <Appcontext.Provider value={value}>{children}</Appcontext.Provider>;
};

export const useAppContext = () => {
	return useContext(Appcontext);
};
