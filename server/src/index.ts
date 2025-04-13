import express, { Request, Response } from 'express';
import { connectDB } from '../config/db';
import User from '../models/user';
import Company from '../models/company';
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


app.listen(8080, () => {
  connectDB();
  console.log('Server is running on port 8080');
});

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.post('/api/users', async (req: Request, res: Response) => {
  const { name, company, username, password } = req.body;

  try {
    const newCompany = new Company({ name: company });
    await newCompany.save();

    const newUser = new User({
      name,
      username,
      password,
      companyId: newCompany._id,
      role: 'ADMIN',
    });

    await newUser.save();
    
    res.status(201).json({ success: true });
    console.log('User created:', newUser);
    console.log('Company created:', newCompany);

  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});