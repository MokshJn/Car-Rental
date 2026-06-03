import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/carModel.js";

const generateToken = (userId) => {
	const payload = userId;
	return jwt.sign(payload, process.env.JWT_SECRET);
};
export const registerUser = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please fill all the fields",
			});
		}
		if (password.length < 8) {
			return res.status(400).json({
				success: false,
				message: "Password must be at least 8 characters long",
			});
		}
		const UserExists = await User.findOne({ email });
		if (UserExists) {
			return res.status(400).json({
				success: false,
				message: "User already exists",
			});
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
		});
		const token = generateToken(user._id.toString());
		return res.status(200).json({
			success: true,
			message: "User created successfully",
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				success: false,
				message: "Please fill all the fields",
			});
		}
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				success: false,
				message: "User does not exist",
			});
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({
				success: false,
				message: "Incorrect username or password",
			});
		}
		const token = generateToken(user._id.toString());
		return res.status(200).json({
			success: true,
			message: "User logged in successfully",
			user,
			token,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
};

export const getUserData = async (req, res) => {
	try {
		const user = req.user;
		return res.status(200).json({
			success: true,
			message: "User data fetched successfully",
			user,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const getCars = async (req, res) => {
	try {
		const cars = await Car.find({ isAvailable: true });
		return res.status(200).json({
			success: true,
			message: "Cars fetched successfully",
			cars
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const getAllCars = async ( req , res )=>{
	try {
		const cars = await Car.find();
		return res.status(200).json({
			success: true,
			message: "Cars fetched successfully",
			cars
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
}