import { Button, CloseButton, Input, Text } from '@chakra-ui/react';
import Link from 'next/link';
import React, { BaseSyntheticEvent, useState } from 'react';

import styles from './AdminCategoryCard.module.scss';

interface Props {
  wordsAmount: number;
  id: number;
  name: string;
}

export default function AdminCategoryCard(props: Props) {
  const { id, wordsAmount, name } = props;

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const flipCard = (value: boolean): void => {
    setIsFlipped(value);
  };

  const sendForm = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    // const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/categories`, {
    //   method: 'PATCH',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({
    //     previousCategory: categoryName,
    //     category: e.target[0].value
    //   })
    // });

    // const result = await response.json();
    // if (!result.isFailed) {
    //   await updateCategories();
    //   flipCard(false);
    // }
  };

  const deleteCategory = async () => {
    // const response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/admin/category`, {
    //   method: 'DELETE',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${localStorage.getItem('token')}`
    //   },
    //   body: JSON.stringify({ category: name })
    // });
    // const result = await response.json();
    // if (!result.isFailed) {
    //   // await updateAdminCategories();
    //   // await updateCategories();
    // }
  };

  return (
    <div className={styles.categoryCardContainer}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.card__front} ${isFlipped ? styles.card__rotate : ''} ${isFlipped ? styles.card__hidden : ''}`}>
          <div className={styles.card__header}>
            <Text fontWeight={500} fontSize='xl' className={styles.title}>
              {name}
            </Text>
            <CloseButton size='md' type='reset' onClick={deleteCategory}></CloseButton>
          </div>
          <Text fontWeight={500} fontSize='xl' className={styles.words}>{`Слова: ${wordsAmount}`}</Text>
          <div className={styles.buttons}>
            <Button className={styles.button} colorScheme='green' variant='outline' onClick={e => flipCard(true)}>
              Изменить
            </Button>
            <Link href={`/categories/studio/${id}`}>
              <Button marginLeft={3} className={styles.button} colorScheme='green' variant='outline'>
                Новое слово
              </Button>
            </Link>
          </div>
        </div>
        <div className={`${styles.card__back} ${styles.card__rotate} ${!isFlipped ? styles.card__hidden : ''}`}>
          <form className={styles.form} onSubmit={e => sendForm(e)}>
            <Input size='md' type='text' placeholder='Category name' name='category' defaultValue={name} required />
            <div className={styles.buttons}>
              <Button className={styles.button} colorScheme='red' variant='outline' onClick={e => flipCard(false)} type='reset'>
                Отменить
              </Button>
              <Button marginLeft={3} className={styles.button} colorScheme='green' variant='outline'>
                Принять
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
