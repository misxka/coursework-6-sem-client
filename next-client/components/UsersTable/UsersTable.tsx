import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
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
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaFilter } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { getUsersByPageAndSize, getUsersFiltered, IUser, patchUser } from '../../utils/api-calls/user';
import { RootState } from '../../utils/store';
import AddUserSection from '../AddUserSection/AddUserSection';
import FilterDrawer from '../FilterDrawer/FilterDrawer';
import UserRowActions from '../UserRowActions/UserRowActions';

import styles from './UsersTable.module.scss';

interface Props {
  users: IUser[];
  setUsers: (users: IUser[]) => void;
}

export default function UsersTable(props: Props) {
  const { users, setUsers } = props;

  const user = useSelector((state: RootState) => state.user.value);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(8);
  const [lastPage, setLastPage] = useState<number>(1);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsFetching(true);

      const { content, totalPages, first, last } = await getUsersByPageAndSize(page - 1, size, sortField, sortDirection);

      setUsers(content);
      setLastPage(totalPages);

      setIsFetching(false);
    };

    fetchUsers();
  }, [page, size, user, sortDirection, sortField]);

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
              <Skeleton w={10} height='32px' />
            </Td>
            <Td>
              <Skeleton w={200} height='32px' />
            </Td>
            <Td>
              <Skeleton w={280} height='32px' />
            </Td>
            <Td>
              <Skeleton w={250} height='32px' />
            </Td>
            <Td>
              <Skeleton w={150} height='32px' />
            </Td>
            <Td>
              <Skeleton w={10} height='32px' />
            </Td>
          </Tr>
        ))}
      </>
    );
  };

  const updateUsers = async () => {
    setIsUploading(true);

    const { content, totalPages, first, last } = await getUsersByPageAndSize(page - 1, size, sortField, sortDirection);

    setUsers(content);
    setLastPage(totalPages);

    setIsUploading(false);
  };

  const updateUser = async (id: number | undefined, field: string, value: string) => {
    setIsUploading(true);

    const updateResult = await patchUser(id, field, value);

    if (updateResult.status === 200) {
      const { content, totalPages, first, last } = await getUsersByPageAndSize(page - 1, size, sortField, sortDirection);

      setUsers(content);
      setLastPage(totalPages);

      setIsUploading(false);

      toast({
        title: updateResult.message,
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    } else {
      setIsUploading(false);

      toast({
        title: updateResult.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  const sortUsers = (field: string) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection(true);
    } else {
      setSortDirection(!sortDirection);
    }
  };

  const renderSortIcon = (field: string) => {
    if (field === sortField) return sortDirection ? <TriangleUpIcon marginLeft={2} marginBottom='4px' /> : <TriangleDownIcon marginLeft={2} marginBottom='4px' />;
    else return null;
  };

  const filterUsers = async (login: string, email: string, fullname: string, role: string) => {
    setIsUploading(true);

    const { content, totalPages, first, last } = await getUsersFiltered({
      page: page - 1,
      size,
      field: sortField,
      direction: sortDirection,
      login,
      email,
      fullname,
      role
    });

    setUsers(content);
    setLastPage(totalPages);

    setIsUploading(false);
  };

  return (
    <div className={styles.content}>
      <HStack display='flex' justifyContent='space-between'>
        <IconButton onClick={onOpenDrawer} variant='outline' colorScheme='blue' aria-label='Поиск по параметрам' icon={<FaFilter />} />
        <Button colorScheme='green' onClick={onOpen}>
          Добавить пользователя
        </Button>
        <Select onChange={e => setSize(+e.target.value)} marginLeft='auto' w={100} defaultValue={8} size='md'>
          <option value='8'>8</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
        </Select>
      </HStack>
      <TableContainer className={styles.table}>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th cursor='pointer' textAlign='center' onClick={() => sortUsers('id')} minW='34px'>
                ID
                {renderSortIcon('id')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortUsers('login')} minW='200px  '>
                Логин
                {renderSortIcon('login')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortUsers('email')} minW='300px'>
                Эл. почта
                {renderSortIcon('email')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortUsers('fullname')} minW='260px'>
                ФИО
                {renderSortIcon('fullname')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortUsers('role')} minW='150px'>
                Роль
                {renderSortIcon('role')}
              </Th>
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
                        <EditableInput onBlur={e => updateUser(user.id, 'login', e.target.value)} />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='300px' defaultValue={user.email}>
                        <EditablePreview />
                        <EditableInput onBlur={e => updateUser(user.id, 'email', e.target.value)} />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='260px' defaultValue={user.fullname}>
                        <EditablePreview />
                        <EditableInput onBlur={e => updateUser(user.id, 'fullname', e.target.value)} />
                      </Editable>
                    </Td>
                    <Td>
                      <Select onChange={e => updateUser(user.id, 'role', e.target.value)} marginLeft='auto' w={150} defaultValue={user.role} size='sm'>
                        <option value='STUDENT'>Студент</option>
                        <option value='TEACHER'>Преподаватель</option>
                        <option value='ADMIN'>Администратор</option>
                      </Select>
                    </Td>
                    <Td paddingTop='2px' paddingBottom='2px'>
                      <UserRowActions id={user.id} updateUsers={updateUsers}></UserRowActions>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
        {!isFetching && lastPage === 0 ? (
          <Text fontSize='4xl' fontWeight={500} textAlign='center' marginTop={24}>
            К сожалению, пользователи не найдены.
          </Text>
        ) : null}
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

      <FilterDrawer filterUsers={filterUsers} onClose={onCloseDrawer} isOpen={isOpenDrawer} />
    </div>
  );
}
