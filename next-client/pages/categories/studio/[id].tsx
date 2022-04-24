import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '../../../components/Layout/Layout';
import Navbar from '../../../components/Navbar/Navbar';
import { Card, getCategoryById } from '../../../utils/category';

const AdminCategoryPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryById(Number(id));

        setCards(data.cards ? data.cards : []);
      } catch (e) {
        router.push('/categories/studio');
      }
    };

    if (router.query.id) {
      fetchData();
    }
  }, [router]);

  return (
    <Layout
      home={false}
      pageTitle={'name'}
      headerContent={
        <>
          <Navbar />
        </>
      }
    >
      {cards.map(card => (
        <div>{card.word}</div>
      ))}
    </Layout>
  );
};

export default AdminCategoryPage;
