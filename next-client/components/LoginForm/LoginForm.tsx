import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';

import styles from './LoginForm.module.scss';

function LoginForm() {
  const [isSignupForm, setIsSignupForm] = useState<boolean>(false);

  const router = useRouter();

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

  return (
    <div className={styles.login}>
      {isSignupForm ? (
        <Formik
          initialValues={{ login: '', password: '', email: '' }}
          onSubmit={async (values, actions) => {
            try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-up`, {
                login: values.login,
                password: values.password,
                email: values.email,
                role: 'STUDENT'
              });

              router.push('/');
            } catch (e: any) {
              console.error(`Ошибка ${e.response.status}: неверные данные`);
            }
          }}
        >
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
                {({ field, form }: FieldProps) => <EmailInput field={field} form={form} className={styles.field} />}
              </Field>
              <Stack direction='row' spacing={8} align='baseline'>
                <Button mt={4} colorScheme='green' isLoading={props.isSubmitting} type='submit'>
                  Создать аккаунт
                </Button>
                <Button mt={4} colorScheme='green' variant='outline' onClick={() => setIsSignupForm(false)}>
                  Уже есть аккаунт?
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{ login: '', password: '' }}
          onSubmit={async (values, actions) => {
            try {
              const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/auth/sign-in`, {
                login: values.login,
                password: values.password
              });

              const { data } = response;
              localStorage.setItem('token', `${data.tokenType} ${data.accessToken}`);
              router.push('/');
            } catch (e: any) {
              console.error(`Ошибка ${e.response.status}: неверные данные`);
            }
          }}
        >
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
                {({ field, form }: FieldProps) => <PasswordInput className={styles.field} field={field} form={form} />}
              </Field>
              <Stack direction='row' spacing={8} align='baseline'>
                <Button mt={4} colorScheme='green' isLoading={props.isSubmitting} type='submit'>
                  Войти
                </Button>
                <Button mt={4} colorScheme='green' variant='outline' onClick={() => setIsSignupForm(true)}>
                  Ещё нет аккаунта?
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}

export default LoginForm;
