import "dotenv/config"
import express from "express"
import connectDb from "./DB/db.js";

const app = express(); 

const PORT = process.env.PORT || 7000

connectDb()
.then(() => {
    app.on("error", (error) => {
        console.log("Error", error);
        throw error
    })
    app.listen(PORT, () => {
        console.log(`app is listening at ${PORT}`);
    })
})
.catch((error) => {
    console.log("Connection failed", error);
})