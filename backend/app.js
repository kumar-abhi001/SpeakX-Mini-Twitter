import express, { json } from "express";
import userRoute from "./src/routes/user.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cors({
    origin: "*",
    credentials: true
}));
app.use(cookieParser());

app.use("/api/user", userRoute);
export default app;