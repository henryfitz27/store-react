import './sign-up-form.styles.scss'
import { useState } from 'react';
// import { useState, useContext } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
// import { UserContext } from '../../contexts/user.context';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);

    // const { setCurrentUser } = useContext(UserContext);

    //https://dmitripavlutin.com/javascript-object-destructuring/
    //How to Use Object Destructuring in JavaScript
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if( password !== confirmPassword) {
            alert('password do not match')
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, {displayName});
            // setCurrentUser(user);
            resetFormFields();            
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                alert ('Cannot create user, email already in use');
            }
            console.log('user creation encountered an error','error');
        }

    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        //... (three dots) in JavaScript is the 'spread' operator
        setFormFields({ ...formFields, [name]: value })
    };

    return (
        <div className='sign-up-container'>
            <h2>Don't have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' type='text' required onChange={handleChange} name='displayName' value={displayName} />                
                <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email} />                
                <FormInput label='Password' type='password' required onChange={handleChange} name='password' value={password} />                
                <FormInput label='Confirm Password' type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />                
                <Button type='submit'>Sign Up</Button>                

            </form>
        </div>
    )
};

export default SignUpForm;

