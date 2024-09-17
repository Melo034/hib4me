import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from 'cors'; 
import donationRouter from "./routes/apis/donation"; 
import userRouter from "./routes/apis/user";
import authRouter from "./routes/apis/auth";
import blinksRouter from "./routes/apis/blink"
import path from 'path';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI; 

const app = express();

app.use(cors({
    origin: '*',  // Allow all origins or specify your client domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Action-Version', 'X-Blockchain-Ids'],  // Add any custom headers here
    exposedHeaders: ['X-Action-Version', 'X-Blockchain-Ids'],  // Expose custom headers to clients
    preflightContinue: true,
    optionsSuccessStatus: 204
}));


// Middleware to parse JSON requests
app.use(express.json());

// Disable buffering
mongoose.set('bufferCommands', false);

// Function to connect to MongoDB and start the server
const startServer = async () => {
    try {
        // Await the connection to MongoDB
        await mongoose.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,  // 30 seconds timeout for server selection
            connectTimeoutMS: 30000           // 30 seconds timeout for initial connection
        });
        console.log('Connected to MongoDB');

        // Use the routers
        app.use('/api/donations', donationRouter);
        app.use('/api/users', userRouter);
        app.use('/auth', authRouter);
        app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
        app.use('/api/blink', blinksRouter);

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the process if the database connection fails
    }
};

// Start the server only after connecting to MongoDB
startServer();