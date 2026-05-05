import { Routes, Route, NavLink } from 'react-router';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import NotFound from './pages/Not Found';

function App() {
  return (
    <div>
      <nav className="nav">
        <NavLink
          to="/login"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Login
        </NavLink>

        <NavLink
          to="/dashboard"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
        >
          Users
        </NavLink>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;