import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { erase } from '../../utils/slices/guessedSlice';
import { RootState } from '../../utils/store';
import { toggle as toggleGameStarted } from '../../utils/slices/gameStartedSlice';
import { update as updateGuessed } from '../../utils/slices/guessedSlice';
import { StartButton } from '../StartButton/StartButton';
import { Card as CardType } from '../../utils/category';
import Card from '../Card/Card';

import styles from './CategoryField.module.scss';

interface Props {
  cards: CardType[];
}

const successAudio = '/audio/success-sound.mp3';
const failureAudio = '/audio/failure-sound.mp3';
const finalSuccessAudio = '/audio/final-success-sound.mp3';
const finalFailureAudio = '/audio/final-failure-sound.mp3';

export default function CategoryField(props: Props) {
  const { cards } = props;

  const gameStarted = useSelector((state: RootState) => state.gameStarted.value);
  const guessed = useSelector((state: RootState) => state.guessed.value);
  const dispatch = useDispatch();

  const router = useRouter();

  const [answers, setAnswers] = useState<boolean[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [sounds, setSounds] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  let failedNumber = 0;
  let currentNumber = 0;
  let resultOutput = '';

  const randomize = (): number[] => {
    const tasks: number[] = [];
    const { length } = cards;
    for (let i = 0; i < length; i++) {
      tasks[i] = i;
    }

    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * length);
      const temp = tasks[i];
      tasks[i] = tasks[randIndex];
      tasks[randIndex] = temp;
    }

    return tasks;
  };

  const playAudio = (currentAudioSrc: string): void => {
    const audio = new Audio(currentAudioSrc);
    audio.play();
  };

  const endGame = (): void => {
    // window.scroll(0, 0);
    // document.documentElement.classList.add('not-scrollable');

    if (failedNumber > 0) {
      playAudio(finalFailureAudio);
      resultOutput = `Увы... Количество неверных ответов: ${failedNumber}.`;
    } else {
      playAudio(finalSuccessAudio);
      resultOutput = `Без ошибок! Поздравляем!`;
    }
    setGameFinished(true);

    setTimeout(() => {
      setGameFinished(false);
      dispatch(toggleGameStarted());
      dispatch(erase());
      router.push('/');
      // document.documentElement.classList.remove('not-scrollable');
    }, 5000);
  };

  const handleSuccessfulGuess = (): void => {
    dispatch(updateGuessed(order[currentNumber]));

    currentNumber++;
    if (currentNumber === sounds.length) {
      endGame();
    } else {
      playAudio(successAudio);
      setTimeout(() => playAudio(sounds[currentNumber]), 1000);
    }
  };

  const updateAnswers = (answers: boolean[], condition: boolean): void => {
    answers.push(condition);
    setAnswers(answers);
  };

  const startGame = (): void => {
    const order = randomize();

    const sounds = order.map(elem => `https://res.cloudinary.com/misxka/video/upload/${cards[elem].audio}.mp3`);

    const words = order.map(elem => cards[elem].word);

    dispatch(toggleGameStarted());

    setAnswers([]);
    setOrder(order);
    setSounds(sounds);
    setWords(words);
    setGameFinished(false);
    dispatch(erase());

    setTimeout(() => playAudio(sounds[0]), 500);
  };

  const checkCard = (card: CardType): void => {
    if (gameStarted) {
      let result = false;
      if (words[currentNumber] === card.word) result = true;

      if (result) {
        updateAnswers(answers, true);
        handleSuccessfulGuess();
      } else {
        failedNumber++;
        updateAnswers(answers, false);
        playAudio(failureAudio);
      }
    }
  };

  return (
    <div>
      <div className={styles.categoryField}>
        <div className={styles.ratingStars}>
          {answers.map((elem, index) => (
            <div key={index} className={`${styles.star} ${elem === true ? styles.success : styles.fail}`}></div>
          ))}
        </div>
        <div className={styles.cards}>
          {cards.map((elem, index) => (
            <Card key={elem.id} name={elem.word} image={elem.image} audioSrc={elem.audio} translation={elem.translation} checkCard={() => checkCard(elem)} guessed={guessed[index]} />
          ))}
        </div>
        <StartButton startGame={startGame} currentAudio={sounds[currentNumber]} />
        <div className={`${styles.resultMessage} ${failedNumber === 0 ? styles.success : styles.failure} ${gameFinished ? '' : styles.hidden}`}>
          <p className={styles.resultMessage__text}>{resultOutput}</p>
        </div>
      </div>
    </div>
  );
}
