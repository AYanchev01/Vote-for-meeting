import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    // Add logic for checking credentials and stuff ...
    // Automatically redirecting to dashboard for testing purpouses
    navigate('/dashboard');
  }, [navigate]);

  return <div>Redirecting...</div>;
};

export default Login;
