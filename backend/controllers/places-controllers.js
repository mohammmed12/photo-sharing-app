const mongoose = require("mongoose")
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location.js')
const HttpError = require('../models/http-error');

const Place = require('../models/place')
const User = require('../models/user')


const getPlaceById = async (req, res, next) => {
    const placeId = req.params.pid;
    
    let place;
    try{
        place =await Place.findById(placeId);    
    }catch(err) {
        const error = new HttpError('something went wrong, could not find place', 500);
        return next(error);
    }
    
    
    if (!place) {
       const error = new HttpError('could not find place for the provided id', 404);
       return next(error);
    }
    
    res.json({place : place.toObject( {getters : true}) });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


const getPlacesByUserId = async(req, res,next)=> {
    const userId = req.params.uid;
    
    
    let places
    try {
        places = await Place.find({creator : userId})
    }catch(err) {
        const error = new HttpError('fetching places failed, please try again later', 500);
        return next(error);
    }
    
    if (!places || places.length === 0) {
        
        return next(new HttpError('could not find any place for that user id', 404));
     }
    
    res.json({places: places.map(place => place.toObject({ getters : true}))})
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const createPlace = async (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return next(new HttpError('invalid inputs passed, please check your data', 422));
    }
    
    const { title, description,  address, creator } = req.body;
    
    const coordinates = getCoordsForAddress(address);
    
    const createdPlace = new Place({
        title, description, address, location: coordinates, image: 'https://imgix.ranker.com/user_node_img/1548/30955921/original/alexandra-daddario-photo-u62?w=650&q=60&fm=pjpg&fit=crop&crop=faces', creator
    })
    
    let user;
    
    try{
        user = await User.findById(creator);
    }catch (err) {
        const error = new HttpError('creating place failed!!', 500);
        return next(error)
    }
    
    if(!user) {
        const error = new HttpError('we could not find user for the provided id!!', 500);
        return next(error)
    }
    console.log(user);
    
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session : sess });
        user.places.push(createdPlace);
        await user.save({ session : sess});
        await sess.commitTransaction();
        
    }catch (err) {
        const error = new HttpError('creating place failed, please try again !! !!', 500)
        return next(error)
    }
    
    
    res.status(201).json({place: createdPlace})
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const updatePlaceById = async (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        return next(new HttpError('invalid inputs passed, please check your data', 422))
    }
    
    const placeId = req.params.pid;
    const { title, description } = req.body;
    
    let place;
    try{
        place = await Place.findById(placeId)
    } catch(err) {
        const error = new HttpError('something went wrong, could not update place', 500);
        return next(error)
    }
    
    place.title = title;
    place.description = description;
    
    try{
        await place.save();
    }catch(err){
        const error = new HttpError('something went wrong, could not update place', 500);
        return next(error)
    }
    
    res.status(200).json({place: place.toObject({ getters : true })})
}

///////////////////////////////////////////////////////////////////////////////////////////////

const deletePlace= async (req,res,next) => {
    const placeId = req.params.pid;
    
    let place;
    
    try{
        place = await Place.findById(placeId).populate('creator')
    }catch(err) {
        const error = new HttpError('something went wrong, could not delete place', 500);
        return next(error)
    }
    
    if (!place) {
        const error = new HttpError('could not find place for the id provided !!', 404);
        return next(error)
    }
    
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session : sess});
        place.creator.places.pull(place);
        await place.creator.save({session : sess});
        await sess.commitTransaction();
    }catch(err) {
        const error = new HttpError('something went wrong, could not delete place', 500);
        return next(error)
    }
    
    res.status(200).json({ message: 'deleted place' })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace= createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;