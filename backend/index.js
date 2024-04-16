import app from "./src/app.js";
import dotenv from 'dotenv';
import connectDB from "./src/db/database.js";


const PORT = 5001 || process.env.PORT;





dotenv.config({
    path: './.env'
})


connectDB()

.then(() => {
    app.listen(PORT, () => {
        console.log(`the server is connected to the PORT http://localhost:${PORT}`);
    })
})

.catch((error) => {
    console.log(' error while connecting the server on port ', error);
})


app.listen 