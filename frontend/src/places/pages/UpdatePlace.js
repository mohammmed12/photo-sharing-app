import React, {useEffect,useState} from 'react'
import {useParams} from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import {useForm } from '../../shared/hooks/form-hook'
import Card from '../../shared/components/UIElements/Card'

import './PlaceForm.css'

const PLACES = [
    {
        id:'p1',
        title: 'empire state building',
        description: 'one of the most famous sky scrapers in the world',
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
        title: ' faculty of engineering kfs uni',
        description: 'one of the most famous sky scrapers in the world',
        imageURL: 'https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg',
        address: '20 W 34th St, New York, NY 10001, United States',
        location : {
            lat: 40.7484405,
            lng: -73.9878584
        },
        creator: 'p2'
    }
]


const UpdatePlace = () => {
    const [isLoading, setIsLoading] = useState(true)
    
    const placeId = useParams().placeId;
    
    
    
    const [formState, inputHandler,setFormData] = useForm({
        title:
        {value: '',
        isValid: false},
        
        description:
        {value: '',
        isValid: false}
    }, true)
    
    const identifiedPlace = PLACES.find(p => p.id === placeId);
    
    
    
    useEffect(() => {
        if (identifiedPlace){
            setFormData(
                {
                    title:
                    {value: identifiedPlace.title,
                    isValid: true},
                        
                    description:
                    {value: identifiedPlace.description,
                    isValid: true}
                }, true
                );   
        }
        setIsLoading(false)
    }, [setFormData, identifiedPlace])
    
    const placeUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        
    }
    
    
    if (!identifiedPlace) {
        return <div className="center">
            <Card>
            <h2>could not find place!</h2>
            </Card>
        </div>
    }
    
    return (
        !isLoading ? (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler} >
            <Input id='title' 
            element='input'
            type='text' 
            validators={[VALIDATOR_REQUIRE()]} 
            label= 'title'
            errorText='please enter a valid title'
            onInput={inputHandler}
            initialValue={formState.inputs.title.value}
            initialValid={formState.inputs.title.isValid}
            />
            <Input id='description' 
            element='textarea'
            validators={[VALIDATOR_MINLENGTH(5)]} 
            label= 'description'
            errorText='please enter a valid DESCRIPTION at least 5 characters'
            onInput={inputHandler}
            initialValue={formState.inputs.description.value}
            initialValid={formState.inputs.description.isValid}
            />
            {/* <Input id='title' 
            element='input'
            type='text' 
            validators={[VALIDATOR_REQUIRE()]} 
            label= 'title'
            errorText='please enter a valid title'
            onInput={() => {}}
            value={identifiedPlace.title}
            valid={true}
            /> */}
            <Button type="submit" disabled={!formState.isValid} >
                UPDATE PLACE
            </Button>
        </form>) : <h2 className="center">loading....</h2>
    )
}

export default UpdatePlace
