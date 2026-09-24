import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        const dbInstance = await mongoose.connect(process.env.MONGO_DB_URI as string);
        console.log(`MongoDB Connected: ${dbInstance.connection.host}`);
    } catch (error){
        console.error(`Database Connection Error: ${error}`)
        process.exit(1)
    }
}

export default connectDB;