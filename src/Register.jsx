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
            console.log(localStorage);
            alert('Registration sucessful!');
        }
    }


    return(
        <form className='register-form' onSubmit={handleSubmit}>
            <label className='form-header'>Register</label>
            <div className='box'>
                <label htmlFor='email'>Email</label>
                <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='yourEmail@mail.com' id='email' name='email'/>

                <label htmlFor='password'>Password</label>
                <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
                
                <label htmlFor='password'>Confirm password</label>
                <input value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
            </div>
            <button className ='submit' type='Submit'>Register!</button>
            <button className='link-btn' onClick={() => props.onFormSwitch('login')}>Already have an account? Log in</button>
        </form>
    )
}