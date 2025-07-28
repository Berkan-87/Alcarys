import React from 'react';
import '../../styles/CardFlip.css';


const FlippableCard = ({ isFlipped, frontImage, onClick }) => {
  return (
    <div
      className={`card-container ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <img src={frontImage} alt="Kartın önü" />
        </div>
        <div className="card-back">
          <img src="/images/cards/back.jpg" alt="Kartın arkası" />
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
