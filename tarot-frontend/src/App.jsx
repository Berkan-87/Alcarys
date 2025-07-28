// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import CardSelection from './components/TarotSession/TarotSession';

const App = () => {
  return (
     <Routes>
      <Route path="/" element={<Login />} />           {/* Giriş sayfası */}
      <Route path="/register" element={<Register />} /> {/* Kayıt sayfası */}
      <Route path="/login" element={<Login />} />       {/* Alternatif giriş yolu */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/select" element={<CardSelection />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;




