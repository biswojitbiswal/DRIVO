import "dotenv/config"
import express from "express"

const app = express(); 

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
    console.log(`app is listening at ${PORT}`);
})