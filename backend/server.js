const app = require('./app')
const connectDatabase = require('./config/database')
const mongoose = require("mongoose");

// const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'config/config.env' })

// dotenv.config({ path: 'backend/config/config.env' })


// Connecting to database
//connectDatabase();
mongoose
    .connect("mongodb+srv://phuccao:cp31012003@cluster0.fdtoihy.mongodb.net/shopit", { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})