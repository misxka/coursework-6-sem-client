import { NextPage } from 'next';

import Layout from '../components/Layout/Layout';
import Navbar from '../components/Navbar/Navbar';
import UsersTable from '../components/UsersTable/UsersTable';

const StudioPage: NextPage = () => {
  return (
    <Layout
      home={false}
      pageTitle={'Кабинет администратора'}
      headerContent={
        <>
          <Navbar />
        </>
      }
    >
      <UsersTable />
    </Layout>
  );
};

export default StudioPage;
