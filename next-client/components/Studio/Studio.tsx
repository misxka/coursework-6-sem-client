import { Spinner } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../utils/store';
import ErrorDisplayer from '../Error/Error';

import styles from './Studio.module.scss';

export default function Studio() {
  const user = useSelector((state: RootState) => state.user.value);

  const [didMount, setDidMount] = useState<boolean>(false);
  const [content, setContent] = useState<JSX.Element>(<Spinner className={styles.spinner} color='blue.400' size='xl' />);

  const checkPermission = (role: string | undefined) => role === 'TEACHER';

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setContent(<ErrorDisplayer code='401' />);
    if (didMount || user.role) {
      if (checkPermission(user.role)) setContent(<div>Content</div>);
      else setContent(<ErrorDisplayer code='403' />);
    }
  }, [user]);

  useEffect(() => {
    setDidMount(true);
  }, []);

  return content;
}
