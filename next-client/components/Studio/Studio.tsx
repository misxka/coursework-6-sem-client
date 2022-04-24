import { Skeleton, Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Category, getAllCategories } from '../../utils/category';

import { RootState } from '../../utils/store';
import AdminCategoryCard from '../AdminCategoryCard/AdminCategoryCard';
import ErrorDisplayer from '../Error/Error';
import NewCategory from '../NewCategory/NewCategory';

import styles from './Studio.module.scss';

export default function Studio() {
  const user = useSelector((state: RootState) => state.user.value);

  const [didMount, setDidMount] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element | JSX.Element[]>();
  const [categories, setCategories] = useState<Category[]>([]);

  const checkPermission = (role: string | undefined) => role === 'TEACHER';

  const getCategories = async () => {
    const categories = await getAllCategories();
    setCategories(categories);
  };

  const updateCategories = (id: number, name: string) => {
    const updatedCategories = categories.map(category => (id === category.id ? { ...category, name } : category));
    setCategories(updatedCategories);
  };

  const deleteCategory = (id: number) => {
    const updatedCategories = categories.filter(category => category.id !== id);
    setCategories(updatedCategories);
  };

  const addCategory = (category: Category) => {
    categories.push(category);
    setCategories([...categories]);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setContent(<ErrorDisplayer code='401' />);
    if (didMount || user.role) {
      if (checkPermission(user.role)) {
        const filler = Array.apply(null, Array(8));
        setContent(
          <div className={styles.content}>
            {filler.map((elem, index) => (
              <Skeleton key={index} height={250} width={300} borderRadius={16} />
            ))}
          </div>
        );
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
      return <AdminCategoryCard key={id} wordsAmount={cards ? cards.length : 0} name={name} id={id} updateCategories={updateCategories} updateCategoriesOnDelete={deleteCategory} />;
    });
    setContent(
      <div className={styles.content}>
        {cards}
        {didMount ? <NewCategory refreshCategories={addCategory} /> : null}
      </div>
    );
  }, [categories]);

  return content;
}
