import express from 'express'
import contactRoute from './routes/contactRoute.js'
import userRoute from './routes/userRoute.js';
import alertRoute from './routes/alertRoute.js'
import dotenv from 'dotenv';
import connectDb from './config/dbConnection.js';
import { verifyToken } from './middleware/authMiddleware.js';

dotenv.config();
connectDb();
const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/contact" , verifyToken , contactRoute);
app.use("/api/user" , userRoute);
app.use("/api/alert" , verifyToken , alertRoute);

app.listen(PORT , () => {
    console.log("the server is running on port 3000");
})