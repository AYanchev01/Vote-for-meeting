import React, { useState } from "react"

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        var users = JSON.parse(localStorage.getItem('users')) || {};
        var user = users[email];
        if (!user || user.password !== pass) {
            console.log(user.password);
            alert('Invalid email or password');
            return;
          }
    }

    return(
        <div className='auth-form'>
            <form className='login-form' onSubmit={handleSubmit}>
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='yourEmail@mail.com' id='email' name='email'/>

                <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
                <button type='Submit'>Log in!</button>
            </form>
            <button className='link-btn' onClick={() => props.onFormSwitch('register')}>Don't have an account? Register here.</button>
            </div>
    )
}