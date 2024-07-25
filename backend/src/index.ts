import "dotenv/config";
import cors from "cors";
import express from 'express';
import connectToDatabase from './config/db';
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: APP_ORIGIN,
        credentials: true,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    return res.status(200).json({
        status: "healthy"
    });
});


app.listen(4004, async () => {
    console.log(`Server is running on port ${PORT} in ${NODE_ENV} environment`);
    await connectToDatabase();
}); 