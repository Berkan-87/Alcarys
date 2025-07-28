import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (error) {
        console.error('Kullanıcı alınamadı:', error.message);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Yükleniyor...</p>;

  return (
    <div className="dashboard-container">
      <h2>Welcome {user?.name || 'Kullanıcı'}!</h2>

      <button onClick={() => navigate('/tarot')}>
         Start Your Tarot Reading
      </button>

      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Dashboard;
