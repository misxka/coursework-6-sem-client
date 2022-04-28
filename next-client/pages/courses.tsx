import { NextPage } from 'next';

import Layout from '../components/Layout/Layout';
import Navbar from '../components/Navbar/Navbar';
import TeacherCourses from '../components/TeacherCourses/TeacherCourses';

const CoursesPage: NextPage = () => {
  return (
    <Layout
      home={false}
      pageTitle={'Курсы'}
      headerContent={
        <>
          <Navbar />
        </>
      }
    >
      <TeacherCourses />
    </Layout>
  );
};

export default CoursesPage;
