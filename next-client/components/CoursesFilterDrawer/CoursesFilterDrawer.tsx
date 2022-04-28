import {
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { update } from '../../utils/slices/courseFilterSlice';
import { RootState } from '../../utils/store';

import styles from './CoursesFilterDrawer.module.scss';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  filterCourses: (title: string, language: string, level: string, priceMin: number, priceMax: number, isOnline: boolean) => Promise<void>;
}

export default function CoursesFilterDrawer(props: Props) {
  const { isOpen, onClose, filterCourses } = props;

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(500);

  const filter = useSelector((state: RootState) => state.courseFilter.value);
  const dispatch = useDispatch();

  const clearFilters = () => {
    dispatch(
      update({
        title: '',
        language: '',
        level: '',
        priceMin: 0,
        priceMax: 1000,
        isOnline: false
      })
    );

    setMin(0);
    setMax(500);
  };

  const applyFilters = () => {
    filterCourses(filter.title, filter.language, filter.level, filter.priceMin, filter.priceMax, filter.isOnline);
    onClose();
  };

  const setFilters = (field: 'title' | 'language' | 'level' | 'priceMin' | 'priceMax' | 'isOnline', value: string | boolean | number) => {
    const obj = { ...filter };
    // @ts-ignore
    obj[field] = value;
    dispatch(update(obj));
  };

  return (
    <Drawer size='sm' isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton marginTop={4} />
        <DrawerHeader marginTop={2} marginBottom={4}>
          Поиск по параметрам
        </DrawerHeader>

        <DrawerBody>
          <Input onChange={e => setFilters('title', e.target.value)} className={styles.drawerField} placeholder='Название' value={filter.title} />
          <Input onChange={e => setFilters('language', e.target.value)} className={styles.drawerField} placeholder='Язык' value={filter.language} />
          <Input onChange={e => setFilters('level', e.target.value)} className={styles.drawerField} placeholder='Уровень' value={filter.level} />
          <div className={`${styles.drawerField} ${styles.flexDiv}`}>
            <Input value={min} size='sm' maxW={20} marginRight='30px' />
            <RangeSlider
              aria-label={['min', 'max']}
              min={0}
              max={500}
              defaultValue={[min, max]}
              onChange={values => {
                setMin(values[0]);
                setMax(values[1]);
              }}
              onChangeEnd={values => {
                setFilters('priceMin', values[0]);
                setFilters('priceMax', values[1]);
              }}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
            <Input value={max} size='sm' maxW={20} marginLeft='30px' />
          </div>
          <div className={`${styles.drawerField} ${styles.flexDiv}`}>
            <Text fontSize={18} marginBottom={2}>
              Онлайн?
            </Text>
            <Checkbox display='block' marginLeft={6} isChecked={filter.isOnline} onChange={e => setFilters('isOnline', e.target.checked)} />
          </div>
        </DrawerBody>

        <DrawerFooter marginBottom={6} display='flex' justifyContent='space-around'>
          <Button variant='outline' colorScheme='red' mr={3} onClick={clearFilters}>
            Очистить
          </Button>
          <Button colorScheme='green' onClick={applyFilters}>
            Применить
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
