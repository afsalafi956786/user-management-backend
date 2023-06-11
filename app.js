import express from 'express';
import dotenv  from 'dotenv';
import connectDb from './connection/dbConnection.js';
import userRouter from './routes/user.js'
import cors from 'cors'
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
import path from 'path';

const __dirname = path.resolve();
dotenv.config()
const app=express()


let data_base=process.env.DATABASE_CONNECTION;
connectDb(data_base);

app.use('/uploads', express.static(path.join(__dirname ,'/uploads')))
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use('/uploads', express.static(join(dirname(__dirname), '/uploads')));

app.use(express.json());
app.use(cors({
    credentials:true,
    origin:'http://localhost:5173'
}))



app.use('/',userRouter)


app.listen(5000,()=>{
    console.log('server running port 5000')
})