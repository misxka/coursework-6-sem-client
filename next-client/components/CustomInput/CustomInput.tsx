import { FormControl, FormErrorMessage, FormLabel, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { FieldInputProps, FormikProps } from 'formik';
import { IconType } from 'react-icons';

interface Props {
  name: string;
  placeholder: string;
  icon: IconType;
  form: FormikProps<any>;
  field: FieldInputProps<any>;
  className: string;
}

function CustomInput(props: Props) {
  const { form, field, className, name, icon, placeholder } = props;

  return (
    <FormControl className={className} isInvalid={(form.errors[name] && form.touched[name]) as any}>
      <FormLabel htmlFor={name}>{placeholder}</FormLabel>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={icon} color='gray.400' />
        </InputLeftElement>
        <Input {...field} id={name} type={name} placeholder={placeholder} />
      </InputGroup>
      <FormErrorMessage>{form.errors[name] as any}</FormErrorMessage>
    </FormControl>
  );
}

export default CustomInput;
