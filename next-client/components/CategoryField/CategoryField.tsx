import { useState } from 'react';
import { useDispatch } from 'react-redux';

import ICard from '../../interfaces/ICard';
import { erase } from '../../utils/slices/guessedSlice';

interface Props {
  cards: ICard[];
  playMode: boolean;
  gameStarted: boolean;
  startGame: () => void;
  guessed: boolean[];
  animateCardOnGuess: (currentNumber: number, order: number[]) => void;
  slideMenu: () => void;
  changeGameMode: () => void;
  isMenuHidden: boolean;
  updateWordRecords: () => void;
}

const successAudio = 'audio/success-sound.mp3';
const failureAudio = 'audio/failure-sound.mp3';
const finalSuccessAudio = 'audio/final-success-sound.mp3';
const finalFailureAudio = 'audio/final-failure-sound.mp3';

export default function CategoryField(props: Props) {
  const { cards, animateCardOnGuess, gameStarted, updateWordRecords } = props;

  const dispatch = useDispatch();

  const [answers, setAnswers] = useState<boolean[]>([]);
  const [order, setOrder] = useState<number[]>([]);
  const [words, setWords] = useState<string[]>([]);
  const [sounds, setSounds] = useState<string[]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [guessed, setGuessed] = useState<boolean[]>(new Array().fill(false));

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
    window.scroll(0, 0);
    document.documentElement.classList.add('not-scrollable');

    if (failedNumber > 0) {
      playAudio(finalFailureAudio);
      resultOutput = `You lost! You've got ${failedNumber} error${failedNumber > 1 ? 's' : ''}.`;
    } else {
      playAudio(finalSuccessAudio);
      resultOutput = `You won!`;
    }
    setGameFinished(true);

    setTimeout(() => {
      setGameFinished(false);
      dispatch(toggleGameStarted());
      dispatch(erase());
      // window.location.hash = '/';
      // document.documentElement.classList.remove('not-scrollable');
    }, 5000);
  };

  const handleSuccessfulGuess = (): void => {
    animateCardOnGuess(currentNumber, order);

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

    startGame();

    setAnswers([]);
    setOrder(order);
    setSounds(sounds);
    setWords(words);
    setGuessed(new Array().fill(false));
    setGameFinished(false);

    setTimeout(() => playAudio(sounds[0]), 500);
  };

  const checkCard = (card: ICard): void => {
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

      updateWordRecords();
    }
  };
}
function toggleGameStarted(): any {
  throw new Error('Function not implemented.');
}
