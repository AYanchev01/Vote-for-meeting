import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    pass: '',
    confirmPass: ''
  });
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const {firstName, lastName, email, pass, confirmPass } = formData;

    // if(firstName.length < 1  || lastName.length < 1){
    //   alert('Invalid name');
    // } else
     if (!/^(?=.*\d)(?=.*[!@#$%^&*()\-=_+[\]{};':"\\|,.<>/?]).{6,16}$/.test(pass)) {
      alert('Password must contain 6 to 16 characters, at least one digit and at least one symbol!');
    } else if (pass !== confirmPass) {
      alert("Passwords don't match!");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert('Invalid email!');
    } else {
      try{
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            password: pass,
        }),
      });
        if (response.ok) {
          alert('Registration successful!');
          navigate("/");
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Registration failed');
        }
      } catch (error) {
      console.error(error);
      alert('An error occurred during registration');
      }
    }
  };

  const handleFormSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/");
  };

  return (
  <div className="page-container">
    <div className="navbar">
      <span className="website-name">Doodle</span>
    </div>
    <div className="register-form-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="register-form-header">Register</label>
        <div className="register-box">
          <label className="label-name" htmlFor="first-name">First name</label>
          <input
            value={formData.firstName}
            onChange={handleChange}
            type="text"
            placeholder="First name"
            id="first-name"
            name="firstName"
            className="register-input"
            required
          />
          <label className="label-name" htmlFor="last-name">Last name</label>
          <input
            value={formData.lastName}
            onChange={handleChange}
            type="text"
            placeholder="Last name"
            id="last-name"
            name="lastName"
            className="register-input"
            required
          />
          <label className="label-email" htmlFor="email">Email</label>
          <input
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="yourEmail@mail.com"
            id="email"
            name="email"
            className="register-input"
            required
          />

          <label className="label-password" htmlFor="password">Password</label>
          <input
            value={formData.pass}
            onChange={handleChange}
            type="password"
            placeholder="********"
            id="password"
            name="pass"
            className="register-input"
            required
          />

          <label className="label-password" htmlFor="confirmPassword">Confirm password</label>
          <input
            value={formData.confirmPass}
            onChange={handleChange}
            type="password"
            placeholder="********"
            id="confirmPassword"
            name="confirmPass"
            className= "register-input"
            required
          />
        </div>

        <button type="submit" className="submit">
          Register!
        </button>
        <button className="link-btn" onClick={handleFormSwitch}>
          Already have an account? Log in
        </button>
      </form>
      </div>
    </div>
  );
};
