import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import postRoute from './routes/posts.js';

const app = express();
dotenv.config();
//1) Body parser, reading data from body into req.body
// app.use(bodyParser.json({ limit: '30mb', extented: true }));
// app.use(bodyParser.urlencoded({ limit: '30mb', extented: true }))
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());

// Routes
app.use('/posts', postRoute);

const port = process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Welcome to Memories!, App running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));