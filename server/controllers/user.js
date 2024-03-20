const UserSchema = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if(!username.trim() || !email.trim() || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await UserSchema.find({email});
        console.log(user);
        if(user?.length) {
            return res.status(409).json({ message: 'User already exists with this email'})
        }

        const hashedpassword = await bcrypt.hash(password, 10);
        const newUser = UserSchema({
            username,
            email,
            password: hashedpassword
        })

        await newUser.save();
        return res.status(200).json({ message: 'User added' });
    } catch (error) {
        console.log('err', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const signIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        if(!email.trim() && !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const user = await UserSchema.findOne({email});
        if(!user) {
            return res.status(404).json({ message: 'User not found with this email'})
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('access_token', token, { httpOnly: true, maxAge: 3600000 });
        return res.status(200).json({ message: 'Signin successful' });
    } catch (error) {
        console.log('err', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        if(!email.trim()) {
            return res.status(400).json({ message: 'Enter your email to reset password' });
        }
    
        const user = await UserSchema.findOne({email});
        if(!user) {
            return res.status(404).json({ message: 'User not found with this email'})
        }
    
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '5m'});

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'kkdas202@gmail.com',
                pass: process.env.APP_PWD
            }
        });
        const mailOptions = {
            from: 'kkdas202@gmail.com',
            to: email,
            subject: 'Reset password link',
            text: `http://localhost:3000/resetPassword/${token}`
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.status(500).json({ message: 'There is an error while sending email' });
            } else {
                return res.status(200).json({ message: 'Email sent!' });
            }
        });
    } catch (error) {
        console.log('err', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const resetPassword = async (req, res) => {
    const token = req.params.token;
    const { password } = req.body;

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const id = decodedToken.id;
        const hashedpassword = await bcrypt.hash(password, 10);
        await UserSchema.findByIdAndUpdate({_id: id}, {password: hashedpassword});

        return res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        console.log('err', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const verifyUser = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized: No token found' });
        }
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        next();
        return res.status(200).json({ message: 'Authorized' });
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

const signOut = async (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ message: 'logged out successfully' });
}

module.exports = { signUp, signIn, forgotPassword, resetPassword, verifyUser, signOut };