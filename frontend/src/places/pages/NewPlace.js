import React from 'react'

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'
import './PlaceForm.css'

const NewPlace = (props) => {
    
    const [formState, inputHandler] = useForm(
        {
            title: {
                value: '', isValid: false
            },
            description: {
                value: '', isValid: false
            },
            // address: {
            //     value: '', isValid: false
            // },
        },
        false
    )
    

    
    
    const placeSubmitHandler = (event) =>{
        event.preventDefault();
        console.log(formState.inputs)
    }
    
    return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
        <Input 
        id='title'
        element='input' 
        type='text' 
        label='title' 
        onInput= {inputHandler}
        validators={[VALIDATOR_REQUIRE()]} 
        errorText='please enter a valid title' />
        <Input 
        id='description'
        element='textarea'
        label='description' 
        onInput= {inputHandler}
        validators={[VALIDATOR_MINLENGTH(5)]} 
        errorText='please enter a valid description (at least five characters)' />
        <Input 
        id='Address'
        element='input'
        type='text'
        label='Address' 
        onInput= {inputHandler}
        validators={[VALIDATOR_REQUIRE()]} 
        errorText='please enter a valid Address' />
        <Button type='submit' disabled={!formState.isValid} >ADD PLACE</Button>
    </form>
    )
}

export default NewPlace
