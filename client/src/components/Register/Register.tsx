import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

export const Register: React.FC = () => {
  const [formData, setFormData] = useState({
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, pass, confirmPass } = formData;
    const users: { [key: string]: { pass: string } } = JSON.parse(localStorage.getItem('users') || '{}');

    if (!/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(pass)) {
      alert('Password must contain 6 to 16 characters, at least one digit and at least one letter!');
    } else if (pass !== confirmPass) {
      alert("Passwords don't match!");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      alert('Invalid email!');
    } else if (users[email]) {
      alert('Email already registered');
    } else {
      users[email] = { pass };
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful!');
    }
  };

  const handleFormSwitch = () => {
    navigate("/");
  };

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <label className="form-header">Register</label>
      <div className="box">
        <label htmlFor="email">Email</label>
        <input
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder="yourEmail@mail.com"
          id="email"
          name="email"
          className="input-field"
        />

        <label htmlFor="password">Password</label>
        <input
          value={formData.pass}
          onChange={handleChange}
          type="password"
          placeholder="********"
          id="password"
          name="pass"
          className="input-field"
        />

        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          value={formData.confirmPass}
          onChange={handleChange}
          type="password"
          placeholder="********"
          id="confirmPassword"
          name="confirmPass"
          className="input-field"
        />
      </div>

      <button type="submit" className="submit">
        Register!
      </button>
      <button className="link-btn" onClick={handleFormSwitch}>
        Already have an account? Log in
      </button>
    </form>
  );
};
