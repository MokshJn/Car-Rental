import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import Card from "../components/Card";
import { useAppContext } from "../context/Appcontext";
import { useSearchParams } from "react-router-dom";
import {motion} from 'framer-motion' ; 
const Cars = () => {
	const [input, setInput] = useState("");
	const [collection, setCollection] = useState([]);
	const [baseCollection, setBaseCollection] = useState([]);
	const { navigate, axios } = useAppContext();
	const fetchAllCars = async () => {
		try {
			const { data } = await axios.get("/api/user/all-cars");
			if (data.success) {
				setCollection(data.cars);
				setBaseCollection(data.cars);
			} else {
				toast.error(data.message);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	const applyFilter = () => {
		if (input === "") {
			setCollection(baseCollection);
		} else {
			const filtered = baseCollection.filter((car) => {
				const query = input.toLowerCase();
				return (
					(car.brand || "").toLowerCase().includes(query) ||
					(car.model || "").toLowerCase().includes(query) ||
					(car.category || "").toLowerCase().includes(query) ||
					(car.transmission || "").toLowerCase().includes(query)
				);
			});
			setCollection(filtered);
		}
	};

	useEffect(() => {
		applyFilter();
	}, [input, baseCollection]);

	// getting search Params ;
	const [searchParams] = useSearchParams();
	const pickupLocation = searchParams.get("pickupLocation");
	const pickupDate = searchParams.get("pickupDate");
	const returnDate = searchParams.get("returnDate");

	useEffect(() => {
		const checkAvailability = async () => {
			try {
				const { data } = await axios.post(
					"/api/booking/check-availability",
					{
						location: pickupLocation,
						pickupDate,
						returnDate,
					},
				);
				if (data.success) {
					setCollection(data.cars);
					setBaseCollection(data.cars);
				} else {
					toast.error(data.message);
				}
			} catch (e) {
				toast.error(e.message);
			}
		};

		if (pickupLocation && pickupDate && returnDate) {
			checkAvailability();
		} else {
			fetchAllCars();
		}
	}, [pickupLocation, pickupDate, returnDate]);

	return (
		<div className="mb-20">
			<motion.div 
			initial={{opacity:0 , y:30}}
			animate={{opacity:1 , y:0}}
			transition={{duration:0.6 , ease:"easeOut"}}
			
			className="flex flex-col items-center align-center justify-center bg-light max-md:px-4 py-20 ">
				<div>
					<Title
						title={"Available Cars"}
						subTitle={
							"Browse our selection of premium vehicles available for your next adventure"
						}
					></Title>
				</div>
				<motion.div
				initial={{opacity:0 , y:30}}
				animate={{opacity:1 , y:0}}
				transition={{duration:0.6 , delay:0.2}} 
				className="max-w-3xl w-full mt-6 flex items-center align-center h-12 px-6 py-2 shadow  bg-white rounded-full ">
					<img
						src={assets.search_icon}
						className="w-6 h-6 mr-2"
						alt=""
					/>
					<input
						onChange={(e) => setInput(e.target.value)}
						value={input}
						type="text"
						className="bg-transparent text-gray-500 outline-none text-xl w-full ml-4"
						placeholder="Search by make, model, or features"
					/>
					<img
						src={assets.filter_icon}
						className="w-6 h-6 ml-2"
						alt=""
					/>
				</motion.div>
			</motion.div>

			<motion.div 
			initial={{opacity:0 }}
			animate={{opacity:1 }}
			transition={{delay:0.6 , duration:0.6 }}
			className="px-6 md:px-16 lg:px-24 xl:px-32 mt-10">
				<p>Showing {collection.length} results</p>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto">
					{collection.map((car, index) => (
						<div key={index}>
							<Card car={car}></Card>
						</div>
					))}
				</div>
			</motion.div>
		</div>
	);
};

export default Cars;
