import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import './Register.css';

export default function Register() {
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
        'http://localhost:3001/register',
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
          navigate('/');
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
        <h2>REGISTER ACCOUNT</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">
              Email
              <br />{' '}
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
              Password
              <br />
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
          <button type="submit">Register</button>
          <span>
            Already have an Account!
            <br />
            <Link to="/login"> Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}
