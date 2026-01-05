const User = require('../schemas/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const {userName, password} = req.body;
        const email = req.body.email.toLowerCase();

        // check if email is already used
        const emailExists = await User.findOne({ email });   
             
        if(emailExists){
            return res.status(400).json({message: 'Account exists with email already exists'});
        }

        const newUser = new User ({
            userName,
            email, 
            password
        });

        await newUser.save();

        res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            email: newUser.email
        });
        
    } catch (err){
        if (err.code === 11000) {
            //duplicate
            res.status(400).json({message: 'You have already made an account, please login'});
        } else {
            res.status(400).json({message: 'Something went wrong'});
        }
    }
};

exports.login = async (req, res) => {
    try {
        const {password} = req.body;
        const email = req.body.email.toLowerCase();

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password.'});
        }

        //generate token
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN
        });

        // return user data minus password
        const { password: _, ...userData } = user.toObject(); // Exclude password

        res.status(200).json({token, user:userData});
    } catch (err){
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
};