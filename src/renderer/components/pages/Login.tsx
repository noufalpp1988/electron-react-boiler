import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const generateError = (err: any) =>
    toast.error(err, { position: 'bottom-right' });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:3001/login',
        {
          ...values,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        },
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          if (password) generateError(password);
        } else {
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Link to="/"> Home </Link>
      <div className="container">
        <h2>LOGIN</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">
              Email <br />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <div>
            <label htmlFor="password">
              Password Email <br />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={(e) =>
                  setValues({
                    ...values,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <button type="submit">LOGIN</button>
          <span>
            New User!
            <br />
            <Link to="/register"> Register</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
