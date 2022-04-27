import {
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Skeleton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import IUser from '../../interfaces/IUser';
import { getUsersByPageAndSize } from '../../utils/api-calls/user';
import { RootState } from '../../utils/store';
import AddUserSection from '../AddUserSection/AddUserSection';
import UserRowActions from '../UserRowActions/UserRowActions';

import styles from './UsersTable.module.scss';

export default function UsersTable() {
  const user = useSelector((state: RootState) => state.user.value);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [users, setUsers] = useState<IUser[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);

      const { content, totalPages, first, last } = await getUsersByPageAndSize(page - 1, size);

      setUsers(content);
      setLastPage(totalPages);

      setIsFetching(false);
    };

    fetchUsers();
  }, [page, size, user]);

  const handlePreviousClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page < lastPage) setPage(page + 1);
  };

  const composeTableSkeleton = () => {
    const filler = Array.apply(null, Array(size));
    return (
      <>
        {filler.map((elem, index) => (
          <Tr key={index}>
            <Td>
              <Skeleton w={10} height='22px' />
            </Td>
            <Td>
              <Skeleton w={200} height='22px' />
            </Td>
            <Td>
              <Skeleton w={280} height='22px' />
            </Td>
            <Td>
              <Skeleton w={250} height='22px' />
            </Td>
            <Td>
              <Skeleton w={140} height='22px' />
            </Td>
            <Td>
              <Skeleton w={10} height='22px' />
            </Td>
          </Tr>
        ))}
      </>
    );
  };

  const updateUsersOnDelete = async (id?: number) => {
    setIsUploading(true);

    const { content, totalPages, first, last } = await getUsersByPageAndSize(page - 1, size);

    setUsers(content);
    setLastPage(totalPages);

    setIsUploading(false);
  };

  return (
    <div className={styles.content}>
      <HStack display='flex' justifyContent='space-between'>
        <Button colorScheme='green' onClick={onOpen}>
          Добавить пользователя
        </Button>
        <Select onChange={e => setSize(+e.target.value)} marginLeft='auto' w={100} defaultValue={10} size='md'>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
        </Select>
      </HStack>
      <TableContainer className={styles.table}>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th textAlign='center'>ID</Th>
              <Th textAlign='center'>Логин</Th>
              <Th textAlign='center'>Эл. почта</Th>
              <Th textAlign='center'>ФИО</Th>
              <Th textAlign='center'>Роль</Th>
              <Th textAlign='center'></Th>
            </Tr>
          </Thead>
          <Tbody position='relative'>
            {isUploading ? (
              <div className={styles.loadingStub}>
                <Spinner w={130} h={130} color='blue.400' speed='0.8s' thickness='6px' />
              </div>
            ) : null}
            {isFetching
              ? composeTableSkeleton()
              : users.map(user => (
                  <Tr key={user.id}>
                    <Td>{user.id?.toString()}</Td>
                    <Td>
                      <Editable textAlign='center' w='200px' defaultValue={user.login}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='300px' defaultValue={user.email}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='260px' defaultValue={user.fullname}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='140px' defaultValue={user.role}>
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                    </Td>
                    <Td paddingTop='2px' paddingBottom='2px'>
                      <UserRowActions id={user.id} updateUsersOnDelete={updateUsersOnDelete}></UserRowActions>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
      </TableContainer>
      <ButtonGroup className={styles.pagingButtons} variant='outline' spacing='6'>
        <IconButton onClick={handlePreviousClick} colorScheme='blue' icon={<FaAngleLeft />} aria-label={''} />
        {page > 1 ? (
          <Button onClick={() => setPage(1)} colorScheme='blue'>
            1
          </Button>
        ) : null}
        {page > 2 ? <FaEllipsisH /> : null}

        <Button colorScheme='blue' variant='solid'>
          {page}
        </Button>

        {page < lastPage - 1 ? <FaEllipsisH /> : null}
        {page < lastPage ? (
          <Button onClick={() => setPage(lastPage)} colorScheme='blue'>
            {lastPage}
          </Button>
        ) : null}
        <IconButton onClick={handleNextClick} colorScheme='blue' icon={<FaAngleRight />} aria-label={''} />
      </ButtonGroup>

      <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody padding='30px'>
            <AddUserSection onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
