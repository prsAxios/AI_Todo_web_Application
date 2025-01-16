import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const StoredUser = JSON.parse(localStorage.getItem('user'));

    if (StoredUser) {
      const currentTime = Date.now();

      if (currentTime < StoredUser.expiryTime) {
        if (StoredUser.email === email && StoredUser.password === password) {
          sessionStorage.setItem('user', JSON.stringify(StoredUser));
          navigate('/');
        } else {
          setError('Invalid Email or Password');
        }
      } else {
        setError('Session expired, please sign up again');
        localStorage.removeItem('user');
      }
    } else {
      setError('No user found. Please sign up first.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-indigo-500 to-purple-900 flex items-center justify-center p-4">
      <div
        className="bg-white max-w-md w-full p-8 rounded-lg shadow-2xl transform transition duration-500 ease-in-out scale-90 hover:scale-100 animate-fadeIn"
        style={{
          animation: 'fadeIn 1.5s ease-out forwards',
        }}
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-4"
          autoComplete="off"
        >
          <label className="block">
            <span className="text-gray-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 border rounded-lg shadow focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
          </label>
          <label className="block">
            <span className="text-gray-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-3 border rounded-lg shadow focus:ring-2 focus:ring-purple-400 focus:outline-none transition"
            />
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{' '}
          <a
            href="/signup"
            className="text-purple-500 hover:underline hover:text-purple-600 transition"
          >
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
