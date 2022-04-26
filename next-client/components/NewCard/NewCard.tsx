import { AddIcon } from '@chakra-ui/icons';
import { Button, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { BaseSyntheticEvent, useState } from 'react';

import { Card, createCard } from '../../utils/api-calls/card';

import styles from './NewCard.module.scss';

interface Props {
  refreshCards: (card: Card) => void;
  categoryId: number;
}

export default function NewCard(props: Props) {
  const { refreshCards, categoryId } = props;

  const [isFlipped, setIsFlipped] = useState<boolean>();

  const [audio, setAudio] = useState('');
  const [image, setImage] = useState('');
  const [word, setWord] = useState<string>('');
  const [translation, setTranslation] = useState<string>('');
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const toast = useToast();

  const flipCard = (value: boolean): void => {
    setIsFlipped(value);
  };

  const sendForm = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    setIsUploading(true);

    const formData = new FormData();
    formData.append('word', word);
    formData.append('translation', translation);
    formData.append('image', image);
    formData.append('audio', audio);
    formData.append('categoryId', categoryId.toString());

    const createResult = await createCard(formData);

    setIsUploading(false);

    if (createResult.status === 201) {
      refreshCards(createResult.card);
      flipCard(false);
      toast({
        title: createResult.message,
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    } else {
      toast({
        title: createResult.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  return (
    <div className={styles.newCardContainer}>
      {isUploading ? (
        <div className={styles.loadingStub}>
          <Spinner w={170} h={170} color='blue.400' speed='0.8s' thickness='6px' />
        </div>
      ) : null}
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.card__front} ${isFlipped ? styles.card__rotate : ''} ${isFlipped ? styles.card__hidden : ''}`}>
          <Text align='center' fontSize='2xl' fontWeight={500}>
            Создать новую карточку
          </Text>
          <Button className={styles.addCardButton} onClick={e => flipCard(true)}>
            <AddIcon w={14} h={14} />
          </Button>
        </div>
        <div className={`${styles.card__back} ${styles.card__rotate} ${!isFlipped ? styles.card__hidden : ''}`}>
          <form onSubmit={e => sendForm(e)}>
            <Input type='text' placeholder='Слово' name='word' required onChange={e => setWord(e.target.value)} />
            <Input type='text' placeholder='Перевод' name='translation' required onChange={e => setTranslation(e.target.value)} />
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='image' accept='image/*' required onChange={(e: any) => setImage(e.target.files[0])} />
            </div>
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='audio' accept='audio/*' required onChange={(e: any) => setAudio(e.target.files[0])} />
            </div>
            <div className={styles.buttons}>
              <Button colorScheme='red' variant='outline' onClick={e => flipCard(false)}>
                Отменить
              </Button>
              <Button marginLeft={4} colorScheme='green' variant='outline' type='submit'>
                Создать
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
