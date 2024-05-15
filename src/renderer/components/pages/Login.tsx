import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:3001/register', {
        ...values,
      });
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
            <label htmlFor="email">Email</label>
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
          </div>
          <div>
            <label htmlFor="password">Password</label>
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
          </div>
          <button type="submit">LOGIN</button>
          <span>
            New User!
            <br />
            <Link to="/register"> Register</Link>
          </span>
        </form>
        <ToastContainer />
      </div>
    </>
  );
}
