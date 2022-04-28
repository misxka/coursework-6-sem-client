import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Checkbox,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  Skeleton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight, FaEllipsisH, FaFilter } from 'react-icons/fa';
import { useSelector } from 'react-redux';

import { getCoursesByPageAndSize, getCoursesFiltered, ICourse, patchCourse } from '../../utils/api-calls/course';
import { RootState } from '../../utils/store';
import AddUserSection from '../AddUserSection/AddUserSection';
import CourseRowActions from '../CourseRowActions/CourseRowActions';

import styles from './CoursesTable.module.scss';

export default function CoursesTable() {
  const user = useSelector((state: RootState) => state.user.value);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [lastPage, setLastPage] = useState<number>(1);

  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const [courses, setCourses] = useState<ICourse[]>([]);

  const [sortField, setSortField] = useState<string>('id');
  const [sortDirection, setSortDirection] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);

      const { content, totalPages, first, last } = await getCoursesByPageAndSize(page - 1, size, sortField, sortDirection);

      setCourses(content);
      setLastPage(totalPages);

      setIsFetching(false);
    };

    fetchData();
  }, [page, size, user, sortDirection, sortField]);

  const handlePreviousClick = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextClick = () => {
    if (page < lastPage) setPage(page + 1);
  };

  const composeTableSkeleton = () => {
    const filler = Array.apply(null, Array(size));
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
    setIsUploading(true);

    const { content, totalPages, first, last } = await getCoursesByPageAndSize(page - 1, size, sortField, sortDirection);

    setCourses(content);
    setLastPage(totalPages);

    setIsUploading(false);
  };

  const updateCourse = async (id: number | undefined, field: string, value: string | boolean) => {
    setIsUploading(true);

    const updateResult = await patchCourse(id, field, value);

    if (updateResult.status === 200) {
      const { content, totalPages, first, last } = await getCoursesByPageAndSize(page - 1, size, sortField, sortDirection);

      setCourses(content);
      setLastPage(totalPages);

      setIsUploading(false);

      toast({
        title: updateResult.message,
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    } else {
      setIsUploading(false);

      toast({
        title: updateResult.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    }
  };

  const sortCourses = (field: string) => {
    if (sortField !== field) {
      setSortField(field);
      setSortDirection(true);
    } else {
      setSortDirection(!sortDirection);
    }
  };

  const renderSortIcon = (field: string) => {
    if (field === sortField) return sortDirection ? <TriangleUpIcon marginLeft={2} marginBottom='4px' /> : <TriangleDownIcon marginLeft={2} marginBottom='4px' />;
    else return null;
  };

  const filterUsers = async (title: string, language: string, level: string, isOnline: boolean, priceMin: number, priceMax: number) => {
    setIsUploading(true);

    const { content, totalPages, first, last } = await getCoursesFiltered({
      page: page - 1,
      size,
      field: sortField,
      direction: sortDirection,
      title,
      language,
      level,
      isOnline,
      priceMin,
      priceMax
    });

    setCourses(content);
    setLastPage(totalPages);

    setIsUploading(false);
  };

  return (
    <div className={styles.content}>
      <HStack display='flex' justifyContent='space-between'>
        <IconButton onClick={onOpenDrawer} variant='outline' colorScheme='blue' aria-label='Поиск по параметрам' icon={<FaFilter />} />
        <Button colorScheme='green' onClick={onOpen}>
          Добавить курс
        </Button>
        <Select onChange={e => setSize(+e.target.value)} marginLeft='auto' w={100} defaultValue={8} size='md'>
          <option value='10'>10</option>
          <option value='20'>20</option>
          <option value='50'>50</option>
        </Select>
      </HStack>
      <TableContainer className={styles.table}>
        <Table variant='simple' size='sm'>
          <Thead>
            <Tr>
              <Th cursor='pointer' textAlign='center' onClick={() => sortCourses('id')} minW='34px'>
                ID
                {renderSortIcon('id')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortCourses('title')} minW='300px'>
                Название
                {renderSortIcon('title')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortCourses('language')} minW='200px'>
                Язык
                {renderSortIcon('language')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortCourses('level')} minW='60px'>
                Уровень
                {renderSortIcon('level')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortCourses('isOnline')} minW='85px'>
                Онлайн?
                {renderSortIcon('isOnline')}
              </Th>
              <Th cursor='pointer' textAlign='center' onClick={() => sortCourses('price')} minW='120px'>
                Цена
                {renderSortIcon('price')}
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
                    <Td>{course.id?.toString()}</Td>
                    <Td>
                      <Editable textAlign='center' w='300px' defaultValue={course.title}>
                        <EditablePreview />
                        <EditableInput onBlur={e => updateCourse(course.id, 'title', e.target.value)} />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='200px' defaultValue={course.language}>
                        <EditablePreview />
                        <EditableInput onBlur={e => updateCourse(course.id, 'language', e.target.value)} />
                      </Editable>
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='60px' defaultValue={course.level}>
                        <EditablePreview />
                        <EditableInput onBlur={e => updateCourse(course.id, 'level', e.target.value)} />
                      </Editable>
                    </Td>
                    <Td>
                      <Checkbox display='block' marginLeft={6} defaultChecked={course.isOnline} onChange={e => updateCourse(course.id, 'isOnline', e.target.checked)} />
                    </Td>
                    <Td>
                      <Editable textAlign='center' w='120px' defaultValue={course.price.toString()}>
                        <EditablePreview />
                        <EditableInput onBlur={e => updateCourse(course.id, 'price', e.target.value)} />
                      </Editable>
                    </Td>
                    <Td paddingTop='2px' paddingBottom='2px'>
                      <CourseRowActions id={course.id} updateCourses={updateCourses}></CourseRowActions>
                    </Td>
                  </Tr>
                ))}
          </Tbody>
        </Table>
        {!isFetching && lastPage === 0 ? (
          <Text fontSize='4xl' fontWeight={500} textAlign='center' marginTop={24}>
            К сожалению, курсы не найдены.
          </Text>
        ) : null}
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

      <Modal size='lg' isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody padding='30px'>
            <AddUserSection onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
