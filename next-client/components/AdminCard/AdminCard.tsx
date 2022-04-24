import { Button, CloseButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';

import { deleteCard } from '../../utils/card';

import styles from './AdminCard.module.scss';

interface Props {
  id: number;
  word: string;
  translation: string;
  soundFile: string;
  image: string;
  categoryId: number;
  updateCardsOnDelete: (id: number) => void;
}

export default function AdminCard(props: Props) {
  const { id, word, translation, image, soundFile, categoryId, updateCardsOnDelete } = props;

  const toast = useToast();

  const ref = useRef<HTMLAudioElement>(null);

  const [isFlipped, setIsFlipped] = useState<boolean>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  useEffect(() => {
    ref.current?.load();
  }, []);

  const flipCard = (e: BaseSyntheticEvent, value: boolean): void => {
    e.preventDefault();
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

    const formData = new FormData(e.target);
    formData.append('id', id.toString());

    // const response = await fetch(`${serverUrl}api/admin/card`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Access-Control-Allow-Origin': `${serverUrl}`,
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: formData
    // });

    // const result = await response.json();
    // if (!result.isFailed) {
    //   await this.props.updateCategories();
    //   await this.props.updateCards();
    //   await this.props.updateAdminCategories();
    //   await this.props.updateAdminCards('admin');
    //   this.flipCard(e, false);
    //   e.target.reset();
    // }
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
                Слово:&nbsp;
              </Text>
              <Text fontSize='l' fontWeight={400}>{`${word}`}</Text>
            </div>
            <div className={styles.field}>
              <Text fontSize='l' fontWeight={500}>
                Перевод:&nbsp;
              </Text>
              <Text fontSize='l' fontWeight={400}>{`${translation}`}</Text>
            </div>
            <div className={`${styles.field} ${styles.soundFileField}`}>
              <Text fontSize='l' fontWeight={500}>
                Звуковой файл:&nbsp;
              </Text>
              <audio controls ref={ref}>
                <source src={`https://res.cloudinary.com/misxka/video/upload/${soundFile}.mp3`} type='audio/mpeg' />
              </audio>
            </div>
            <Text fontSize='l' fontWeight={500}>
              Картинка:&nbsp;
            </Text>
            <div className={styles.imageContainer}>
              <img width='200' height='140' src={`https://res.cloudinary.com/misxka/image/upload/${image}.jpg`} />
            </div>
          </div>
          <div className={styles.buttons}>
            <Button colorScheme='green' variant='outline' onClick={e => flipCard(e, true)}>
              Изменить
            </Button>
          </div>
        </div>
        <div className={`${styles.card__back} ${styles.card__rotate} ${!isFlipped ? styles.card__hidden : ''}`}>
          <form onSubmit={e => sendForm(e)}>
            <Input type='text' placeholder='Слово' name='word' defaultValue={`${word}`} />
            <Input type='text' placeholder='Перевод' name='translation' defaultValue={`${translation}`} />
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='image' accept='image/*' />
            </div>
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='audio' accept='audio/*' />
            </div>
            <div className={styles.buttons}>
              <Button colorScheme='red' variant='outline' onClick={e => flipCard(e, false)}>
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
