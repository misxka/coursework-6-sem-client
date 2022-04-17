import { Button, FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import PasswordInput from '../PasswordInput/PasswordInput';

import styles from './LoginForm.module.scss';

function LoginForm() {
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

  return (
    <div className={styles.login}>
      <Formik
        initialValues={{ login: 'superhero123', password: '12345678' }}
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
                <FormControl isInvalid={(form.errors.login && form.touched.login) as any}>
                  <FormLabel htmlFor='login'>Логин</FormLabel>
                  <Input {...field} id='login' placeholder='Логин' />
                  <FormErrorMessage>{form.errors.login as any}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name='password' validate={validatePassword}>
              {({ field, form }: FieldProps) => <PasswordInput field={field} form={form} />}
            </Field>
            <Button mt={4} colorScheme='teal' isLoading={props.isSubmitting} type='submit'>
              Войти
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
