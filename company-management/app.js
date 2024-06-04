import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import companiesRouter from './routes/companies.js';
import companyProfileRouter from './routes/companyProfile.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use('/companies', companiesRouter);
app.use('/companyProfile', companyProfileRouter);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server Started on Port ${PORT}`));
