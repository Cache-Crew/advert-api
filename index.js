import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import userRoutes from "./routes/user-routes.js";
import advertRouter from "./routes/classifiedAdsRoutes.js";

const database = await mongoose.connect (process.env.MONGO_URI);


const app = express()
app.use (express.json())

app.use(userRoutes)
app.use(advertRouter);




const port = process.env.PORT || 4040
app.listen (port, () => {
  console.log (`Server is listening on port ${port}`)
})


