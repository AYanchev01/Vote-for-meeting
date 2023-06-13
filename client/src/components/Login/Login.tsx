import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    var users: { [key: string]: { pass: string } } =
      JSON.parse(localStorage.getItem("users") || "{}") || {};
    var user = users[email];

    if (!user || user.pass !== pass) {
      alert("Invalid email or password");
    } else {
      alert("Login successful!");
    }
  };

  const handleFormSwitch = () => {
    navigate("/register");
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="form-header">Sign in</label>
      <div className="box">
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          placeholder="yourEmail@mail.com"
          id="email"
          name="email"
        />

        <label htmlFor="password">Password</label>
        <input
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
  );
};

// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   useEffect(() => {
    
//     // Add logic for checking credentials and stuff ...
//     // Automatically redirecting to dashboard for testing purpouses
//     navigate('/dashboard');
//   }, [navigate]);

//   return <div>Redirecting...</div>;
// };

export default Login;
