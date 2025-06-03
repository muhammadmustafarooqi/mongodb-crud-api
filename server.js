import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/UserRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected!');
  })
  .catch((error) => {
    console.error('Error in MongoDB connection:', error);
  });

app.get('/', (req, res) => {
  res.status(200).send('Hello, Backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});