import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";

export const checkAvailability = async (car, pickupDate, returnDate) => {
	try {
		const bookings = await Booking.find({
			car: car._id,
			pickupDate: {
				$lte: returnDate,
			},
			returnDate: {
				$gte: pickupDate,
			},
		});
		return bookings.length === 0;
	} catch (e) {
		console.log(e);
     		return false;
	}
};

export const checkAvailabilityWithLocation = async (req, res) => {
	try {
		const { location, pickupDate, returnDate } = req.body;

		const cars = await Car.find({ location, isAvailable: true });

		const availableCars = cars.map(async (car) => {
			const isAvailable = await checkAvailability(
				car,
				pickupDate,
				returnDate,
			);
			return { ...car._doc, isAvailable };
		});

		let availableCars_ = await Promise.all(availableCars);
		availableCars_ = availableCars_.filter((car) => car.isAvailable === true);

		return res.status(200).json({
			success: true,
			message: "Available cars fetched successfully",
			cars: availableCars_,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			success: false,
			message: e.message,
		});
	}
};


export const createBooking = async ( req , res )=>{
    try{
        const {_id} = req.user ; 
        const {car , pickupDate , returnDate} = req.body ; 

        const isAvailable = await checkAvailability(car , pickupDate , returnDate) ;
        if( !isAvailable){
            return res.status(400).json({
                success : false,
                message : "Car is not available"
            })
        }

        const carData = await Car.findById(car) ;
        if(!carData){
            return res.status(400).json({
                success : false,
                message : "Car not found"
            })
        } 
        const picked = new Date(pickupDate) ;
        const returned = new Date(returnDate) ;
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24)) ;
        const price = carData.pricePerDay * noOfDays ;

        await Booking.create({car , owner:carData.owner , user: _id , pickupDate , returnDate , price }) ; 
        return res.status(200).json({
            success : true,
            message : "Booking created successfully"
        })
    }catch (e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}

export const getUserBookings = async(req , res )=>{
    try{
        const {_id} = req.user ; 
        const bookings = await Booking.find({user : _id}).populate("car").sort({createdAt : -1}) ; 
        return res.status(200).json({
            success : true,
            message : "Bookings fetched successfully",
            bookings
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}

export const getOwnerBookings = async(req ,res )=>{
    try{
        if( req.user.role !== "owner"){
            return res.status(400).json({
                success : false,
                message : "Unauthorized"
            })
        }
        const {_id} = req.user ; 
        const bookings = await Booking.find({owner : _id}).populate("car user").select("-user.password").sort({createdAt : -1}) ; 
        return res.status(200).json({
            success : true, 
            message : "Bookings fetched successfully",
            bookings
        })
    }catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}

export const changeBookingStatus = async(req , res )=>{
    try{
		const { _id } = req.user;
		const { bookingId, status } = req.body;
		const booking = await Booking.findById(bookingId);

        if( booking.owner.toString() !== _id.toString() ){
            return res.status(400).json({
                success : false,
                message : "Unauthorized"
            })
        }
        booking.status = status ; 
        await booking.save() ; 
        
		return res.status(200).json({
			success: true,
			message: "Booking status changed successfully",
		});
	}catch(e){
        console.log(e);
        return res.status(500).json({
            success: false,
            message: e.message,
        });
    }
}