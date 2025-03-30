import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { errorHandler, notFound } from './middleware/errorMiddleWare.js';
import {router} from './routes/postRoutes.js';
import { userRouter } from './routes/userRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


const PORT = process.env.PORT
const MONGO_URI = process.env.MONGODB_URL


app.use('/api/credentials', router);
app.use('/api/credentials/user', userRouter);

app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
});
mongoose.connect(MONGO_URI).then(() => console.log(`Connected to MongoDB Successfully`)).catch((err) => {
    console.log(err)
})