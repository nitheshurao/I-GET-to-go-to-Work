import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv'
import cors from 'cors'
import 'express-async-errors';
const app = express();

dotenv.config()
// db and autheticateUSer
import connectDB from './db/connect.js';
// routersi
import authRouter from './routes/authRoutes.js';
import jobRouter from './routes/jobRoutes.js';

// middleware
import notFountMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js'


if (process.env.NODE_ENV != 'production') {
    app.use(morgan('dev'))
}

notFountMiddleware
// errorHandlerMiddleware
app.use(express.json())
app.use(cors())
// app.get('/', (req, res) => {
//     throw new Error('error')
//     res.send('Welcome!');
// });
app.get('/', (req, res) => {
    res.send({ msg: "Welco---" })
})

app.use('/api/vi/auth', authRouter)

app.use('/api/vi/jobs', authenticateUser, jobRouter)

app.use(notFountMiddleware)
app.use(errorHandlerMiddleware)
const port = process.env.PORT || 5000;

// app.listen(port, () => console.log(`Server is listening on port ${port}...`));



const start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    } catch (error) {

        console.log(error)


    }
}
start()