import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignUp = () => {
    if (email && username && password) {
      const user = { email, username, password };
      const expiryTime = Date.now() + 3600000; // 1 hour expiry
      localStorage.setItem('user', JSON.stringify({ ...user, expiryTime }));
      navigate('/login');
    } else {
      setError('Please fill out all fields.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-blue-500 to-black   flex items-center justify-center p-4">
      <div
        className="bg-white max-w-md w-full p-8 rounded-lg shadow-2xl transform transition duration-500 ease-in-out scale-90 hover:scale-100 animate-fadeIn"
        style={{
          animation: 'fadeIn 1.5s ease-out forwards',
        }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Sign Up
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
          autoComplete="off"
        >
          <label className="block">
            <span className="text-gray-600">Username</span>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 border rounded-lg shadow focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </label>
          <label className="block">
            <span className="text-gray-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg shadow focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </label>
          <label className="block">
            <span className="text-gray-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg shadow focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            onClick={handleSignUp}
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-400 to-blue-500 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
