import dotenv from 'dotenv';
import connectToDatabase from "./database.js";
import express from "express";

// Our routes
import ProductRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import UserRoutes from "./routes/userRoutes.js";



dotenv.config();
connectToDatabase();

const app = express();

app.use(express.json());

const port = process.env.PORT || 5001;

app.use('/api/products', ProductRoutes);
app.use('/api/users', UserRoutes);

app.listen(port, () => {
    console.log(`Server runs on port ${port}.`);
})
