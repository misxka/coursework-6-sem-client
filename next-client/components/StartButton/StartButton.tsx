import React, { BaseSyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';

import styles from './StartButton.module.scss';

interface Props {
  startGame: () => void;
  currentAudio: string;
}

export function StartButton(props: Props) {
  const { currentAudio, startGame } = props;

  const gameStarted = useSelector((state: RootState) => state.gameStarted.value);
  const gameMode = useSelector((state: RootState) => state.mode.value);

  console.log(gameMode);
  console.log(gameStarted);

  const repeatAudio = (): void => {
    const audio = new Audio(currentAudio);
    audio.play();
  };

  const handleClick = (e: BaseSyntheticEvent): void => {
    if (!gameStarted) {
      startGame();
    } else {
      repeatAudio();
    }
  };

  return (
    <button onClick={e => handleClick(e)} className={`${styles.btn} ${gameMode && !gameStarted ? styles.startGame : gameStarted && gameMode ? styles.repeatBtn : styles.hidden}`}>
      Start Game
    </button>
  );
}
