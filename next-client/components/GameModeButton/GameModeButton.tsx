import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { toggle as toggleMode } from '../../utils/slices/modeSlice';
import { toggle as toggleGameStarted } from '../../utils/slices/gameStartedSlice';
import { RootState } from '../../utils/store';
import { erase } from '../../utils/slices/guessedSlice';

import styles from './GameModeButton.module.scss';

export default function GameModeButton() {
  const gameMode = useSelector((state: RootState) => state.mode.value);
  const gameStarted = useSelector((state: RootState) => state.gameStarted.value);
  const dispatch = useDispatch();

  const changeMode = (): void => {
    dispatch(toggleMode());
    dispatch(erase());
    if (gameStarted) dispatch(toggleGameStarted());
  };

  return (
    <label className={styles.toggle} htmlFor='switch'>
      <input className={styles.toggle__input} type='checkbox' id='switch' checked={gameMode} onChange={changeMode} />
      <div className={styles.toggle__slider}></div>
      <span className={`${styles.modeName} ${styles.modeName__play} ${gameMode ? '' : styles.hidden}`}>Играть</span>
      <span className={`${styles.modeName} ${styles.modeName__train} ${gameMode ? styles.hidden : ''}`}>Учить</span>
    </label>
  );
}
