import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const FrontEndURL = process.env.FRONTENDURL;

console.log('Frontend URL:', FrontEndURL);  // Add this line to log the FrontEndURL

import connectToDatabase from './db.js';
import createUserRouter from './Routes/CreateUser.js';
import displayDataRouter from './Routes/DisplayData.js';
import orderDataRouter from './Routes/OrderData.js';

// Use CORS middleware
app.use(cors({
  origin: FrontEndURL,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));

connectToDatabase();

app.get('/', (req, res) => {
  res.send('Hello');
});

app.use(express.json());
app.use('/api', createUserRouter);
app.use('/api', displayDataRouter);
app.use('/api', orderDataRouter);

app.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
