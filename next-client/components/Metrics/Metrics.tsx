import { Spinner, Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { getStats, IUser } from '../../utils/api-calls/user';

import styles from './Metrics.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  users: IUser[];
}

export default function Metrics(props: Props) {
  const { users } = props;

  const roles = ['STUDENT', 'TEACHER', 'ADMIN'];

  const [data, setData] = useState<any>(null);

  const setChartPieData = (amounts: any) => {
    return {
      labels: ['Студенты', 'Преподаватели', 'Администраторы'],
      datasets: [
        {
          label: 'Пользователи программы',
          data: [amounts.student, amounts.teacher, amounts.admin],
          backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
          hoverOffset: 4
        }
      ]
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const amounts = {} as any;
      for await (const role of roles) {
        const { amount } = await getStats(role);

        amounts[role.toLowerCase()] = amount;
      }

      const tempData = setChartPieData(amounts);
      setData(tempData);
    };

    fetchData();
  }, [users]);

  return (
    <div className={styles.content}>
      <div className={styles.pieChart}>
        <Text className={styles.chartTitle} fontSize='3xl' fontWeight={500}>
          Пользователи программы
        </Text>
        {data ? <Pie data={data} redraw={true} /> : <Spinner marginLeft='130px' marginTop='70px' w={150} h={150} color='blue.400' speed='0.8s' />}
      </div>
    </div>
  );
}
