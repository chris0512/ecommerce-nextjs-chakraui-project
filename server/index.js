import dotenv from 'dotenv';
import connectToDatabase from "./database.js";
import express from "express";

// Our routes
import ProductRoutes from "./routes/productRoutes.js";



dotenv.config();
connectToDatabase();

const app = express();

app.use(express.json());

const port = process.env.PORT || 5001;

app.use('/api/products', ProductRoutes);


app.listen(port, () => {
    console.log(`Server runs on port ${port}.`);
})
