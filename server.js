const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors");
require('dotenv').config();
const DB = require('./DB/config');
const authRouts = require('./Routes/Auth')
const todoRouts = require('./Routes/Todo')

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS, 
    credentials: true,               
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
}));


// Connect to MongoDB
DB();

// Routes
app.use('/Auth', authRouts)
app.use('/Todo', todoRouts)

//listen
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});