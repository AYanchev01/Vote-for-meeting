import React, { useState } from "react"

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        var users = JSON.parse(localStorage.getItem('users')) || {};
        var user = users[email];
        
        if (!user || user.pass !== pass) {
            console.log(localStorage);
            alert('Invalid email or password');
        }else{
            alert('Login successful!');
        }
    }

    return(
        <form className='login-form' onSubmit={handleSubmit}>
            <label className='form-header'>Sign in</label>
            <div className='box'>
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='yourEmail@mail.com' id='email' name='email'/>
                
                <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
            </div>
            <button className='submit' type='Submit'>Log in!</button>
            <button className='link-btn' onClick={() => props.onFormSwitch('Register')}>Don't have an account? Register</button>
        </form>
    )
}