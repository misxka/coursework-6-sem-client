import { Button, useToast } from '@chakra-ui/react';
import { Field, FieldProps, Form, Formik } from 'formik';

import { patchUser } from '../../utils/api-calls/user';

import PasswordInput from '../PasswordInput/PasswordInput';

import styles from './EditPassword.module.scss';

interface Props {
  id: number | undefined;
  onClose: () => void;
  updateUsers: () => Promise<void>;
}

export default function AddUserSection(props: Props) {
  const { onClose, id, updateUsers } = props;

  const toast = useToast();

  const editUser = async (values: any, actions: any) => {
    try {
      const response = await patchUser(id, 'password', values.password);

      onClose();

      if (response.status === 200) {
        await updateUsers();
        toast({
          title: response.message,
          status: 'success',
          duration: 5000,
          position: 'bottom-right',
          isClosable: true
        });
      } else {
        toast({
          title: response.message,
          status: 'error',
          duration: 5000,
          position: 'bottom-right',
          isClosable: true
        });
      }
    } catch (e: any) {
      console.error(`Ошибка ${e.response.status}: неверные данные`);
    }
  };

  const validatePassword = (value: string) => {
    let error;
    if (!value) {
      error = 'Пожалуйста, введите пароль';
    }
    return error;
  };

  return (
    <Formik initialValues={{ password: '' }} onSubmit={editUser}>
      {props => (
        <Form>
          <Field name='password' validate={validatePassword}>
            {({ field, form }: FieldProps) => <PasswordInput field={field} form={form} className={styles.field} />}
          </Field>
          <Button mt={4} colorScheme='green' type='submit'>
            Изменить пароль
          </Button>
        </Form>
      )}
    </Formik>
  );
}
