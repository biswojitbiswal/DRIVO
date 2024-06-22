import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connectionInstances = await mongoose.connect(`${process.env.MONGO_DB_URL}`);
        console.log(`MongoDB database connection successfull`);
    } catch (error) {
        console.log(`MongoDB database connection failed`, error)
        process.exit(1);
    }
}
export default connectDb