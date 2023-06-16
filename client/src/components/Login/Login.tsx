import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    let users: { [key: string]: { pass: string } } =
      JSON.parse(localStorage.getItem("users") || "{}") || {};
    let user = users[email];

    if (!user || user.pass !== pass) {
      alert("Invalid email or password");
    } else {
      alert("Login successful!");
      navigate("/dashboard");
    }
  };

  const handleFormSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <label className="login-form-header">Sign in</label>
        <div className="login-box">
          <label className="label-email" htmlFor="email">Email</label>
          <input className="login-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="yourEmail@mail.com"
            id="email"
            name="email"
          />

          <label className="label-password" htmlFor="password">Password</label>
          <input className="login-input"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
          />
        </div>
        <button className="submit" type="submit">
          Log in!
        </button>
        <button
          className="link-btn"
          onClick={handleFormSwitch}
        >
          Don't have an account? Register
        </button>
      </form>
    </div>
  );
};

export default Login;
