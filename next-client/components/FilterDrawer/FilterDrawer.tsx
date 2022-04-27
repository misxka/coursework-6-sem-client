import { Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Select } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';

import { update } from '../../utils/slices/filterSlice';
import { RootState } from '../../utils/store';

import styles from './FilterDrawer.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  filterUsers: (login: string, email: string, fullname: string, role: string) => Promise<void>;
}

export default function FilterDrawer(props: Props) {
  const { isOpen, onClose, filterUsers } = props;

  const filter = useSelector((state: RootState) => state.filter.value);
  const dispatch = useDispatch();

  const clearFilters = () => {
    dispatch(
      update({
        login: '',
        email: '',
        fullname: '',
        role: 'STUDENT'
      })
    );
  };

  const applyFilters = () => {
    filterUsers(filter.login, filter.email, filter.fullname, filter.role);
    onClose();
  };

  const setFilters = (field: 'login' | 'fullname' | 'email' | 'role', value: string) => {
    const obj = { ...filter };
    obj[field] = value;
    dispatch(update(obj));
  };

  return (
    <Drawer size='xs' isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={4} />
        <DrawerHeader marginTop={2} marginBottom={4}>
          Поиск по параметрам
        </DrawerHeader>

        <DrawerBody>
          <Input onChange={e => setFilters('login', e.target.value)} className={styles.drawerField} placeholder='Логин' value={filter.login} />
          <Input onChange={e => setFilters('email', e.target.value)} className={styles.drawerField} placeholder='Email' value={filter.email} />
          <Input onChange={e => setFilters('fullname', e.target.value)} className={styles.drawerField} placeholder='ФИО' value={filter.fullname} />
          <Select onChange={e => setFilters('role', e.target.value)} w={180} defaultValue={'STUDENT'} size='md' value={filter.role}>
            <option value='STUDENT'>Студент</option>
            <option value='TEACHER'>Преподаватель</option>
            <option value='ADMIN'>Администратор</option>
          </Select>
        </DrawerBody>

        <DrawerFooter marginBottom={6} display='flex' justifyContent='space-around'>
          <Button variant='outline' colorScheme='red' mr={3} onClick={clearFilters}>
            Очистить
          </Button>
          <Button colorScheme='green' onClick={applyFilters}>
            Применить
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
