import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import TarotSession from "./pages/TarotSession/TarotSession"; // doğru yol

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/tarot" element={<TarotSession />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
