import express from 'express';
import dotenv from 'dotenv'
const app = express();
dotenv.config()
import notFountMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import connectDB from './db/connect.js';



notFountMiddleware
errorHandlerMiddleware



app.get('/', (req, res) => {
    throw new Error('error')
    res.send('Welcome!');
});

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