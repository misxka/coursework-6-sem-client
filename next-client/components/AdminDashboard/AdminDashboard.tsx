import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';

import Metrics from '../Metrics/Metrics';
import UsersTable from '../UsersTable/UsersTable';

import styles from './AdminDashboard.module.scss';

export default function AdminDashboard() {
  return (
    <Tabs className={styles.content} variant='enclosed'>
      <TabList>
        <Tab>Пользователи</Tab>
        <Tab>Метрики</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <UsersTable />
        </TabPanel>
        <TabPanel>
          <Metrics />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
