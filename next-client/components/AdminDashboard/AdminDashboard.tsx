import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useState } from 'react';

import IUser from '../../interfaces/IUser';
import Metrics from '../Metrics/Metrics';
import UsersTable from '../UsersTable/UsersTable';

import styles from './AdminDashboard.module.scss';

export default function AdminDashboard() {
  const [users, setUsers] = useState<IUser[]>([]);

  return (
    <Tabs className={styles.content} variant='enclosed'>
      <TabList>
        <Tab>Пользователи</Tab>
        <Tab>Метрики</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <UsersTable users={users as any} setUsers={setUsers} />
        </TabPanel>
        <TabPanel>
          <Metrics users={users as any} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
