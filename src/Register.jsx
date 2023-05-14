import React, { useState } from 'react';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        var users = JSON.parse(localStorage.getItem('users')) || {};

        if (pass !== confirmPass){
            alert('Passwords don\'t match!');
        }
        else if (users[email]) {
            alert('Email already registered');
          }
        else{
            users[email] = { pass };
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registration sucessful!');
        }
    }


    return(
        <div className='auth-form'>
        <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='yourEmail@mail.com' id='email' name='email'/>
            <span className='err'></span>

            <label htmlFor='password'>Password</label>
            <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
            <span className='err'></span>
            
            <label htmlFor='password'>Confirm password</label>
            <input value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
            <span className='err'></span>
            

            <button type='Submit'>Register!</button>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('login')}>Already have an account? Log in</button>
    </div>
    )
}