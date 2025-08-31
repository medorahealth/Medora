import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Navbar from '../components/Navbar';
import { api } from '../utils/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.login(email, password);
      if (response.token) {
        // Store the token in localStorage
        localStorage.setItem('token', response.token);
        router.push('/dashboard');
      } else {
        setError('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Login - Lab Test Website</title>
        <meta name="description" content="Login to book lab tests and view reports" />
      </Head>

      <Navbar />

      <main className="login-page">
        <div className="login-container">
          <div className="login-box">
            <h1>Welcome Back</h1>
            <p className="subtitle">Login to access your account</p>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>

              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <p className="signup-prompt">
              Don't have an account?{' '}
              <Link href="/register">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </main>

      <style jsx>{`
        .login-page {
          min-height: 100vh;
          padding-top: 80px;
          background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);
        }

        .login-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 4rem 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .login-box {
          background: white;
          padding: 3rem;
          border-radius: 16px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 480px;
        }

        h1 {
          color: #1a365d;
          font-size: 2rem;
          margin-bottom: 0.5rem;
          text-align: center;
        }

        .subtitle {
          color: #4a5568;
          text-align: center;
          margin-bottom: 2rem;
        }

        .error-message {
          background: #fed7d7;
          color: #9b2c2c;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 1.5rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        label {
          display: block;
          color: #2d3748;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          transition: border-color 0.2s;
        }

        input:focus {
          outline: none;
          border-color: #4f46e5;
        }

        .login-button {
          width: 100%;
          background: #4f46e5;
          color: white;
          border: none;
          padding: 0.875rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .login-button:hover {
          background: #4338ca;
        }

        .login-button:disabled {
          background: #a5b4fc;
          cursor: not-allowed;
        }

        .signup-prompt {
          text-align: center;
          margin-top: 2rem;
          color: #4a5568;
        }

        .signup-prompt a {
          color: #4f46e5;
          text-decoration: none;
          font-weight: 500;
        }

        .signup-prompt a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
