import React, { useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import icon from '../../../../assets/icon.svg';

// calling IPC exposed from preload script

export default function Dashboard() {
  const navigate = useNavigate();

  // const [cookies, setCookie, removeCookie] = useCookies();

  const verifyUser = useCallback(async () => {
    const cookieMain = await window.commonHandler.getCookie([]);
    if (cookieMain.length !== 0) {
      console.log('found main cookei:', cookieMain);
      if (cookieMain.some((c: any) => c.name === 'jwt')) {
        const jwtCookie = cookieMain.filter((c: any) => c.name === 'jwt')[0]
          ?.value;
        await window.commonHandler.getCookie(['loggedin']);
        const isFirstLoginCookie = cookieMain.filter(
          (c: any) => c.name === 'isFirstLogin',
        )[0]?.value;
        console.log('found jwt cookei:', jwtCookie, isFirstLoginCookie);
        const { data } = await axios.post(
          'http://localhost:3001',
          {},
          { withCredentials: true },
        );
        isFirstLoginCookie === 'true'
          ? toast(`HI ${data?.user}`, { theme: 'dark' })
          : null;
      } else {
        console.log('not found jwt cookei');
        navigate('/login');
      }
    } else {
      console.log('no main cookei');
    }
  }, [navigate]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <>
      DASHBOARD
      <div>
        <div className="Hello">
          <img width="200" alt="icon" src={icon} />
        </div>
        <div className="App">
          <Link to="/"> Home </Link>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
