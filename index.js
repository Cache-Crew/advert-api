import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";

await mongoose.connet (process.env.MONGO_URI);


const app = express()
app.use (express.json())



const port = process.env.PORT || 4040
app.listen (port, () => {
  console.log (`Server is listening on port ${port}`)
})


