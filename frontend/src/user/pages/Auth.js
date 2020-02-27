import React, {useState, useContext} from 'react'

import {AuthContext} from '../../shared/context/auth-context';
import Card from '../../shared/components/UIElements/Card'
import Input from '../../shared/components/FormElements/Input'
import Button from '../../shared/components/FormElements/Button'
import {VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from '../../shared/util/validators';
import {useForm} from '../../shared/hooks/form-hook';

import './Auth.css'

const Auth = () => {
    
    const auth = useContext(AuthContext)
    
    const[ isLoginMode, setIsLoginMode] = useState(true)
    
    const [formState, inputHandler, setFormData] = useForm({
        email: {
            value: '', isValid: false
        }, password :{
            value: '', isValid: false
        }
    }, false)
    
    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData({
                ...formState.inputs,
                name: undefined,
            }, formState.inputs.email.isValid && formState.inputs.password.isValid)
        }else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '', isValid: false
                }
            }, false)
        }
        
        setIsLoginMode(prevMode => !prevMode);
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(formState.inputs)
        auth.login();
    }
    
    return (
        <Card className="authentication">
            <h2>Login Required</h2>
            <hr />
            <form onSubmit={onSubmitHandler}>
                {!isLoginMode && 
                <Input type='text' label='Username' element='input' id="name" validators={[VALIDATOR_REQUIRE()]}
                errorText='please enter a name'
                onInput={inputHandler} />
                }
                <Input type='email' label='E-mail' element='input' id="email" validators={[VALIDATOR_EMAIL()]}
                errorText='please enter a valid email address'
                onInput={inputHandler} />
                
                <Input type='password' label='password' element='input' id="password" validators={[VALIDATOR_MINLENGTH(5)]}
                errorText='please enter a valid password, at least five characters '
                onInput={inputHandler} />
                
                <Button type='submit' disabled={!formState.isValid} >
                    {isLoginMode ? 'Login' : 'SignUp'}
                </Button>
            </form>
            <Button inverse onClick={switchModeHandler}>
                Switch to {isLoginMode ? 'SignUp' : 'Login'}
            </Button>
        </Card>
    )
}

export default Auth;
