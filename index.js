const express = require('express');
const connectDB = require('./db')
require('dotenv').config();

const app = express();


app.get('/', (req,res)=>{
    res.send('welcome to the Posts API!');
})
const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
})




connectDB();