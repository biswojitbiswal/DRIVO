import "dotenv/config"
import express from "express"
import connectDb from "./DB/db.js";
import userRouter from './routes/user.routes.js'

const app = express(); 

const PORT = process.env.PORT || 7000

app.use(express.urlencoded({extended: true, limit: "40kb"}))
app.use(express.static("public"));
app.use(express.json());

app.use("/api/drivo/user", userRouter);

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