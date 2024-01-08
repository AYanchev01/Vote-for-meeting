import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try{
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: pass }),
      });
      if (response.ok) {
        const data = await response.json();

        const accessToken = data.accessToken;
        localStorage.setItem('accessToken', accessToken);
        navigate("/dashboard");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Invalid username or password.");
    }
  };

  const handleFormSwitch = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate("/register");
  };

  return (
    <div className="page-container">
      <div className="navbar">
        <span className="website-name">Doodle</span>
      </div>
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
    </div>
  );
};

export default Login;