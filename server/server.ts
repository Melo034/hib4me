import express from 'express';
import mongoose from 'mongoose';
import "dotenv/config";
import cors from 'cors'; 
import donationRouter from "./routes/apis/donation"; 
import userRouter from "./routes/apis/user";
import authRouter from "./routes/apis/auth";
import blinksRouter from "./routes/apis/blink"
import path from 'path';
import fs from 'fs';

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI; 

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Content-Encoding', 'Accept-Encoding'],
    optionsSuccessStatus: 204
}));

// Handling OPTIONS requests globally
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Encoding, Accept-Encoding');
    res.sendStatus(204);
});
app.use('*', cors());


// Middleware to parse JSON requests
app.use(express.json());

// Disable buffering
mongoose.set('bufferCommands', false);

const uploadDir = path.join(__dirname, "public/uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // Creates the directory and its parents if needed
    console.log(`Upload directory created at: ${uploadDir}`);
}

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
        app.use("/uploads", express.static(uploadDir));
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