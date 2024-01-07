import React, { useState } from 'react';

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        var users = JSON.parse(localStorage.getItem('users')) || {};

        if(!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass)) {
            alert('Password must contain 6 to 16 characters, at least one digit and at least one letter!');
        }
        else if (pass !== confirmPass){
            alert('Passwords don\'t match!');
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            alert('Invalid email!');
        }
        else if (users[email]){
            alert('Email already registered');
          }
        else {
            users[email] = { pass };
            localStorage.setItem('users', JSON.stringify(users));
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