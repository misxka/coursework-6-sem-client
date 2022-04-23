import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Category, getAllCategories } from '../../utils/category';

import { RootState } from '../../utils/store';
import AdminCategoryCard from '../AdminCategoryCard/AdminCategoryCard';
import ErrorDisplayer from '../Error/Error';

import styles from './Studio.module.scss';

export default function Studio() {
  const user = useSelector((state: RootState) => state.user.value);

  const [didMount, setDidMount] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element | JSX.Element[]>(<Spinner className={styles.spinner} color='blue.400' size='xl' />);
  const [categories, setCategories] = useState<Category[]>([]);

  const checkPermission = (role: string | undefined) => role === 'TEACHER';

  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setContent(<ErrorDisplayer code='401' />);
    if (didMount || user.role) {
      if (checkPermission(user.role)) {
        setContent(<Spinner className={styles.spinner} color='blue.400' size='xl' />);
        getCategories();
      } else setContent(<ErrorDisplayer code='403' />);
    }
  }, [user]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  useEffect(() => {
    const cards = categories?.map(category => {
      const { name, id, cards } = category;
      return <AdminCategoryCard key={id} wordsAmount={cards ? cards.length : 0} name={name} id={id} />;
    });
    setContent(<div className={styles.content}>{cards}</div>);
  }, [categories]);

  return content;
}
