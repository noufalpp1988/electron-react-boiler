import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCallback, useEffect, useState } from 'react';
import Sample from './components/Sample';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';

function Home() {
  const [enableLoginMenu, setEnableLoginMenu] = useState(true);
  const verifyUser = useCallback(async () => {
    const cookieMain = await window.commonHandler.getCookie([]);
    setEnableLoginMenu(cookieMain.some((v: any) => v.name === 'jwt'));
  }, [setEnableLoginMenu]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <>
      HOME
      <Link to="/sample"> sample </Link>
      {!enableLoginMenu && <Link to="/login"> Login </Link>}
      {!enableLoginMenu && <Link to="/register"> Register </Link>}
      <Link to="/dashboard"> Dashboard </Link>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
