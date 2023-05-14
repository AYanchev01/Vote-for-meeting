import React, { useState } from "react"

export const Register = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(email);
    }

    return(
        <div className='auth-form'>
        <form className='register-form' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} type='email' placeholder='yourEmail@mail.com' id='email' name='email'/>

            <label htmlFor='password'>Password</label>
            <input value={pass} onChange={(event) => setPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
            
            <label htmlFor='password'>Confirm password</label>
            <input value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} type='password' placeholder='********' id='password' name='password'/>
            
            <button type='Submit'>Register!</button>
        </form>
        <button className='link-btn' onClick={() => props.onFormSwitch('login')}>Already have an account? Log in</button>
    </div>
    )
}