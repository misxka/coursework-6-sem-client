import { IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FaEllipsisV, FaTrashAlt, FaUserLock } from 'react-icons/fa';

interface Props {
  id?: number;
}

export default function UserRowActions(props: Props) {
  const { id } = props;

  return (
    <Menu>
      <MenuButton h='30px' minW='30px' borderRadius='50%' fontSize={11} as={IconButton} aria-label='Options' icon={<FaEllipsisV />} variant='ghost' />
      <MenuList>
        <MenuItem icon={<FaUserLock />}>Изменить пароль</MenuItem>
        <MenuItem icon={<FaTrashAlt />}>Удалить пользователя</MenuItem>
      </MenuList>
    </Menu>
  );
}
