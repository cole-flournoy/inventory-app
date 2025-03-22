import express, { Request, Response } from 'express';

const app = express();
const cors = require('cors');
const corsOptions = {
   origin: 'http://localhost:5173',
}

app.use(cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World');
});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});