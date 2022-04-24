import { AddIcon } from '@chakra-ui/icons';
import { Button, Input, Text, useToast } from '@chakra-ui/react';
import React, { BaseSyntheticEvent, useState } from 'react';

import { Category, createCategory } from '../../utils/category';

import styles from './NewCategory.module.scss';

interface Props {
  refreshCategories: (category: Category) => void;
}

export default function NewCategory(props: Props) {
  const { refreshCategories } = props;

  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const toast = useToast();

  const flipCard = (value: boolean): void => {
    setIsFlipped(value);
  };

  const sendForm = async (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const createResult = await createCategory(e.target[0].value);

    if (createResult.status === 201) {
      refreshCategories(createResult.category);
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
    <div className={styles.categoryCardContainer}>
      <div className={`${styles.card} ${isFlipped ? styles.flipped : ''}`}>
        <div className={`${styles.card__front} ${isFlipped ? styles.card__rotate : ''} ${isFlipped ? styles.card__hidden : ''}`}>
          <Text fontWeight={500} fontSize='2xl'>
            Create new category
          </Text>
          <Button className={styles.addCategoryButton} onClick={e => flipCard(true)}>
            <AddIcon w={10} h={10} />
          </Button>
        </div>
        <div className={`${styles.card__back} ${styles.card__rotate} ${!isFlipped ? styles.card__hidden : ''}`}>
          <form onSubmit={e => sendForm(e)}>
            <Input size='md' type='text' placeholder='Category name' name='category' required />
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
