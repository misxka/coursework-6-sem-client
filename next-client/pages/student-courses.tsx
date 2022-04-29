import { NextPage } from 'next';

import Layout from '../components/Layout/Layout';
import Navbar from '../components/Navbar/Navbar';
import StudentCourses from '../components/StudentCourses/StudentCourses';

const StudentCoursesPage: NextPage = () => {
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
      <StudentCourses />
    </Layout>
  );
};

export default StudentCoursesPage;
