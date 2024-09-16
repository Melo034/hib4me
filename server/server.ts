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
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));


// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(MONGODB_URI).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Use the routers
app.use('/api/donations', donationRouter);
app.use('/api/users', userRouter);
app.use('/auth', authRouter);
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));
app.use('/api/blink', blinksRouter);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port https://hib4me-server.vercel.app:${PORT}`);
});