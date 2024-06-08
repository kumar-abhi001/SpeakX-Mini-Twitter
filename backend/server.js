import express from "express";
import { ConnectDB } from "./src/db/connect.js";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

ConnectDB()
    .then(() => {
        app.listen(process.env.PORT, (err) => {
            if (err) {
                return console.log("Error while listen: ", err);
            }

            console.log(`Server is running on ${process.env.PORT}`);
        })
    })
    .catch((err) => {
        console.log("Error in connecting db: ", err);
    })