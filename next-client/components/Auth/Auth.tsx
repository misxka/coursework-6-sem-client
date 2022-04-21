import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Skeleton,
  Stack,
  useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { Field, FieldProps, Form, Formik } from 'formik';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { FaSignOutAlt, FaUserPlus } from 'react-icons/fa';
import EmailInput from '../EmailInput/EmailInput';
import PasswordInput from '../PasswordInput/PasswordInput';

import styles from './Auth.module.scss';

function Auth() {
  const [authGroup, setAuthGroup] = useState<JSX.Element>(<Skeleton height='40px' />);
  const [token, setToken] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    let isExpired = true;
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const dateNow = new Date();
      if (decodedToken.exp && decodedToken.exp * 1000 > dateNow.getTime()) {
        isExpired = false;
        setToken(token);
      }
    }

    if (!isExpired) {
      setAuthGroup(
        <>
          <Avatar name='Mikhail Viaryha' className={styles.avatar} />
          <Button
            onClick={() => {
              localStorage.removeItem('token');
              setToken('');
            }}
            rightIcon={<Icon as={FaSignOutAlt} />}
            colorScheme='red'
            variant='outline'
          >
            Выйти
          </Button>
        </>
      );
    } else {
      setAuthGroup(
        <Button onClick={onOpen} rightIcon={<Icon as={FaUserPlus} />} colorScheme='blue' variant='solid'>
          Войти
        </Button>
      );
    }
  }, [token]);

  const [isSignupForm, setIsSignupForm] = useState<boolean>(false);

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

  const renderForm = () => {
    return isSignupForm ? (
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

            onClose();
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
            const token = `${data.tokenType} ${data.accessToken}`;
            localStorage.setItem('token', token);
            setToken(token);

            onClose();
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
    );
  };

  return (
    <>
      {authGroup}

      <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody padding='30px'>{renderForm()}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default Auth;