import { useState, useEffect } from "react";
import TitleOwner from "../../components/Owner/TitleOwner";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/Appcontext";
import { toast } from "react-hot-toast";

const Dashboard = () => {

	const { axios , isOwner , currency } = useAppContext();

	const [data, setData] = useState({
		totalCars: 0,
		totalBookings: 0,
		pendingBookings: 0,
		completedBookings: 0,
		recentBookings: [],
		monthlyRevenue: 0,
	});

	const DashboardCards = [
		{
			title: "Total Cars",
			value: data.totalCars,
			icon: "/src/assets/carIconColored.svg",
		},
		{
			title: "Total Bookings",
			value: data.totalBookings,
			icon: "/src/assets/listIconColored.svg",
		},
		{
			title: "Pending Bookings",
			value: data.pendingBookings,
			icon: "/src/assets/cautionIconColored.svg",
		},
		{
			title: "Completed Bookings",
			value: data.completedBookings,
			icon: "/src/assets/listIconColored.svg",
		},
	];

	const fetchDashboardData = async( )=>{
		try{
			const { data} = await axios.get("/api/owner/dashboard")
			if( data.success){
				setData(data.dashboardData) ; 
			}
			else{
				toast.error(data.message); 
			}
		}catch(e){
			toast.error(e.message)
		}
	}

	useEffect (() => {
		if( isOwner){
			fetchDashboardData();
		}
		},
		[isOwner]
	);
	return (
		<div className="px-4 pt-10 md:px-10 flex-1">
			<TitleOwner
				title="Admin Dashboard"
				subTitle="
      Monitor overall platform performance including total cars,bookings and revenue."
			/>
			<div
				className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4
       my-8 max-w-4xl "
			>
				{DashboardCards.map((card, index) => (
					<div
						key={index}
						className="flex flex-row items-center justify-around
            p-4 rounded-md border border-borderColor gap-2"
					>
						<div className="flex items-center  rounded-full bg-primary/10 p-2">
							<img src={card.icon} alt="" className="w-7 h-7" />
						</div>
						<div className="flex flex-col gap-1">
							<p className="text-sm font-semibold text-center">
								{card.title}
							</p>
							<p className="text-xl font- semibold text-center">
								{card.value}
							</p>
						</div>
					</div>
				))}
			</div>

			<div className="flex flex-wrap items-start gap-6 mb-8 w-full">
				{/* Recent Booking  */}
				<div className="p-4 md:p-6 border border-borderColor rounded-lg max-w-lg w-full">
					<h1 className="text-lg font-medium">Recent Bookings</h1>
					<p className="text-gray-500">Latest customer Bookings</p>
					{data.recentBookings.map((booking, index) => (
						<div
							key={index}
							className="flex items-center justify-between my-2"
						>
							<div className="flex items-center gap-2">
								<div className="hidden md:flex items-center justify-center rounded-full bg-primary/10 w-12 h-12">
									<img
										src={assets.listIconColored}
										alt="photo"
										className="h-5 w-5"
									/>
								</div>
								<div>
									<p>
										{booking.car.brand} {booking.car.model}
									</p>
									<p className="text-sm text-gray-500">
										{booking.createdAt.split("T")[0]}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-2 font-medium">
								<p className="text-sm text-gray-500">
									{currency}
									{booking.price}
								</p>
								<p className="px-3 py-0.5 border border-borderColor rounded-full text-sm">
									{booking.status}
								</p>
							</div>
						</div>
					))}
				</div>

				{/* Monthly Revenue */}
				<div className="p-4 mdLp-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500">Revenue for the current month</p>
          <p className="text-3xl mt-6 font-semibold text-primary">{currency}{data.monthlyRevenue}</p>

        </div>




			</div>
		</div>
	);
};

export default Dashboard;
