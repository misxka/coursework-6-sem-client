import { Spinner, Text } from '@chakra-ui/react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, BarElement, LinearScale } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';

import { getStats, getYearStats, IUser } from '../../utils/api-calls/user';

import styles from './Metrics.module.scss';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

interface Props {
  users: IUser[];
}

export default function Metrics(props: Props) {
  const { users } = props;

  const roles = ['STUDENT', 'TEACHER', 'ADMIN'];
  const currentYear = new Date().getFullYear();

  const [pieData, setPieData] = useState<any>(null);
  const [barData, setBarData] = useState<any>(null);

  const setPieChartData = (amounts: any) => {
    return {
      labels: ['Студент', 'Преподаватель', 'Администратор'],
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

  const setBarChartData = (yearStats: { student: number[]; teacher: number[]; admin: number[] }) => {
    const studentAmounts = yearStats.student;
    const teacherAmounts = yearStats.teacher;
    const adminAmounts = yearStats.admin;

    return {
      labels: ['Студент', 'Преподаватель', 'Администратор'],
      datasets: [
        {
          label: currentYear,
          data: [studentAmounts[0], teacherAmounts[0], adminAmounts[0]],
          backgroundColor: 'rgb(255, 99, 132)'
        },
        {
          label: currentYear - 1,
          data: [studentAmounts[1], teacherAmounts[1], adminAmounts[1]],
          backgroundColor: 'rgb(54, 162, 235)'
        },
        {
          label: currentYear - 2,
          data: [studentAmounts[2], teacherAmounts[2], adminAmounts[2]],
          backgroundColor: 'rgb(255, 205, 86)'
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

      const tempData = setPieChartData(amounts);
      setPieData(tempData);
    };

    fetchData();
  }, [users]);

  useEffect(() => {
    const fetchData = async () => {
      const { yearStats } = await getYearStats();

      const tempData = setBarChartData(yearStats);
      setBarData(tempData);
    };

    fetchData();
  }, [users]);

  return (
    <div className={styles.content}>
      <div className={styles.pieChart}>
        <Text className={styles.chartTitle} fontSize='3xl' fontWeight={500}>
          Пользователи программы
        </Text>
        {pieData ? <Pie data={pieData} redraw={true} /> : <Spinner marginLeft='130px' marginTop='70px' w={150} h={150} color='blue.400' speed='0.8s' />}
      </div>
      <div className={styles.barChart}>
        <Text className={styles.chartTitle} fontSize='3xl' fontWeight={500}>
          Новые пользователи - по годам
        </Text>
        {barData ? <Bar data={barData} redraw={true} /> : <Spinner marginLeft='80px' marginTop='100px' w={150} h={150} color='blue.400' speed='0.8s' />}
      </div>
    </div>
  );
}
