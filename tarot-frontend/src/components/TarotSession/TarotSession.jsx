import React, { useState } from 'react';
import { tarotCards } from './tarotCards';
import FlippableCard from './FlippableCard';
import '../../styles/CardFlip.css';




const TarotSession = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const toggleCard = (card) => {
    const alreadySelected = selectedCards.some((c) => c.id === card.id);
    if (alreadySelected) {
      setSelectedCards((prev) => prev.filter((c) => c.id !== card.id));
    } else if (selectedCards.length < 5) {
      setSelectedCards((prev) => [...prev, card]);
    }
  };

  const handleContinue = () => {
    setShowResult(true);
  };

  if (showResult) {
    return (
      <div style={{ padding: '2rem' }}>
        <h2>Seçtiğin Kartlar</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {selectedCards.map((card) => (
            <div key={card.id}>
              <img src={card.image} alt={card.name} width={150} />
              <p style={{ textAlign: 'center' }}>{card.name}</p>
            </div>
          ))}
        </div>
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
    </div>
  );
};

export default TarotSession;
