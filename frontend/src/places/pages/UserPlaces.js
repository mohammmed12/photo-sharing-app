import React from 'react'
import { useParams } from 'react-router-dom';
import PlaceList from '../components/PlaceList';


const PLACES = [
    {
        id:'p1',
        title: 'empire state building',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location : {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u1'
    },
    {
        id:'p2',
        title: 'empire state building',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location : {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'u2'
    }
]

const UserPlaces = (props) => {
    const userId = useParams().userId;
    const loadedPlaces = PLACES.filter(place => place.creator === userId )
    return (
        <PlaceList items={loadedPlaces} />
    )
}

export default UserPlaces
