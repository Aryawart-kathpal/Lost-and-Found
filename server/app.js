require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// other packages
const morgan = require('morgan');

//db
const connectDB = require('./db/connect');

//middlewares
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimiter = require('express-rate-limit');

//routes


// using middlewares
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
// app.use(rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 100
// }));

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(morgan('tiny'));

//using all other routes
app.get('/',(req,res)=>{
    res.send("Lost and found backend");
})

const port = process.env.PORT || 5000;

const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URI);
        console.log("Successfully connected to the database");
        app.listen(port,()=>console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();