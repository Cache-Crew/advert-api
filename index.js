import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";

const database = await mongoose.connect (process.env.MONGO_URI);


const app = express()
app.use (express.json())




const port = process.env.PORT || 4040
app.listen (port, () => {
  console.log (`Server is listening on port ${port}`)
})


