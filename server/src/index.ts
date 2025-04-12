import express, { Request, Response } from 'express';
import { connectDB } from '../config/db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const cors = require('cors');
const corsOptions = {
   origin: 'http://localhost:5173',
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(8080, () => {
  connectDB();
  console.log('Server is running on port 8080');
});