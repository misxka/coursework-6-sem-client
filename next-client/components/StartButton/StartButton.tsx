import React, { BaseSyntheticEvent, Component } from 'react';

import styles from './StartButton.module.scss';

interface Props {
  playMode: boolean;
  gameStarted: boolean;
  startGame: () => void;
  currentAudio: string;
}

export function StartButton(props: Props) {
  const { playMode, gameStarted, currentAudio, startGame } = props;

  const repeatAudio = (): void => {
    const audio = new Audio(`https://res.cloudinary.com/misxka/video/upload/${currentAudio}.mp3`);
    audio.play();
  };

  const handleClick = (e: BaseSyntheticEvent): void => {
    if (e.target.classList.contains('start-game')) {
      startGame();
    } else {
      repeatAudio();
    }
  };

  return (
    <button onClick={e => handleClick(e)} className={`${playMode && !gameStarted ? 'start-game' : gameStarted && playMode ? 'repeat-button' : 'hidden'}`}>
      Start Game
    </button>
  );
}
