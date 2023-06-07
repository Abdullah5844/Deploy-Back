import express from'express';
import { default as customerRouter } from './routes/customerRoute.js';
import { default as accountRouter } from './routes/accountRoute.js';
import { default as transactionRouter } from './routes/transactionRoute.js';
import mongoose from 'mongoose'
import dotenv from 'dotenv'

const app = express();
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

dotenv.config();
mongoose.connect(process.env.ALTAS_URL).then(()=>{
    console.log("DB Connected !!!");
}).catch(err=>{
    console.log(err);
})


app.listen(process.env.PORT || 3001, ()=>{
    console.log(`App Listning on port ${process.env.PORT}`)
})

//defining all routes
app.use("/customer",customerRouter);
app.use("/account",accountRouter);
app.use("/transaction",transactionRouter);
