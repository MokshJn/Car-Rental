import mongoose from "mongoose";

const connectDB = async () => {
	try {
		mongoose.connection.on("connected", () => {
			console.log("Database is connected");
		});
		const conn = await mongoose.connect(
			`${process.env.MONGO_URI}/${process.env.DB_NAME}`,
		);
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

export default connectDB;