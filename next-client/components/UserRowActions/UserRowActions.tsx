import { IconButton, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useToast } from '@chakra-ui/react';
import { FaEllipsisV, FaTrashAlt, FaUserLock } from 'react-icons/fa';
import { deleteUser } from '../../utils/api-calls/user';
import EditPassword from '../EditPassword/EditPassword';

interface Props {
  id?: number;
  updateUsers: () => Promise<void>;
}

export default function UserRowActions(props: Props) {
  const { id, updateUsers } = props;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = async () => {
    const deleteResult = await deleteUser(id);

    if (deleteResult.status === 200) {
      await updateUsers();
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
    <>
      <Menu>
        <MenuButton h='30px' minW='30px' borderRadius='50%' fontSize={11} as={IconButton} aria-label='Options' icon={<FaEllipsisV />} variant='ghost' />
        <MenuList>
          <MenuItem onClick={onOpen} icon={<FaUserLock />}>
            Изменить пароль
          </MenuItem>
          <MenuItem onClick={handleDelete} icon={<FaTrashAlt />}>
            Удалить пользователя
          </MenuItem>
        </MenuList>
      </Menu>

      <Modal size='sm' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody padding='30px'>
            <EditPassword onClose={onClose} id={id} updateUsers={updateUsers} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
