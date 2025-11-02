import React, { useState, useEffect } from 'react';

interface Letter {
  letter: string;
  term: string;
  explanation?: string;
}

interface FlashcardProps {
  front: string;
  back: string;
  color: string;
  chapter: string;
  breakdown?: Letter[];
  onRatingChange?: (flip: 2 | 3, rating: number) => void;
}

const Flashcard: React.FC<FlashcardProps> = ({ front, back, color, chapter, breakdown, onRatingChange }) => {
  const [flipState, setFlipState] = useState<0 | 1 | 2>(0); // 0=front, 1=acronym, 2=breakdown
  const [flip2Rating, setFlip2Rating] = useState(0);
  const [flip3Rating, setFlip3Rating] = useState(0);

  // Reset flip state when card changes
  useEffect(() => {
    setFlipState(0);
    setFlip2Rating(0);
    setFlip3Rating(0);
  }, [front, back]);

  const handleFlip = () => {
    if (flipState === 0) {
      setFlipState(1);
    } else if (flipState === 1) {
      setFlipState(2);
    } else {
      setFlipState(0);
    }
  };

  const handleRating = (rating: number) => {
    if (flipState === 1) {
      setFlip2Rating(rating);
      if (onRatingChange) onRatingChange(2, rating);
    } else if (flipState === 2) {
      setFlip3Rating(rating);
      if (onRatingChange) onRatingChange(3, rating);
    }
  };

  // Calculate dynamic font size based on acronym length
  const getAcronymFontSize = () => {
    const length = back.length;
    if (length <= 10) return '64px';
    if (length <= 15) return '52px';
    if (length <= 20) return '44px';
    if (length <= 25) return '38px';
    return '32px';
  };

  const getAcronymFontSizeMobile = () => {
    const length = back.length;
    if (length <= 10) return '48px';
    if (length <= 15) return '40px';
    if (length <= 20) return '34px';
    if (length <= 25) return '30px';
    return '26px';
  };

  return (
    <div className="flashcard-container" onClick={handleFlip}>
      <div className="flashcard-multi-flip">
        {/* Flip State 0: Question/Topic */}
        {flipState === 0 && (
          <div className="flashcard-face" style={{ backgroundColor: color }}>
            <div className="flashcard-content">
              <div className="chapter-badge">{chapter}</div>
              <div className="question-text">
                <p>{front}</p>
              </div>
              <div className="tap-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
                  <path d="M7 10v12"/>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
                </svg>
                <span>Tap to reveal acronym</span>
              </div>
            </div>
          </div>
        )}

        {/* Flip State 1: Acronym */}
        {flipState === 1 && (
          <div className="flashcard-face" style={{ backgroundColor: color }}>
            <div className="flashcard-content">
              <div className="chapter-badge">{chapter}</div>
              <div className="answer-text">
                <div className="acronym-label">Acronym</div>
                <h2 className="acronym" style={{ fontSize: 'var(--acronym-size)' }}>{back}</h2>
              </div>
              <div className="rating-section" onClick={(e) => e.stopPropagation()}>
                <div className="rating-label">How well did you know this?</div>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <svg
                      key={rating}
                      viewBox="0 0 24 24"
                      className={`rating-star ${flip2Rating >= rating ? 'filled' : ''}`}
                      onClick={() => handleRating(rating)}
                      fill={flip2Rating >= rating ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="tap-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
                  <path d="M7 10v12"/>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
                </svg>
                <span>Tap to see breakdown</span>
              </div>
            </div>
          </div>
        )}

        {/* Flip State 2: Breakdown */}
        {flipState === 2 && (
          <div className="flashcard-face flashcard-breakdown" style={{ backgroundColor: color }}>
            <div className="flashcard-content">
              <div className="chapter-badge">{chapter}</div>
              <div className="breakdown-content">
                <div className="acronym-label" style={{ marginBottom: '16px' }}>{back}</div>
                {breakdown && breakdown.length > 0 ? (
                  <div className="breakdown-list">
                    {breakdown.map((item, index) => (
                      <div key={index} className="breakdown-item">
                        <span className="breakdown-letter">{item.letter}</span>
                        <span className="breakdown-term">{item.term}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '18px', opacity: 0.9, textAlign: 'center', padding: '20px' }}>
                    Breakdown not available. See study materials for details.
                  </p>
                )}
              </div>
              <div className="rating-section" onClick={(e) => e.stopPropagation()}>
                <div className="rating-label">How well did you know this?</div>
                <div className="star-rating">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <svg
                      key={rating}
                      viewBox="0 0 24 24"
                      className={`rating-star ${flip3Rating >= rating ? 'filled' : ''}`}
                      onClick={() => handleRating(rating)}
                      fill={flip3Rating >= rating ? 'currentColor' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
              </div>
              <div className="tap-hint">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="icon-sm">
                  <path d="M7 10v12"/>
                  <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/>
                </svg>
                <span>Tap to restart</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .flashcard-container {
          --acronym-size: ${getAcronymFontSize()};
          --acronym-size-mobile: ${getAcronymFontSizeMobile()};
          width: 100%;
          height: 70vh;
          min-height: 500px;
          max-height: 600px;
          cursor: pointer;
          user-select: none;
        }

        .flashcard-multi-flip {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .flashcard-face {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px 40px;
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.15),
            0 10px 20px rgba(0, 0, 0, 0.1);
          animation: fadeIn 0.4s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .flashcard-content {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          color: white;
        }

        .chapter-badge {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          padding: 8px 20px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .question-text,
        .answer-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 20px;
        }

        .question-text p {
          font-size: 28px;
          font-weight: 600;
          line-height: 1.5;
          max-width: 800px;
        }

        .acronym-label {
          font-size: 16px;
          font-weight: 500;
          opacity: 0.9;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .acronym {
          font-weight: 900;
          letter-spacing: 4px;
          margin: 0;
          text-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          word-break: break-word;
        }

        .breakdown-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          overflow-y: auto;
          padding: 20px;
        }

        .breakdown-list {
          width: 100%;
          max-width: 600px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .breakdown-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 12px 16px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .breakdown-letter {
          width: 40px;
          height: 40px;
          min-width: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 10px;
          font-size: 20px;
          font-weight: 900;
        }

        .breakdown-term {
          font-size: 16px;
          font-weight: 600;
          text-align: left;
          flex: 1;
        }

        .tap-hint {
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0.7;
          font-size: 14px;
          font-weight: 500;
        }

        .tap-hint svg {
          width: 20px;
          height: 20px;
        }

        @media (max-width: 768px) {
          .flashcard-container {
            height: 65vh;
            min-height: 450px;
            --acronym-size: var(--acronym-size-mobile);
          }

          .flashcard-face {
            padding: 32px 24px;
            border-radius: 20px;
          }

          .question-text p {
            font-size: 22px;
          }

          .chapter-badge {
            font-size: 12px;
            padding: 6px 16px;
          }

          .breakdown-item {
            padding: 10px 12px;
            gap: 12px;
          }

          .breakdown-letter {
            width: 32px;
            height: 32px;
            min-width: 32px;
            font-size: 16px;
          }

          .breakdown-term {
            font-size: 14px;
          }
        }

        .rating-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          margin-top: 16px;
        }

        .rating-label {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          opacity: 0.95;
        }

        .star-rating {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .rating-star {
          width: 36px;
          height: 36px;
          cursor: pointer;
          transition: all 0.2s ease;
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
        }

        .rating-star:hover {
          transform: scale(1.15);
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4));
        }

        .rating-star.filled {
          fill: #FFD700;
          stroke: #FFA500;
        }

        @media (max-width: 768px) {
          .rating-section {
            padding: 12px;
            gap: 8px;
          }

          .rating-label {
            font-size: 13px;
          }

          .star-rating {
            gap: 8px;
          }

          .rating-star {
            width: 30px;
            height: 30px;
          }
        }
      `}</style>
    </div>
  );
};

export default Flashcard;
