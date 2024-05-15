import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Sample from './components/Sample';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Secret from './components/pages/Secret';

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <div className="App">
        <Link to="/"> Home </Link>
        <Link to="/sample"> sample </Link>
        <Link to="/login"> Login </Link>
        <Link to="/register"> Register </Link>
        <Link to="/secret"> Secret </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/sample" element={<Sample />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </Router>
  );
}
