import User from "../models/userModel.js";
import Car from "../models/carModel.js";
import fs from "fs";
import ImageKit, { toFile } from "@imagekit/nodejs";
import Booking from "../models/bookingModel.js";

export const changeRoleToOwner = async (req, res) => {
	try {
		const { _id } = req.user;
		await User.findByIdAndUpdate(_id, { role: "owner" });
		return res.status(200).json({
			success: true,
			message: "Role changed successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const addCar = async (req, res) => {
	try {
		const { _id } = req.user;
		let car = JSON.parse(req.body.carData);
		const imageFile = req.file;

		const fileBuffer = fs.readFileSync(imageFile.path);

		const client = new ImageKit({
			privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
		});

		const response = await client.files.upload({
			file: await toFile(fileBuffer, imageFile.originalname),
			fileName: imageFile.originalname,
		});

		const transformedUrl = client.helper.buildSrc({
			urlEndpoint: process.env["IMAGEKIT_URL_ENDPOINT"],
			src: response.url,
			transformation: [
				{
					width: 1280,
					crop: "maintain_ratio",
					quality: 80,
					format: "webp",
				},
			],
		});

		const image = transformedUrl;
		await Car.create({
			...car,
			image,
			owner: _id,
		});

		return res.status(200).json({
			success: true,
			message: "Car added successfully",
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const getOwnerCars = async (req, res) => {
	try {
		const { _id } = req.user;
		const cars = await Car.find({ owner: _id });
		return res.status(200).json({
			success: true,
			message: "Cars fetched successfully",
			cars,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const toggleCarAvailability = async (req, res) => {
	try {
		const { _id } = req.user;
		const { carId } = req.body;
		const car = await Car.findById(carId);

		if (!car) {
			return res.status(400).json({
				success: false,
				message: "Car not found",
			});
		}

		if (car.owner.toString() !== _id.toString()) {
			return res.status(400).json({
				success: false,
				message: "Unauthorized",
			});
		}

		car.isAvailable = !car.isAvailable;
		await car.save();
		return res.status(200).json({
			success: true,
			message: "Car availability toggled successfully",
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const deleteCar = async (req, res) => {
	try {
		const { _id } = req.user;
		const { carId } = req.body;

		const car = await Car.findById(carId);

		if (!car) {
			return res.status(400).json({
				success: false,
				message: "Car not found",
			});
		}

		if (car.owner.toString() !== _id.toString()) {
			return res.status(400).json({
				success: false,
				message: "Unauthorized",
			});
		}
		car.owner = null;
		car.isAvailable = false;
		await car.save();

		return res.status(200).json({
			success: true,
			message: "Car deleted successfully",
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const getDashboardData = async (req, res) => {
	try {
		const { _id, role } = req.user;
		if (role !== "owner") {
			return res.status(400).json({
				success: false,
				message: "Unauthorized",
			});
		}
		const cars = await Car.find({ owner: _id });
		const bookings = await Booking.find({ owner: _id })
			.populate("car")
			.sort({ createdAt: -1 });

		const pendingBookings = await Booking.find({
			owner: _id,
			status: "pending",
		})
			.populate("car")
			.sort({ createdAt: -1 });

		const completedBookings = await Booking.find({
			owner: _id,
			status: "confirmed",
		})
			.populate("car")
			.sort({ createdAt: -1 });

		// Calculate monthly revenue from booking where status is confirmed
		const monthlyRevenue = bookings
			.slice()
			.filter((booking) => booking.status === "confirmed")
			.reduce((acc, booking) => acc + booking.price, 0);

		const dashboardData = {
			totalCars: cars.length,
			totalBookings: bookings.length,
			pendingBookings: pendingBookings.length,
			completedBookings: completedBookings.length,
			monthlyRevenue,
			recentBookings: bookings.slice(0, 3),
		};

		return res.status(200).json({
			success: true,
			message: "Dashboard data fetched successfully",
			dashboardData,
		});
	} catch (e) {
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};

export const updateUserImage = async (req, res) => {
	try {
		const { _id } = req.user;

		const imageFile = req.file;

		const fileBuffer = fs.readFileSync(imageFile.path);

		const client = new ImageKit({
			privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
		});

		const response = await client.files.upload({
			file: await toFile(fileBuffer, imageFile.originalname),
			fileName: imageFile.originalname,
		});

		const transformedUrl = client.helper.buildSrc({
			urlEndpoint: process.env["IMAGEKIT_URL_ENDPOINT"],
			src: response.url,
			transformation: [
				{
					width: 400,
					crop: "maintain_ratio",
					quality: 80,
					format: "webp",
				},
			],
		});

		const image = transformedUrl;

		const user = await User.findById(_id);
		user.image = image;

		await user.save();
		return res.status(200).json({
			success: true,
			message: "Image updated successfully",
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
