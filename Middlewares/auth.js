const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
//Bearer hbsfnkjnjknksjvnkj
// [Bearer, hbsfnkjnjknksjvnkj] after splitting
    try {
        const token = req.headers.authorization.split(" ")[1]; // code for getting a Token
    
        if (!token) {
        return res.status(401).json({message: 'Unauthorized access, token is missing'});
    }
    
    let decodedData;

    decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedData; //Attaching value to the Id.

    next();

    } catch (error) {
        res.status(401).json({ message:'Unauthorised access, invalid token', error: error.message});
    }
}
module.exports = auth;