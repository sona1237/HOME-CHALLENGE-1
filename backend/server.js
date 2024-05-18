
import express from "express";
import api from './routes/index.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js";
import logoutRoutes from "./routes/logout.js"; 

dotenv.config()
mongoose.connect(process.env.MONGODB_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); 
});

const PORT = process.env.PORT || 9000;
const origin = 'http://localhost:3000';
const app = express();

app.use(cors({
    origin
}));

// Add this middleware to parse JSON request bodies
app.use(express.json());

// Simple test route to check if server is running
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Add your other routes here
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", logoutRoutes);
console.log("logoutRoutes middleware mounted successfully"); // Add this line

app.use(express.urlencoded({ extended: true }));
app.use(api);

// Error handling middleware
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.status = 404;
    console.error(error); // Log the error
    next(error); // Pass the error to the next middleware
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Your app is running on http://localhost:${PORT}`);
});



//app.use((req, res, next) => {
   // const error = new Error(`Not Found - ${req.originalUrl}`);
   // error.status = 404;
  //  next(error); // Pass the error to the next middleware
//});

//IS THERE MORE ERROR HANDLING AND CONOLE LOGS IN THIS


