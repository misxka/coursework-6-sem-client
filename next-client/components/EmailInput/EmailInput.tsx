import { FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FieldInputProps, FormikProps } from 'formik';
import { FaRegEnvelopeOpen } from 'react-icons/fa';

interface Props {
  form: FormikProps<any>;
  field: FieldInputProps<any>;
  className: string;
}

function EmailInput(props: Props) {
  const { form, field, className } = props;

  return (
    <FormControl className={className} isInvalid={(form.errors.email && form.touched.email) as any}>
      <FormLabel htmlFor='email'>Email</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={FaRegEnvelopeOpen} color='gray.400' />
        </InputLeftElement>
        <Input {...field} id='email' type='email' placeholder='Email' />
      </InputGroup>
      <FormErrorMessage>{form.errors.email as any}</FormErrorMessage>
    </FormControl>
  );
}

export default EmailInput;
