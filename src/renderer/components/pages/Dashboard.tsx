import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import icon from '../../../../assets/icon.svg';

// calling IPC exposed from preload script
const authToken = async () => {
  const value = await window.commonHandler.getAuthToken([]);
  return value;
};

export default function Dashboard() {
  const navigate = useNavigate();

  const [cookies, setCookie, removeCookie] = useCookies();

  if (!authToken) {
    console.log('IPC:AuthToken:', authToken);
    setCookie('jwt', authToken);
  }

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt && !authToken) {
        console.log('no cookei');
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

  const logout = async () => {
    console.log(
      'initiate logout..',
      await window.commonHandler.getAuthToken([]),
    );
    removeCookie('jwt');
    if ((await window.commonHandler.getAuthToken(['logout'])).length === 0)
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
