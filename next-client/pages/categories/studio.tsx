import { NextPage } from 'next';

import Layout from '../../components/Layout/Layout';
import Navbar from '../../components/Navbar/Navbar';
import Studio from '../../components/Studio/Studio';

const StudioPage: NextPage = () => {
  return (
    <Layout
      home={false}
      pageTitle={'Мастерская преподавателя'}
      headerContent={
        <>
          <Navbar />
        </>
      }
    >
      <Studio />
    </Layout>
  );
};

export default StudioPage;
