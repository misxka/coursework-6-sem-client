import { IconButton, Menu, MenuButton, MenuItem, MenuList, useToast } from '@chakra-ui/react';
import { FaEllipsisV, FaTrashAlt } from 'react-icons/fa';

import { deleteCourse } from '../../utils/api-calls/course';

interface Props {
  id?: number;
  updateCourses: () => Promise<void>;
}

export default function UserRowActions(props: Props) {
  const { id, updateCourses } = props;

  const toast = useToast();

  const handleDelete = async () => {
    const deleteResult = await deleteCourse(id);

    if (deleteResult.status === 200) {
      await updateCourses();
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
          <MenuItem onClick={handleDelete} icon={<FaTrashAlt />}>
            Удалить курс
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
}
