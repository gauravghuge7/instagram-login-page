import express from 'express';
import cors from 'cors';
const app = express();
import cookieParser from 'cookie-parser';

/// users read the data

app.use(express.json());
app.use(express.urlencoded({extended: true}))

//// to read form data from html forms

import formData from 'express-form-data';
app.use(formData.parse());


/// for cross origin requests 

// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }));

app.use(cors());

app.use(cookieParser());










//// route imports from  every side 


import { userRouter } from './routes/user.routes.js';


/// routes import of pages 


app.use("/instagram/user", userRouter);




/// default routes declaration for server 

app.get("/", (req, res) => {

    res.send(" the server is started ");
})


export default app;