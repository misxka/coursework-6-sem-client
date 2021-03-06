import { Button, CloseButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';

import { Card, deleteCard, updateCard } from '../../utils/api-calls/card';

import styles from './AdminCard.module.scss';

interface Props {
  id: number;
  word: string;
  translation: string;
  soundFile: string;
  image: string;
  categoryId: number;
  updateCardsOnDelete: (id: number) => void;
  updateCards: (id: number, card: Card) => void;
}

export default function AdminCard(props: Props) {
  const { id, word, translation, image, soundFile, categoryId, updateCardsOnDelete, updateCards } = props;

  const toast = useToast();

  const ref = useRef<HTMLAudioElement>(null);

  const [isFlipped, setIsFlipped] = useState<boolean>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [audioFile, setAudioFile] = useState('');
  const [imageFile, setImageFile] = useState('');
  const [wordInput, setWordInput] = useState<string>(word);
  const [translationInput, setTranslationInput] = useState<string>(translation);

  useEffect(() => {
    ref.current?.load();
  }, []);

  const flipCard = (value: boolean): void => {
    setIsFlipped(value);
  };

  const handleDelete = async () => {
    setIsFetching(true);
    const deleteResult = await deleteCard(id);
    setIsFetching(false);

    if (deleteResult.status === 200) {
      updateCardsOnDelete(id);
      toast({
        title: deleteResult.message,
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    } else {
      toast({
        title: deleteResult.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  const sendForm = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    setIsFetching(true);

    const formData = new FormData();
    formData.append('word', wordInput);
    formData.append('translation', translationInput);
    formData.append('image', imageFile === '' ? new Blob() : imageFile);
    formData.append('audio', audioFile === '' ? new Blob() : audioFile);
    formData.append('id', id.toString());

    const updateResult = await updateCard(formData);

    setIsFetching(false);

    if (updateResult.status === 200) {
      updateCards(updateResult.card.id, updateResult.card);
      flipCard(false);
      toast({
        title: updateResult.message,
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    } else {
      toast({
        title: updateResult.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  return (
    <div className={styles.adminCardContainer}>
      {isFetching ? (
        <div className={styles.loadingStub}>
          <Spinner w={170} h={170} color='blue.400' speed='0.8s' thickness='6px' />
        </div>
      ) : null}
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.card__front} ${isFlipped ? styles.card__rotate : ''} ${isFlipped ? styles.card__hidden : ''}`}>
          <div className={styles.card__header}>
            <CloseButton size='md' type='reset' onClick={handleDelete}></CloseButton>
          </div>
          <div className={styles.infoFields}>
            <div className={styles.field}>
              <Text fontSize='l' fontWeight={500}>
                ??????????:&nbsp;
              </Text>
              <Text fontSize='l' fontWeight={400}>{`${word}`}</Text>
            </div>
            <div className={styles.field}>
              <Text fontSize='l' fontWeight={500}>
                ??????????????:&nbsp;
              </Text>
              <Text fontSize='l' fontWeight={400}>{`${translation}`}</Text>
            </div>
            <div className={`${styles.field} ${styles.soundFileField}`}>
              <Text fontSize='l' fontWeight={500}>
                ???????????????? ????????:&nbsp;
              </Text>
              <audio controls ref={ref}>
                <source src={`https://res.cloudinary.com/misxka/video/upload/${soundFile}.mp3`} type='audio/mpeg' />
              </audio>
            </div>
            <Text fontSize='l' fontWeight={500}>
              ????????????????:&nbsp;
            </Text>
            <div className={styles.imageContainer}>
              <img width='200' height='140' src={`https://res.cloudinary.com/misxka/image/upload/${image}.jpg`} />
            </div>
          </div>
          <div className={styles.buttons}>
            <Button colorScheme='green' variant='outline' onClick={e => flipCard(true)}>
              ????????????????
            </Button>
          </div>
        </div>
        <div className={`${styles.card__back} ${styles.card__rotate} ${!isFlipped ? styles.card__hidden : ''}`}>
          <form onSubmit={e => sendForm(e)}>
            <Input type='text' placeholder='??????????' name='word' defaultValue={`${word}`} onChange={e => setWordInput(e.target.value)} />
            <Input type='text' placeholder='??????????????' name='translation' defaultValue={`${translation}`} onChange={e => setTranslationInput(e.target.value)} />
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='image' accept='image/*' onChange={(e: any) => setImageFile(e.target.files[0])} />
            </div>
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='audio' accept='audio/*' onChange={(e: any) => setAudioFile(e.target.files[0])} />
            </div>
            <div className={styles.buttons}>
              <Button colorScheme='red' variant='outline' onClick={e => flipCard(false)}>
                ????????????????
              </Button>
              <Button marginLeft={4} colorScheme='green' variant='outline' type='submit'>
                ????????????????
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
