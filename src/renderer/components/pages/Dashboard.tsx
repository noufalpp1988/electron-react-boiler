import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import icon from '../../../../assets/icon.svg';

export default function Secret() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login');
      } else {
        const { data } = await axios.post(
          'http://localhost:3001',
          {},
          { withCredentials: true },
        );
        if (!data.status) {
          removeCookie('jwt');
          navigate('/login');
        } else toast(`HI ${data.user}`, { theme: 'dark' });
      }
    };
    verifyUser();
  }, [cookies, navigate, setCookie, removeCookie]);

  const logout = () => {
    removeCookie('jwt');
    navigate('/login');
  };

  return (
    <>
      DASHBOARD
      <div>
        <div className="Hello">
          <img width="200" alt="icon" src={icon} />
        </div>
        <div className="App">
          <Link to="/"> Home </Link>
          <button type="button" onClick={logout}>
            Log Out
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
