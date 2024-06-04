import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";



dotenv.config();

const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: "company-management" })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("Failed to connect"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(router)

app.listen(PORT, () => console.log(`App listening on PORT: $
{PORT}`) )









