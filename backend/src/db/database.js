import mongoose from 'mongoose';


const connectDB = (async (req, res) => {

    try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)

    console.log(` mongodb connection succefully on ${connectionInstance.connection.host}`)
    }
    catch (error) {
        console.log(' error while connecting database ', error);    
    }
})




export default connectDB;
