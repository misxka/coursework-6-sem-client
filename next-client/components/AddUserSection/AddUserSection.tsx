import { Button, FormControl, FormErrorMessage, FormLabel, Input, Select } from '@chakra-ui/react';
import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import { FaIdCard, FaRegEnvelopeOpen } from 'react-icons/fa';
import CustomInput from '../CustomInput/CustomInput';

import PasswordInput from '../PasswordInput/PasswordInput';

import styles from './AddUserSection.module.scss';

interface Props {
  onClose: () => void;
}

export default function AddUserSection(props: Props) {
  const { onClose } = props;

  const addUser = async (values: any, actions: any) => {
    try {
      console.log(values.password);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_HOST}/api/users/`,
        {
          login: values.login,
          password: values.password,
          email: values.email,
          fullname: values.fullname,
          role: values.role
        },
        {
          headers: {
            Authorization: `${localStorage.getItem('token')}`
          }
        }
      );

      onClose();
    } catch (e: any) {
      console.error(`Ошибка ${e.response.status}: неверные данные`);
    }
  };

  const validateLogin = (value: string) => {
    let error;
    if (!value) {
      error = 'Пожалуйста, введите логин';
    }
    return error;
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = 'Пожалуйста, введите пароль';
    }
    return error;
  };

  const validateEmail = (value: string) => {
    let error;
    if (!value) {
      error = 'Пожалуйста, введите адрес электронной почты';
    }
    return error;
  };

  const validateFullname = (value: string) => {
    let error;
    if (!value) {
      error = 'Пожалуйста, введите ФИО';
    }
    return error;
  };

  return (
    <Formik initialValues={{ login: '', password: '', email: '', fullname: '', role: 'STUDENT' }} onSubmit={addUser}>
      {props => (
        <Form>
          <Field name='login' validate={validateLogin}>
            {({ field, form }: FieldProps) => (
              <FormControl className={styles.field} isInvalid={(form.errors.login && form.touched.login) as any}>
                <FormLabel htmlFor='login'>Логин</FormLabel>
                <Input {...field} id='login' placeholder='Логин' />
                <FormErrorMessage>{form.errors.login as any}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password' validate={validatePassword}>
            {({ field, form }: FieldProps) => <PasswordInput field={field} form={form} className={styles.field} />}
          </Field>
          <Field name='email' validate={validateEmail}>
            {({ field, form }: FieldProps) => <CustomInput field={field} form={form} className={styles.field} icon={FaRegEnvelopeOpen} name='email' placeholder='Email' />}
          </Field>
          <Field name='fullname' validate={validateFullname}>
            {({ field, form }: FieldProps) => <CustomInput field={field} form={form} className={styles.field} icon={FaIdCard} name='fullname' placeholder='ФИО' />}
          </Field>
          <Field name='role'>
            {({ field, form }: FieldProps) => (
              <FormControl className={styles.field} isInvalid={(form.errors.role && form.touched.role) as any}>
                <FormLabel htmlFor='role'>Роль</FormLabel>
                <Select {...field} id='role' w={200} size='md'>
                  <option value='STUDENT'>STUDENT</option>
                  <option value='TEACHER'>TEACHER</option>
                  <option value='ADMIN'>ADMIN</option>
                </Select>
                <FormErrorMessage>{form.errors.role as any}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button mt={4} colorScheme='green' isLoading={props.isSubmitting} type='submit'>
            Добавить пользователя
          </Button>
        </Form>
      )}
    </Formik>
  );
}
