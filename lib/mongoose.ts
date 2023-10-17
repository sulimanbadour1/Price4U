import mongoose from 'mongoose';

// Mongoose connection 
// Variable to track connection status

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);
    // If the connection is already there, return
    if (!process.env.MONGODB_URI) return console.log(
        'Mongo URI not found. Please add it to the .env file'
    )

    if (isConnected) return
    console.log("=> using existing database connection");
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("MongoDB connected successfully");


    } catch (error: any) {
        throw new Error(`Error connecting to the database: ${error.message}`)

    }
};

