const express = require('express');
const connectDB = require('./db')
require('dotenv').config();

const app = express();

const userRoutes = require('./Routes/users');

app.get('/', (req,res)=>{
    res.send('welcome to the Posts API!');
});
//user routes
app.use('/users',userRoutes);


const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
    console.log(`Server is running at http://localhost:${PORT}`)
})



connectDB();