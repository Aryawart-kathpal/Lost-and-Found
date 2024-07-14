require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');

require('./controllers/passport');

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
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

//routes
const authRoutes = require('./routes/authRoutes');


// using middlewares
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
}));
app.use(helmet());
app.use(mongoSanitize());
// app.use(rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 100
// }));

app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());
app.use(morgan('tiny'));
app.use(session({secret:process.env.JWT_SECRET,resave:false,saveUninitialized:false}));
app.use(passport.initialize());
app.use(passport.session());

//using all other routes

app.use('/api/v1/auth',authRoutes);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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