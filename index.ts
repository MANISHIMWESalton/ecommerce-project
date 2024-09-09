import dotenv from "dotenv"
import express, { Express, Request, Response } from "express";
import router from "./src/router";
import cookieParser = require("cookie-parser");
dotenv.config();
const PORT = process.env.PORT
const app: Express = express();
app.use(express.json())
app.use(cookieParser())
app.use("/api", router)
app.get("/", (req: Request, res) => {
    res.json({ message: 'goodmorning' })

})
app.listen(4000, () => {
    console.log(`Server is running on port :4000`);

})
