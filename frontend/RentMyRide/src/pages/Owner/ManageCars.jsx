import TitleOwner from "../../components/Owner/TitleOwner";
import { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Appcontext";
import { toast } from "react-hot-toast";
import Loader from "../../components/Loader";

const ManageCars = () => {
	const {isOwner , currency , axios } = useAppContext();
	const [car, setCar] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchOwnerCars = async () => {
		if (isLoading) return null;
		setIsLoading(true);
		try {
			const { data } = await axios.get("/api/owner/cars");
			if (data.success) {
				setCar(data.cars);
			} else {
				toast.error(data.message);
			}
		} catch (e) {
			toast.error(e.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		isOwner && fetchOwnerCars();
	}, [isOwner]);
	
	const CarDeleteHandler =async(carId)=>{
		try{
			const confirm = window.confirm("Are you sure you want to delete this car?")
			if(!confirm) return null
			const {data } = await axios.post("/api/owner/delete-car" , {carId}) ; 
			if(data.success){
				toast.success(data.message)
				fetchOwnerCars()
			}
			else{
				toast.error(data.message) ; 
			}
		}catch(e){
			toast.error(e.message)
		}
	}

	const toggleAvailability = async(carId) => {
		try{
			const {data} = await axios.post("/api/owner/toggle-car" , {carId})
			if(data.success){
				toast.success(data.message)
				fetchOwnerCars()
			}
			else{
				toast.error(data.message)
			}
		}catch(e){
			toast.error(e.message)
		}
	};

	return (
		<div className="px-4 py-10 md:px-10 w-full">
			<TitleOwner
				title={"Manage Cars"}
				subTitle={"View and manage your cars"}
			></TitleOwner>
			{isLoading ? (
				<Loader></Loader>
			) : (
				<div className="max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6">
					<table className="w-full border-collapse text-left text-sm text-gray-600 ">
						<thead className="text-gray-500">
							<tr>
								<th className="p-3 font-medium">Car</th>
								<th className="p-3 font-medium max-md:hidden">
									Category
								</th>
								<th className="p-3 font-medium">Price</th>
								<th className="p-3 font-medium max-md:hidden">
									Status
								</th>
								<th className="p-3 font-medium flex items-center justify-center">
									Actions
								</th>
							</tr>
						</thead>
						<tbody>
							{car.map((car, index) => (
								<tr
									key={index}
									className="border border-borderColor hover:bg-gray-50 "
								>
									<td className="p-3 flex items-center gap-3">
										<img
											src={car.image}
											alt=""
											className="h-12 w-12 aspect-square rounded-md object-cover"
										/>
										<div>
											<p className="font-medium">
												{car.brand} {car.model}
											</p>
											<p className="font-medium text-gray-500">
												{car.seating_capacity}{" "}
												{car.transmission}
											</p>
										</div>
									</td>
									<td className="p-3 max-md:hidden">
										<p>{car.category}</p>
									</td>
									<td className="p-3">
										<p>
											{currency}
											{car.pricePerDay}
										</p>
									</td>
									<td className="p-3 max-md:hidden ">
										<span
											className={`px-3 py-1 rounded-full text-xs ${car.isAvailable ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}text-primary font-medium `}
										>
											{car.isAvailable
												? "Available"
												: "Unavailable"}
										</span>
									</td>
									<td className=" flex items-center justify-center p-3">
										<button onClick={(e)=>toggleAvailability(car._id)}>
											<img
												src={
													car.isAvailable
														? assets.eye_close_icon
														: assets.eye_icon
												}
												alt="toggle"
												className="cursor-pointer"
											/>
										</button>
										<button onClick={(e)=>CarDeleteHandler(car._id)}>
											<img
												src={assets.delete_icon}
												alt="delete"
												className="cursor-pointer"
											/>
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export default ManageCars;
