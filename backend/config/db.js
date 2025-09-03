import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://resumeBuilder:resumeBuilder123@cluster0.tvvinhu.mongodb.net/RESUME').then(() => {
        console.log("MongoDB Connected");
    });
}
