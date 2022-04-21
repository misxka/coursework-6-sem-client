import React, { BaseSyntheticEvent, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../utils/store';

import styles from './Card.module.scss';

interface Props {
  name: string;
  translation: string;
  image: string;
  audioSrc: string;
  checkCard: () => void;
  guessed: boolean;
}

export default function Card(props: Props) {
  const { name, translation, checkCard, audioSrc, guessed, image } = props;

  const [isFlipped, setIsFlipped] = useState<boolean>();

  const gameMode = useSelector((state: RootState) => state.mode.value);

  const handleTrainClick = (e: BaseSyntheticEvent): void => {
    if (!e.target.classList.contains(`flip-card`)) {
      const audio = new Audio(`https://res.cloudinary.com/misxka/video/upload/${audioSrc}.mp3`);
      audio.play();
    } else {
      flipCard(true);
    }
  };

  const handleGameClick = (): void => {
    checkCard();
  };

  const flipCard = (value: boolean): void => {
    setIsFlipped(value);
  };

  return (
    <div className={`${styles.cardContainer} ${guessed ? styles.guessed : ''}`} onMouseLeave={() => flipCard(false)} onClick={e => (gameMode ? handleGameClick() : handleTrainClick(e))}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div
          className={`${styles.cardImage} ${styles.front} ${gameMode ? styles.playModeImage : ''} ${guessed ? styles.guessed : ''}`}
          style={{
            backgroundImage: `url(https://res.cloudinary.com/misxka/image/upload/${image}.jpg)`
          }}
        >
          <div className={`${styles.cardContent} ${styles.title} ${gameMode ? styles.hidden : ''}`}>{name}</div>
        </div>
        <div
          className={`${styles.cardImage} ${styles.back} ${gameMode ? styles.hidden : ''}`}
          style={{
            backgroundImage: `url(https://res.cloudinary.com/misxka/image/upload/${image}.jpg)`
          }}
        >
          <div className={`${styles.cardContent} ${styles.title}`}>{translation}</div>
        </div>
        <div className={`flip-card ${styles.flip} ${gameMode ? styles.hidden : ''}`}>
          <svg className='flip-card' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24'>
            <path d='M3.38 8A9.502 9.502 0 0112 2.5a9.502 9.502 0 019.215 7.182.75.75 0 101.456-.364C21.473 4.539 17.15 1 12 1a10.995 10.995 0 00-9.5 5.452V4.75a.75.75 0 00-1.5 0V8.5a1 1 0 001 1h3.75a.75.75 0 000-1.5H3.38zm-.595 6.318a.75.75 0 00-1.455.364C2.527 19.461 6.85 23 12 23c4.052 0 7.592-2.191 9.5-5.451v1.701a.75.75 0 001.5 0V15.5a1 1 0 00-1-1h-3.75a.75.75 0 000 1.5h2.37A9.502 9.502 0 0112 21.5c-4.446 0-8.181-3.055-9.215-7.182z'></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
