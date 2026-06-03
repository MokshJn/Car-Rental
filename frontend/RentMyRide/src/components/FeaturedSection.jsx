import { useState , useEffect} from "react";
import Title from "./Title";
import Card from "./Card";
import { useAppContext } from "../context/Appcontext";
import { assets } from "../assets/assets";
import { toast } from "react-hot-toast";
import {motion} from "framer-motion"; 

const FeaturedSection = () => {
    const { navigate ,axios } = useAppContext(); 
	const [carsData , setCarsData ] = useState([]) ;
	
	const fetchCars = async () => {
		try {
			const { data } = await axios.get("/api/user/cars" );
			if (data.success) {
				setCarsData(data.cars);
			}
			else{
				toast.error(data.message)
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchCars();
	}, []);

	return (
		<motion.div
			initial={{ opacity: 0, y: 0 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
			className="flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32"
		>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
			>
				<Title
					title="Featured Vehicles"
					subTitle="Explore our selection of premium vehicles available for your next adventure."
				></Title>
			</motion.div>
			<motion.div
				initial={{ opacity: 0, y: 100 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, delay: 0.5 }}
				className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18"
			>
				{carsData.slice(0, 6).map((car, index) => (
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						whileInView={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
						key={index}
					>
						<Card car={car}></Card>
					</motion.div>
				))}
			</motion.div>

			<motion.button
				initial={{ opacity: 0, y:20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4, delay: 0.6 }}
				onClick={() => {
					navigate("/cars");
					scrollTo(0, 0);
				}}
				className="flex items-center justify-center gap-2 px-6 py-2 border border-borderColor hover:bg-gray-50 rounded-md mt-18 cursor-pointer"
			>
				Explore all cars <img src={assets.arrow_icon} />
			</motion.button>
		</motion.div>
	);
};

export default FeaturedSection;
