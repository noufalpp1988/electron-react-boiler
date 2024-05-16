import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Sample from './components/Sample';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Dashboard from './components/pages/Dashboard';

function Home() {
  return (
    <>
      HOME
      <Link to="/sample"> sample </Link>
      <Link to="/login"> Login </Link>
      <Link to="/register"> Register </Link>
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
