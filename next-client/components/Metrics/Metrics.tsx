import { Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getStats } from '../../utils/api-calls/user';

import styles from './Metrics.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Metrics() {
  const roles = ['STUDENT', 'TEACHER', 'ADMIN'];

  const [amounts, setAmounts] = useState<any>({});

  useEffect(() => {
    roles.map(async role => {
      const { amount } = await getStats(role);

      amounts[role.toLowerCase()] = amount;
      setAmounts(amounts);
    });
  }, []);

  const data = {
    labels: ['Студенты', 'Преподаватели', 'Администраторы'],
    datasets: [
      {
        label: 'Пользователи программы',
        data: [amounts.student, amounts.teacher, amounts.admin],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 8
      }
    ]
  };

  return (
    <div className={styles.content}>
      <div className={styles.pieChart}>
        <Text className={styles.chartTitle} fontSize='3xl' fontWeight={500}>
          Пользователи программы
        </Text>
        <Pie data={data} redraw={true} />
      </div>
    </div>
  );
}
