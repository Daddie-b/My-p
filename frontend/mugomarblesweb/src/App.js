import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import LoginSignup from './pages/LoginSignup';
import Home from './pages/home'; 
import AdminPage from './pages/AdminPage';
import AdminContactUpdate from './components/AdminContactUpdate'; 
import ProtectedRoute from './components/ProtectedRoute';
import CartPage from './pages/CartPage';
import MyOrders from './pages/MyOrders';
import OrderPage from './pages/OrderPage';

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
                        <Route
              path="/order" element={<OrderPage />} // Add the route for OrderPage
            />
            <Route path="/my-orders" element={<MyOrders />} /> 
          
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;
