import { Button, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { applyCourse } from '../../utils/api-calls/user';
import { RootState } from '../../utils/store';

interface Props {
  courseId: number;
  updateCourses: () => Promise<void>;
}

export default function ApplyCourse(props: Props) {
  const { courseId, updateCourses } = props;

  const user = useSelector((state: RootState) => state.user.value);

  const toast = useToast();

  const [isFetching, setIsFetching] = useState(false);

  const apply = async () => {
    setIsFetching(true);
    const result = await applyCourse(user.id, courseId);

    if (result.status === 200) {
      await updateCourses();
      toast({
        title: result.message,
        status: 'success',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    } else {
      toast({
        title: result.message,
        status: 'error',
        duration: 5000,
        position: 'bottom-right',
        isClosable: true
      });
    }
    setIsFetching(false);
  };

  return (
    <Button colorScheme='green' variant='outline' onClick={apply} isLoading={isFetching}>
      Записаться
    </Button>
  );
}
