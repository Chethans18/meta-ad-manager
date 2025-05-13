import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv  from 'dotenv';
import connectDB from './config/db.js'; 
import authRoutes from './routes/authRoutes.js'
import cors from 'cors';

const app = express();
dotenv.config()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:7000"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send('API RUNNING');
});

app.use('/api/auth',authRoutes);

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => {
      console.log(`Server is  running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
  }
};

startServer();
