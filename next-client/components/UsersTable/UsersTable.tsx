import { Button, ButtonGroup, Editable, EditableInput, EditablePreview, Icon, IconButton, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH } from 'react-icons/fa';

import IUser from '../../interfaces/IUser';
import { getUsersByPageAndSize } from '../../utils/api-calls/user';

import styles from './UsersTable.module.scss';

export default function UsersTable() {
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [users, setUsers] = useState<IUser[]>([]);
  const [lastPage, setLastPage] = useState<number>(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const { content, totalPages, first, last } = await getUsersByPageAndSize(page - 1, size);

      setUsers(content);
      setLastPage(totalPages);
    };

    fetchUsers();
  }, [page]);

  const handlePreviousClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page < lastPage) setPage(page + 1);
  };

  return (
    <div className={styles.content}>
      <Select marginLeft='auto' w={100} defaultValue={10} size='sm'>
        <option value='10'>10</option>
        <option value='20'>20</option>
        <option value='50'>50</option>
      </Select>
      <TableContainer className={styles.table}>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th textAlign='center'>№</Th>
              <Th textAlign='center'>Логин</Th>
              <Th textAlign='center'>Эл. почта</Th>
              <Th textAlign='center'>ФИО</Th>
              <Th textAlign='center'>Роль</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map(user => (
              <Tr>
                <Td>
                  <Editable textAlign='center' w='40px' defaultValue={user.id?.toString()}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Td>
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
                  <Editable textAlign='center' w='160px' defaultValue={user.role}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
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
    </div>
  );
}
