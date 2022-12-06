import mongoose from 'mongoose'
// const connectionString = 'mongodb+srv://root:<password>@cluster0.v9urajt.mongodb.net/?retryWrites=true&w=majority'

const connectDB = (url) => {
    return mongoose.connect(url)
}


export default connectDB;