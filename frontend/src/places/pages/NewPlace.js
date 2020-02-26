import React, {useCallback, useReducer} from 'react'

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button'
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from '../../shared/util/validators'

import './NewPlace.css'

const formReducer = (state, action) => {
    switch (action.type) {
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for (const inputId in state.inputs) {
                if (inputId === action.inputId) {
                    formIsValid = formIsValid && action.isValid;
                }else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid
                }
            }
            return {
            ...state,
            inputs: {
                ...state.inputs,
                [action.inputId] : { value: action.value, isValid: action.isValid}
                },
                isValid: formIsValid
            }
        default:
            return state
    }
}

const NewPlace = (props) => {
    
    const [formState, dispatch] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '', isValid: false
            },
            description: {
                value: '', isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type:'INPUT_CHANGE',
            value: value,
            isValid: isValid,
            inputId: id });
    }, [dispatch])
    
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
        label='Address' 
        onInput= {inputHandler}
        validators={[VALIDATOR_REQUIRE()]} 
        errorText='please enter a valid Address' />
        <Button type='submit' disabled={!formState.isValid} >ADD PLACE</Button>
    </form>
    )
}

export default NewPlace
