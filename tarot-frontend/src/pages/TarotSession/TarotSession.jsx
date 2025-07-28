import React, { useState } from 'react';
import FlippableCard from './FlippableCard';
import { tarotCards } from './tarotCards';
import axios from 'axios';
import '../../styles/TarotSession.css';

const TarotSession = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);

  const toggleCard = (card) => {
    const alreadySelected = selectedCards.some((c) => c.id === card.id);
    if (alreadySelected) {
      setSelectedCards(prev => prev.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < 5) {
      setSelectedCards(prev => [...prev, card]);
    }
  };

  const handleContinue = async () => {
    setLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const response = await axios.post('http://localhost:3000/api/tarot/analyze', {
        selectedCards: selectedCards.map(card => card.name),
      });
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError("Yorum alınamadı. Lütfen tekrar deneyin.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem' }}>
        <p>Yorum oluşturuluyor, lütfen bekleyin...</p>
      </div>
    );
  }

  if (analysis) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Seçtiğin Kartların Yorumu</h2>
        <p style={{ whiteSpace: 'pre-line' }}>{analysis}</p>
        <button
          onClick={() => {
            setAnalysis(null);
            setSelectedCards([]);
            setError(null);
          }}
          style={{
            marginTop: '1rem',
            padding: '0.5rem 1rem',
            backgroundColor: 'purple',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
          }}
        >
          Yeniden Seçim Yap
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>5 Tarot Kartı Seçin</h2>
      <p>{selectedCards.length} / 5 kart seçildi</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.5rem' }}>
        {tarotCards.map((card) => {
          const isSelected = selectedCards.some((c) => c.id === card.id);
          return (
            <FlippableCard
              key={card.id}
              isFlipped={isSelected}
              frontImage={card.image}
              onClick={() => toggleCard(card)}
            />
          );
        })}
      </div>

      <button
        onClick={handleContinue}
        disabled={selectedCards.length !== 5}
        style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: selectedCards.length === 5 ? 'purple' : '#999',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: selectedCards.length === 5 ? 'pointer' : 'not-allowed',
        }}
      >
        Devam Et
      </button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}
    </div>
  );
};

export default TarotSession;
