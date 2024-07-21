import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
import connectToDatabase from './db.js';
import createUserRouter from './Routes/CreateUser.js';
import displayDataRouter from './Routes/DisplayData.js';
import orderDataRouter from './Routes/OrderData.js';

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

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
