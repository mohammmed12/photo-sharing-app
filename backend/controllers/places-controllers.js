const uuid = require('uuid/v4')
const { validationResult } = require('express-validator');
const getCoordsForAddress = require('../util/location.js')
const HttpError = require('../models/http-error');

const Place = require('../models/place')


let DUMMY_PLACES = [
    {id: 'p1',
    title: 'empire state building',
    description: 'one of the most famous sky scarpers in the world',
    location : {
        lat: 40.7484474,
        lng: -73.9871516
    },
    address: '20 W 34th st , new york',
    creator: 'u1'
    }
]


const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    
    const place = DUMMY_PLACES.find(p => p.id === placeId)
    
    if (!place) {
       throw new HttpError('could not find a place for the provided id', 404)
    }
    
    res.json({place});
};

const getPlacesByUserId = (req, res,next)=> {
    const userId = req.params.uid;
    
    const places = DUMMY_PLACES.filter(p => p.creator === userId)
    
    if (!places || places.length === 0) {
        
        return next(new HttpError('could not find any place for that user id', 404));
     }
    
    res.json({places})
}

const createPlace = async (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        throw new HttpError('invalid inputs passed, please check your data', 422)
    }
    
    const { title, description,  address, creator } = req.body;
    
    const coordinates = getCoordsForAddress(address);
    
    const createdPlace = new Place({
        title, description, address, location: coordinates, image: 'https://imgix.ranker.com/user_node_img/1548/30955921/original/alexandra-daddario-photo-u62?w=650&q=60&fm=pjpg&fit=crop&crop=faces', creator
    })
    
    try{
        await createdPlace.save();    
    }catch (err) {
        const error = new HttpError('creating place failed, please try again !! bitch', 500)
        return next(error)
    }
    
    
    res.status(201).json({place: createdPlace})
}

const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req)
    
    if (!errors.isEmpty()) {
        throw new HttpError('invalid inputs passed, please check your data', 422)
    }
    
    const placeId = req.params.pid;
    const { title, description } = req.body;
    
    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)}
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId)
    
    updatedPlace.title = title;
    updatedPlace.description = description;
    
    DUMMY_PLACES[placeIndex] = updatedPlace;
    
    res.status(200).json({place: updatedPlace})
}

const deletePlace= (req,res,next) => {
    const placeId = req.params.pid;
    
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('could not find a place with that id !! bitch')
    }
    
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    
    res.status(200).json({ message: 'deleted place' })
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace= createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;