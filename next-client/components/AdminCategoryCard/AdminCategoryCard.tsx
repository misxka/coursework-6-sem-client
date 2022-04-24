import { Button, CloseButton, Input, Text, useToast } from '@chakra-ui/react';
import Link from 'next/link';
import React, { BaseSyntheticEvent, useState } from 'react';

import { deleteCategory, updateCategory } from '../../utils/category';

import styles from './AdminCategoryCard.module.scss';

interface Props {
  wordsAmount: number;
  id: number;
  name: string;
  updateCategories: (id: number, name: string) => void;
  updateCategoriesOnDelete: (id: number) => void;
}

export default function AdminCategoryCard(props: Props) {
  const { id, wordsAmount, name, updateCategories, updateCategoriesOnDelete } = props;

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const toast = useToast();

  const flipCard = (value: boolean): void => {
    setIsFlipped(value);
  };

  const sendForm = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const updateResult = await updateCategory(id, e.target[0].value);

    if (updateResult.status === 200) {
      updateCategories(id, updateResult.name);
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

  const handleDelete = async () => {
    const deleteResult = await deleteCategory(id);
    if (deleteResult.status === 200) {
      updateCategoriesOnDelete(id);
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

  return (
    <div className={styles.categoryCardContainer}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.card__front} ${isFlipped ? styles.card__rotate : ''} ${isFlipped ? styles.card__hidden : ''}`}>
          <div className={styles.card__header}>
            <Text fontWeight={500} fontSize='xl' className={styles.title}>
              {name}
            </Text>
            <CloseButton size='md' type='reset' onClick={handleDelete}></CloseButton>
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
              <Button marginLeft={3} className={styles.button} colorScheme='green' variant='outline' type='submit'>
                Принять
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
