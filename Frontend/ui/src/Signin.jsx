import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // To navigate after login

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    const userData = { username, password };
  
    try {
      const response = await axios.post('http://localhost:9000/api/auth/login', userData);
  
      // Destructure the response to get the token and user data
      const { token, user } = response.data;
  
      // Store token and user data in localStorage
      localStorage.setItem('authToken', token); // Save the token
      localStorage.setItem('user', JSON.stringify(user)); // Save user data (as a string)
  
      setIsLoading(false);
  
      // Check the role from the user object in the response and navigate accordingly
      if (user.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (user.role === 'user') {
        navigate('/user-dashboard');
      } else {
        setMessage('Unknown role');
      }
    } catch (error) {
      setIsLoading(false);
      setMessage('Error: ' + error.response?.data?.message || 'Login failed');
    }
  };
  
  return (
    <div className="signin-container mt-[150px] flex justify-center">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group mb-4">
            <label htmlFor="username" className="block text-sm font-medium mb-2">Username:</label>
            <input
              type="text"
              id="username"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group mb-6">
            <label htmlFor="password" className="block text-sm font-medium mb-2">Password:</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {message && (
          <p className={`mt-4 text-center ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Signin;
