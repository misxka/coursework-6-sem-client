import { Icon, Skeleton, Spinner, Tab, Table, TableContainer, TabList, TabPanel, TabPanels, Tabs, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { getCoursesByStudentId, getPersonalCourses, ICourse } from '../../utils/api-calls/course';
import { RootState } from '../../utils/store';
import ApplyCourse from '../ApplyCourse/ApplyCourse';

import styles from './StudentCourses.module.scss';

export default function StudentCourses() {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [courses, setCourses] = useState<ICourse[]>([]);
  const [personalCourses, setPersonalCourses] = useState<ICourse[]>([]);

  const user = useSelector((state: RootState) => state.user.value);

  useEffect(() => {
    const fetchData = async () => {
      if (user.id) {
        setIsFetching(true);

        const courses = await getCoursesByStudentId(user.id);
        const personalCourses = await getPersonalCourses(user.id);

        setCourses(courses);
        setPersonalCourses(personalCourses);

        setIsFetching(false);
      }
    };

    fetchData();
  }, [user]);

  const composeTableSkeleton = () => {
    const filler = Array.apply(null, Array(10));
    return (
      <>
        {filler.map((elem, index) => (
          <Tr key={index}>
            <Td>
              <Skeleton w='34px' height='32px' />
            </Td>
            <Td>
              <Skeleton w='300px' height='32px' />
            </Td>
            <Td>
              <Skeleton w='200px' height='32px' />
            </Td>
            <Td>
              <Skeleton w='60px' height='32px' />
            </Td>
            <Td>
              <Skeleton w='85px' height='32px' />
            </Td>
            <Td>
              <Skeleton w='120px' height='32px' />
            </Td>
          </Tr>
        ))}
      </>
    );
  };

  const updateCourses = async () => {
    if (user.id) {
      setIsFetching(true);

      const courses = await getCoursesByStudentId(user.id);
      const personalCourses = await getPersonalCourses(user.id);

      setCourses(courses);
      setPersonalCourses(personalCourses);

      setIsFetching(false);
    }
  };

  return (
    <div className={styles.content}>
      <Tabs size='md' variant='enclosed'>
        <TabList>
          <Tab>?????????????????? ??????????</Tab>
          <Tab>?????? ??????????</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TableContainer className={styles.table}>
              <Table variant='simple' size='sm'>
                <Thead>
                  <Tr>
                    <Th textAlign='center' minW='34px'>
                      ID
                    </Th>
                    <Th textAlign='center' minW='300px'>
                      ????????????????
                    </Th>
                    <Th textAlign='center' minW='200px'>
                      ????????
                    </Th>
                    <Th textAlign='center' minW='60px'>
                      ??????????????
                    </Th>
                    <Th textAlign='center' minW='85px'>
                      ?????????????
                    </Th>
                    <Th textAlign='center' minW='120px'>
                      ????????
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
                    : courses.map(course => (
                        <Tr key={course.id}>
                          <Td textAlign='center'>{course.id?.toString()}</Td>
                          <Td textAlign='center'>{course.title}</Td>
                          <Td textAlign='center'>{course.language}</Td>
                          <Td textAlign='center'>{course.level}</Td>
                          <Td textAlign='center'>{course.isOnline ? <Icon as={FaCheck} /> : <Icon as={FaTimes} />}</Td>
                          <Td textAlign='center'>{course.price.toString()}</Td>
                          <Td textAlign='center' paddingTop='2px' paddingBottom='2px'>
                            <ApplyCourse updateCourses={updateCourses} courseId={course.id} />
                          </Td>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
              {!isFetching && courses.length === 0 ? (
                <Text fontSize='4xl' fontWeight={500} textAlign='center' marginTop={24}>
                  ?? ??????????????????, ?????????? ???? ??????????????.
                </Text>
              ) : null}
            </TableContainer>
          </TabPanel>
          <TabPanel>
            <TableContainer className={styles.table}>
              <Table variant='simple' size='sm'>
                <Thead>
                  <Tr>
                    <Th textAlign='center' minW='34px'>
                      ID
                    </Th>
                    <Th textAlign='center' minW='300px'>
                      ????????????????
                    </Th>
                    <Th textAlign='center' minW='200px'>
                      ????????
                    </Th>
                    <Th textAlign='center' minW='60px'>
                      ??????????????
                    </Th>
                    <Th textAlign='center' minW='85px'>
                      ?????????????
                    </Th>
                    <Th textAlign='center' minW='120px'>
                      ????????
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
                    : personalCourses.map(course => (
                        <Tr key={course.id}>
                          <Td textAlign='center'>{course.id?.toString()}</Td>
                          <Td textAlign='center'>{course.title}</Td>
                          <Td textAlign='center'>{course.language}</Td>
                          <Td textAlign='center'>{course.level}</Td>
                          <Td textAlign='center'>{course.isOnline ? <Icon as={FaCheck} /> : <Icon as={FaTimes} />}</Td>
                          <Td textAlign='center'>{course.price.toString()}</Td>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
              {!isFetching && courses.length === 0 ? (
                <Text fontSize='4xl' fontWeight={500} textAlign='center' marginTop={24}>
                  ?? ??????????????????, ???? ?????? ???? ???????????????? ???? ???? ???????? ????????.
                </Text>
              ) : null}
            </TableContainer>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
