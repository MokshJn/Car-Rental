import React from "react";
import NavbarOwner from "../../components/Owner/NavbarOwner";
import Sidebar from "../../components/Owner/Sidebar";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../context/Appcontext";
import { useEffect } from "react"; 


const Layout = () => {
	const {isOwner , navigate } = useAppContext(); 

	useEffect(() => {
		if (!isOwner) {
			navigate("/");
		}
	},[isOwner]) ; 

	return (

		<div className="flex flex-col ">
			<NavbarOwner />
			<div className="flex">
				<Sidebar />
				<Outlet />
			</div>
		</div>
	);
};

export default Layout;
