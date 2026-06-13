import { useState } from "react";
import TitleOwner from "../../components/Owner/TitleOwner";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Appcontext";
import { toast } from "react-hot-toast";

const AddCar = () => {
	const { axios, currency } = useAppContext();
	const [image, setImage] = useState(null);
	const [car, setCar] = useState({
		brand: "",
		model: "",
		year: 0,
		pricePerDay: "",
		category: "",
		transmission: "",
		fuel_type: "",
		seating_capacity: "",
		location: "",
		description: "",
	});
	const [isLoading, setIsLoading] = useState(false);

	const onSubmitHandler = async (e) => {
		if (isLoading) return null;
		setIsLoading(true);
		try {
			e.preventDefault();
			const formData = new FormData();
			formData.append("image", image);
			formData.append("carData", JSON.stringify(car));
			const { data } = await axios.post("/api/owner/add-car", formData);
			if (data.success) {
				toast.success(data.message);
				setImage(null);
				setCar({
					brand: "",
					model: "",
					year: 0,
					pricePerDay: "",
					category: "",
					transmission: "",
					fuel_type: "",
					seating_capacity: 0,
					location: "",
					description: "",
				});
			} else {
				toast.error(data.message);
			}
		} catch (e) {
			toast.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<div className="px-4 py-10 md:px-10 flex-1">
			<TitleOwner
				title="Add New Car"
				subTitle="Fill in details to list a new car for booking including pricing, availability, and car specifications."
			/>

			<form
				onSubmit={onSubmitHandler}
				className="flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl"
			>
				{/* Image */}
				<div className="flex items-center gap-2 w-full">
					<label htmlFor="car_image">
						<img
							src={
								image
									? URL.createObjectURL(image)
									: assets.upload_icon
							}
							alt=""
							className="h-14 rounded cursor-pointer"
						/>
						<input
							type="file"
							id="car_image"
							accept="image/*"
							hidden
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</label>
					<p className="text-sm text-gray-500">Upload car image</p>
				</div>
				{/* Brand and model */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
					<div className="flex flex-col w-full">
						<label htmlFor="">Brand</label>
						<input
							type="text"
							placeholder="e.g. BMW, Mercedes, Audi..."
							required
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
							value={car.brand}
							onChange={(e) =>
								setCar({ ...car, brand: e.target.value })
							}
						/>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="">Model</label>
						<input
							type="text"
							placeholder="e.g. X5, E-Class, M4..."
							required
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
							value={car.model}
							onChange={(e) =>
								setCar({ ...car, model: e.target.value })
							}
						/>
					</div>
				</div>
				{/* Year, price and category */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					<div className="flex flex-col w-full">
						<label htmlFor="">Year</label>
						<input
							type="number"
							required
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
							value={car.year}
							onChange={(e) =>
								setCar({ ...car, year: e.target.value })
							}
							placeholder="e.g. 2026..."
							miin={0}
							// defaultValue={new Date().getFullYear()}
						/>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="">Daily Price ({currency})</label>
						<input
							type="number"
							placeholder="100"
							required
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
							value={car.pricePerDay}
							onChange={(e) =>
								setCar({
									...car,
									pricePerDay: e.target.value,
								})
							}
							min={0}
							step={0.01}
						/>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="">Category</label>
						<select
							onChange={(e) =>
								setCar({ ...car, category: e.target.value })
							}
							value={car.category}
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none appearance-none bg-white cursor-pointer"
						>
							<option value="">Select a category</option>
							<option value="Sedan">Sedan</option>
							<option value="SUV">SUV</option>
							<option value="Van">Van</option>
							<option value="Others">Others</option>
						</select>
					</div>
				</div>
				{/* Transmission, fuel type and seating capacity */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					<div className="flex flex-col w-full">
						<label htmlFor="">Transmission</label>
						<select
							onChange={(e) =>
								setCar({ ...car, transmission: e.target.value })
							}
							value={car.transmission}
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none appearance-none bg-white cursor-pointer"
						>
							<option value="">Select a transmission</option>
							<option value="Automatic">Automatic</option>
							<option value="Manual">Manual</option>
							<option value="Semi-automatic">
								Semi-automatic
							</option>
						</select>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="">Fuel Type</label>
						<select
							onChange={(e) =>
								setCar({ ...car, fuel_type: e.target.value })
							}
							value={car.fuel_type}
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none appearance-none bg-white cursor-pointer"
						>
							<option value="">Select Fuel Type</option>
							<option value="Gas">Gas</option>
							<option value="Diesel">Diesel</option>
							<option value="Petrol">Petrol</option>
							<option value="Electric">Electric</option>
							<option value="Hybrid">Hybrid</option>
						</select>
					</div>

					<div className="flex flex-col w-full">
						<label htmlFor="">Seating Capacity</label>
						<input
							type="number"
							placeholder="4"
							required
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
							value={car.seating_capacity}
							onChange={(e) =>
								setCar({
									...car,
									seating_capacity: e.target.value,
								})
							}
							min="1"
						/>
					</div>
				</div>
				{/* Location */}
				<div className="flex flex-col w-full">
					<div className="flex flex-col w-full">
						<label htmlFor="">Location</label>
						<select
							onChange={(e) =>
								setCar({ ...car, location: e.target.value })
							}
							value={car.location}
							className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none appearance-none bg-white cursor-pointer"
						>
							<option value="">Select Location</option>
							<option value="New York">New York</option>
							<option value="Los Angeles">Los Angeles</option>
							<option value="Houston">Houston</option>
							<option value="Chicago">Chicago</option>
						</select>
					</div>
				</div>

				{/* Description */}
				<div className="flex flex-col w-full">
					<label htmlFor="">Description</label>
					<textarea
						type="text"
						rows="4"
						placeholder="Describe your car..."
						required
						className="px-3 py-2 mt-1 border border-borderColor rounded-md outline-none"
						value={car.description}
						onChange={(e) =>
							setCar({ ...car, description: e.target.value })
						}
					/>
				</div>

				<button
					className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 mt-4 rounded-md font-medium w-max *:cursor-pointer"
					type="submit"
				>
					<img src={assets.tick_icon} alt="" />
					{isLoading ? `Listing...` : `List Car`}
				</button>
			</form>
		</div>
	);
};

export default AddCar;
