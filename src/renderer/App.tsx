import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCallback, useEffect, useState } from 'react';
import Sample from './components/Sample';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';
import MenuComponent, { menuItemInterface } from './components/menu/menu';

function Home() {
  const [enableLoginMenu, setEnableLoginMenu] = useState(true);
  const verifyUser = useCallback(async () => {
    const cookieMain = await window.commonHandler.getCookie([]);
    setEnableLoginMenu(cookieMain.some((v: any) => v.name === 'jwt'));
  }, [setEnableLoginMenu]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const menuItems: Array<menuItemInterface> = [
    {
      name: 'Sample',
      path: 'sample',
      enabled: true,
      visibility: true,
    },
    {
      name: 'Dashboard',
      path: 'dashboard',
      enabled: true,
      visibility: true,
    },
    {
      name: 'Login',
      path: 'login',
      enabled: true,
      visibility: !enableLoginMenu,
    },
    {
      name: 'Register',
      path: 'register',
      enabled: true,
      visibility: !enableLoginMenu,
    },
  ];

  return (
    <>
      HOME
      <MenuComponent menu={menuItems} logout={enableLoginMenu} />
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
