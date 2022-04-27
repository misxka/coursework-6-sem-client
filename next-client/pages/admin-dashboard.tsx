import { NextPage } from 'next';

import AdminDashboard from '../components/AdminDashboard/AdminDashboard';
import Layout from '../components/Layout/Layout';
import Navbar from '../components/Navbar/Navbar';

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
      <AdminDashboard />
    </Layout>
  );
};

export default StudioPage;
