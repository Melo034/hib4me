"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const donation_1 = __importDefault(require("./routes/apis/donation"));
const user_1 = __importDefault(require("./routes/apis/user"));
const auth_1 = __importDefault(require("./routes/apis/auth"));
const blink_1 = __importDefault(require("./routes/apis/blink"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGO_URI;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware to parse JSON requests
app.use(express_1.default.json());
// Disable buffering
mongoose_1.default.set('bufferCommands', false);
// Function to connect to MongoDB and start the server
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Await the connection to MongoDB
        yield mongoose_1.default.connect(MONGODB_URI, {
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout for server selection
            connectTimeoutMS: 30000 // 30 seconds timeout for initial connection
        });
        console.log('Connected to MongoDB');
        // Use the routers
        app.use('/api/donations', donation_1.default);
        app.use('/api/users', user_1.default);
        app.use('/auth', auth_1.default);
        app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "public/uploads")));
        app.use('/api/blink', blink_1.default);
        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the process if the database connection fails
    }
});
// Start the server only after connecting to MongoDB
startServer();
