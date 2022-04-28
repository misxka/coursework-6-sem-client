import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper
} from '@chakra-ui/react';
import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useState } from 'react';

import CustomInput from '../CustomInput/CustomInput';

import styles from './AddCourseSection.module.scss';

interface Props {
  onClose: () => void;
}

export default function AddCourseSection(props: Props) {
  const { onClose } = props;

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [price, setPrice] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState('');
  const [level, setLevel] = useState('');

  const addCourse = async () => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/courses/`,
        {
          title,
          language,
          level,
          price,
          isOnline
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        }
      );
      setIsSubmitting(false);

      onClose();
    } catch (e: any) {
      setIsSubmitting(false);
      console.error(`Ошибка ${e.response.status}: неверные данные`);
    }
  };

  return (
    <div>
      <FormLabel htmlFor={'title'}>Название</FormLabel>
      <Input onChange={e => setTitle(e.target.value)} className={styles.field} value={title} name='title' id='title' placeholder={'Название'} />

      <FormLabel htmlFor={'language'}>Язык</FormLabel>
      <Input onChange={e => setLanguage(e.target.value)} className={styles.field} value={language} name='language' id='language' placeholder={'Язык'} />

      <FormLabel htmlFor={'level'}>Уровень</FormLabel>
      <Input onChange={e => setLevel(e.target.value)} className={styles.field} value={level} name='level' id='level' placeholder={'Уровень'} />

      <FormLabel htmlFor={'price'}>Цена</FormLabel>
      <NumberInput id='price' name='price' className={styles.field} onChange={(valueStr, valueNumeric) => setPrice(valueNumeric)} min={0} max={500} precision={2} step={0.1}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <FormLabel htmlFor={'isOnline'}>Онлайн?</FormLabel>
      <Checkbox className={styles.field} display='block' name='isOnline' isChecked={isOnline} onChange={e => setIsOnline(e.target.checked)} />

      <Button mt={4} colorScheme='green' isLoading={isSubmitting} onClick={addCourse}>
        Добавить курс
      </Button>
    </div>
  );
}
