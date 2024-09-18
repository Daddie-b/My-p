import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginSignup from './pages/LoginSignup';
import Home from './pages/home'; 
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import MyOrders from './pages/MyOrders';

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <header className="App-header">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/register" element={<LoginSignup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route
              path="/admin"
              element={<ProtectedRoute element={<AdminPage />} allowedRoles={['admin']} />}
            />
            <Route
              path="/orders"
              element={<ProtectedRoute element={<MyOrders />} allowedRoles={['user']} />}
            />
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
