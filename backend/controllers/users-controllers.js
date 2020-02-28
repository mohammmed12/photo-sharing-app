const uuid = require('uuid/v4');
const {validationResult} = require('express-validator')

const HttpError = require('../models/http-error')


const USERS = [
    {
        id: 'u1',
        image: 'https://www.feedfond.com/wp-content/uploads/2017/11/Here-s-What-The-Most-Beautiful-Girl-In-The-World-Looks-Like-Now-Featured-image.png',
        name: 'stephen girder',
        email: 'test@test.com',
        password: 'tester',
        
    }
]

const getAllUsers = (req, res, next) => {
    res.json({users: USERS})
}

const signupUser = (req, res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('inavalid inputs, please check your data', 422)
    }
    
    const { name, email, password } = req.body;
    
    const hasUser = USERS.find(u => u.email === email);
    
    if(hasUser) {
        throw new HttpError('email address alredy exists !! bitch ',422)
    }
    
    const createdUser = {
        id: uuid(),
        name,
        email,
        password
    }
    
    USERS.push(createdUser);
    
    res.status(201).json({newUser : createdUser })
    
}

const loginUser = (req, res, next) => {
    const { email , password } = req.body;
    
    const identifiedUser = USERS.find(u => u.email === email);
    
    if (!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('could not identify user, credentials not valid', 401) 
    }
    
    res.json({ message: 'logged in!!'})
}



exports.getAllUsers = getAllUsers;
exports.signupUser = signupUser;
exports.loginUser = loginUser;