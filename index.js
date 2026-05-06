const express = require('express');

const connectDB = require('./db')

require('dotenv').config();

const userRoutes = require('./Routes/users');
const postRoutes = require('./Routes/post');

const app = express();
app.use(express.json());

app.get('/', (req,res)=>{
    res.send('welcome to the Posts API!');
});
//user routes
app.use('/users',userRoutes);

// post routes
app.use('/post',postRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
})



connectDB();