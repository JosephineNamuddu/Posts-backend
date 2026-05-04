const bycrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const register = async (req, res) => {
    const {name, email, password } = req.body;

try {
    const existingUser = await User.findOne({ email }) ;
    if (existingUser) {
        return res.status(400).json({message: 'User already exists' });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({message: 'Passwords do not match'});
    }
    
    const hashedPassword = await bcrypt.hash(password,12);

    const newUser = new User({
        name,
        email, 
        password: hashedPassword
    });

    await newUser.save();
const token = jwt.sign({id: newUser._id, email: newUser.email}, process.env.JWT_SECRET, {expiresIn: '1hour'})


} catch (error) {
    res.status(500).json({message: 'Error while registering user', error: error.message});
}

}
const login = async (req,res) => {
    const {email, password} = req.body;


try {
    const existingUser = await User.findOne({email});

    if (!existingUser) {
        return res.status(404).json({message: 'User not found, please register first'});
    }
    const isPasswordCorresct = await bcrypt.compare(password, existingUser.password);
   if (!isPasswordCorrect) {
    return res.status(400).json({ message:'This password is inncorect'});
   } 
   const token = jwt.sign({ id: existingUser._id, email: exisistingUser.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
   res.status(200).json({ message: 'Login successful',result: {name: existingUser.name, email: existingUser.email},token});
} catch (error) {
    res.status(500).json({message: 'Error while logging in', error: error.message});
    
}
}
module.exports = {register, login}