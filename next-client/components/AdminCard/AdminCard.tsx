import { Button, CloseButton, Input, Text } from '@chakra-ui/react';
import React, { BaseSyntheticEvent, useEffect, useRef, useState } from 'react';

import styles from './AdminCard.module.scss';

interface Props {
  id: number;
  word: string;
  translation: string;
  soundFile: string;
  image: string;
}

export default function AdminCard(props: Props) {
  const { id, word, translation, image, soundFile } = props;

  const ref = useRef<HTMLAudioElement>(null);

  const [isFlipped, setIsFlipped] = useState<boolean>();

  useEffect(() => {
    ref.current?.load();
  }, []);

  const flipCard = (e: BaseSyntheticEvent, value: boolean): void => {
    e.preventDefault();
    setIsFlipped(value);
  };

  const deleteCard = async () => {
    // const response = await fetch(`${serverUrl}api/admin/card`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': `${serverUrl}`,
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({
    //     category: this.props.categoryName,
    //     id: this.props.id
    //   })
    // });
    // const result = await response.json();
    // if (!result.isFailed) {
    //   await this.props.updateCategories();
    //   await this.props.updateCards();
    //   await this.props.updateAdminCategories();
    //   await this.props.updateAdminCards('admin');
    // }
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
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.card__front} ${isFlipped ? styles.card__rotate : ''} ${isFlipped ? styles.card__hidden : ''}`}>
          <div className={styles.card__header}>
            <CloseButton size='md' type='reset' onClick={deleteCard}></CloseButton>
          </div>
          <div className={styles.infoFields}>
            <div className={styles.field}>
              <Text fontSize='l' fontWeight={500}>
                Word:&nbsp;
              </Text>
              <Text fontSize='l' fontWeight={400}>{`${word}`}</Text>
            </div>
            <div className={styles.field}>
              <Text fontSize='l' fontWeight={500}>
                Translation:&nbsp;
              </Text>
              <Text fontSize='l' fontWeight={400}>{`${translation}`}</Text>
            </div>
            <div className={`${styles.field} ${styles.soundFileField}`}>
              <Text fontSize='l' fontWeight={500}>
                Sound file:&nbsp;
              </Text>
              <audio controls ref={ref}>
                <source src={`https://res.cloudinary.com/misxka/video/upload/${soundFile}.mp3`} type='audio/mpeg' />
              </audio>
            </div>
            <Text fontSize='l' fontWeight={500}>
              Image:&nbsp;
            </Text>
            <div className={styles.imageContainer}>
              <img width='200' height='140' src={`https://res.cloudinary.com/misxka/image/upload/${image}.jpg`} />
            </div>
          </div>
          <div className={styles.buttons}>
            <Button colorScheme='green' variant='outline' onClick={e => flipCard(e, true)}>
              Change
            </Button>
          </div>
        </div>
        <div className={`${styles.card__back} ${styles.card__rotate} ${!isFlipped ? styles.card__hidden : ''}`}>
          <form onSubmit={e => sendForm(e)}>
            <Input type='text' placeholder='Word' name='word' defaultValue={`${word}`} />
            <Input type='text' placeholder='Translation' name='translation' defaultValue={`${translation}`} />
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='image' accept='image/*' />
            </div>
            <div className='file'>
              <input className='form-control form-control-sm' type='file' name='audio' accept='audio/*' />
            </div>
            <div className={styles.buttons}>
              <Button colorScheme='red' variant='outline' onClick={e => flipCard(e, false)}>
                Cancel
              </Button>
              <Button marginLeft={4} colorScheme='green' variant='outline' type='submit'>
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
