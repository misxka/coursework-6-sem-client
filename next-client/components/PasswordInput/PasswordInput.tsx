import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FieldInputProps, FormikProps } from 'formik';
import { useState } from 'react';

interface Props {
  form: FormikProps<any>;
  field: FieldInputProps<any>;
}

function PasswordInput(props: Props) {
  const { form, field } = props;

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={(form.errors.password && form.touched.password) as any}>
      <FormLabel htmlFor='password'>Пароль</FormLabel>
      <InputGroup size='md'>
        <Input pr='4.5rem' {...field} id='password' type={show ? 'text' : 'password'} placeholder='Введите пароль' />
        <InputRightElement width='6rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? 'Скрыть' : 'Показать'}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{form.errors.password as any}</FormErrorMessage>
    </FormControl>
  );
}

export default PasswordInput;
