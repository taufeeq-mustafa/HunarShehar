import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { login, register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await login(formData.email, formData.password);
        navigate('/dashboard');
      } catch (error) {
        console.error('Login error:', error);
        alert('Invalid login credentials.');
      }
    } else {
      try {
        await register(formData.email, formData.password);
        alert('Registration successful! Please log in.');
        setIsLogin(true);
      } catch (error) {
        console.error('Registration error:', error);
        alert('Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center p-4">
      <div className="w-full max-w-xs mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-gray-800">Logo</h1>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm text-blue-800 mb-1">
              Email or Username
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-blue-800 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-200 rounded-md"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-indigo-900 text-white font-medium rounded-md"
            >
              {isLogin ? 'Log in' : 'Register'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-indigo-600"
            >
              {isLogin ? 'Register' : 'Sign in'}
            </button>
          </p>
        </div>
        </div>
      </div>
    
  );
};

export default AuthPage;