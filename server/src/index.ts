import express, { Request, Response } from 'express';
import { connectDB } from './config/db';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';
dotenv.config();

const authRoute = require('./routes/AuthRoute');
const app = express();
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.listen(8080, () => {
  connectDB();
  console.log('Server is running on port 8080');
});

app.use('/api/', authRoute)


// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World');
// });

// app.post('/api/signup', async (req: Request, res: Response) => {
  
// });