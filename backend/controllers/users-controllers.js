// const uuid = require('uuid/v4');
const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error')

const User = require('../models/user')


const getAllUsers = async (req, res, next) => {
    
    let users
    try{
        users = await User.find({}, '-password')
    }catch(err) {
        const error = new HttpError('Fetching users failed, !!!!', 500);
        return next(error);
    }
    
    res.json({users: users.map(user => user.toObject({ gtters: true}))})
}

////////////////////////////
//////////////////////////

const signupUser = async(req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return next(new HttpError('inavalid inputs, please check your data', 422));
    }
    
    const { name, email, password } = req.body;
    
    let existingUser;
    try{
        existingUser =await User.findOne({ email: email});
    }catch (err) {
        const error = new HttpError('Signing up failed, please try again later.', 422);
        return next(error)
    }
    
    if(existingUser) {
        const error = new HttpError('user exists allredy, please login', 422);
        return next(error);
    }
    
    
    const createdUser = new User({
        name,
        email,
        image: 'https://cdn3.vectorstock.com/i/1000x1000/98/67/muslim-beautiful-girl-woman-in-hijab-full-length-vector-18339867.jpg',
        password,
        places : []
    })
    
    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError('Signing up failed, please try again later', 500);
        return next(error);
    }
    
    res.status(201).json({newUser : createdUser.toObject({ getters : true}) })
    
}
//////////////////////////////////////////////////
/////////////////////////////////////////////////
const loginUser = async (req, res, next) => {
    const { email , password } = req.body;
    
    let existingUser;
    try{
        existingUser =await User.findOne({ email: email});
    }catch (err) {
        const error = new HttpError('Signing up failed, please try again later.', 422);
        return next(error)
    }
    
    if(!existingUser) {
        const error = new HttpError('please Sign up first',500)
        return next(error)
    }
    if(existingUser.password !== password) {
        const error = new HttpError('Invalid credentials !!!!',500)
        return next(error)
    }
    
    res.json({ message: 'logged in!!'})
}



exports.getAllUsers = getAllUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;