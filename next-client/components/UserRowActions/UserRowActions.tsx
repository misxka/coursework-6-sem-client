import { IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { FaEllipsisV, FaTrashAlt, FaUserLock } from 'react-icons/fa';
import { deleteUser } from '../../utils/api-calls/user';

interface Props {
  id?: number;
  updateUsersOnDelete: (id?: number) => Promise<void>;
}

export default function UserRowActions(props: Props) {
  const { id, updateUsersOnDelete } = props;

  const toast = useToast();

  const handleDelete = async () => {
    const deleteResult = await deleteUser(id);

    if (deleteResult.status === 200) {
      await updateUsersOnDelete(id);
      toast({
        title: deleteResult.message,
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    } else {
      toast({
        title: deleteResult.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  return (
    <Menu>
      <MenuButton h='30px' minW='30px' borderRadius='50%' fontSize={11} as={IconButton} aria-label='Options' icon={<FaEllipsisV />} variant='ghost' />
      <MenuList>
        <MenuItem icon={<FaUserLock />}>Изменить пароль</MenuItem>
        <MenuItem onClick={handleDelete} icon={<FaTrashAlt />}>
          Удалить пользователя
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
