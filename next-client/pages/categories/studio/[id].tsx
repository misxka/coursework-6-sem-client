import { Skeleton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import AdminCardsContainer from '../../../components/AdminCardsContainer/AdminCardsContainer';
import ErrorDisplayer from '../../../components/Error/Error';
import Layout from '../../../components/Layout/Layout';
import Navbar from '../../../components/Navbar/Navbar';
import { Card, getAllCardsByCategory } from '../../../utils/api-calls/card';
import { getCategoryById } from '../../../utils/api-calls/category';
import { RootState } from '../../../utils/store';

const ContentContainer = styled.div`
  max-width: 100%;
  margin: 43px auto 0;
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-gap: 18px;
  justify-content: space-around;
  padding-bottom: 40px;
`;

const AdminCategoryPage: NextPage = () => {
  const user = useSelector((state: RootState) => state.user.value);

  const router = useRouter();
  const { id } = router.query;

  const [cards, setCards] = useState<Card[]>([]);
  const [content, setContent] = useState<JSX.Element | JSX.Element[]>();
  const [didMount, setDidMount] = useState<boolean>(false);

  const checkPermission = (role: string | undefined) => role === 'TEACHER';

  const getCards = async () => {
    const cards = await getAllCardsByCategory(Number(id));
    setCards(cards);
  };

  const addCard = (card: Card) => {
    cards.push(card);
    setCards([...cards]);
  };

  const deleteCard = (id: number) => {
    const updatedCards = cards.filter(card => card.id !== id);
    setCards(updatedCards);
  };

  const updateCards = (id: number, updatedCard: Card) => {
    const updatedCards = cards.map(card => (id === card.id ? { ...card, ...updatedCard } : card));
    setCards(updatedCards);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) setContent(<ErrorDisplayer code='401' />);
    if (didMount || user.role) {
      if (checkPermission(user.role)) {
        const filler = Array.apply(null, Array(4));
        setContent(
          <ContentContainer>
            {filler.map((elem, index) => (
              <Skeleton key={index} height={450} width={280} borderRadius={16} />
            ))}
          </ContentContainer>
        );
        getCards();
      } else setContent(<ErrorDisplayer code='403' />);
    }
  }, [user]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getCategoryById(Number(id));
      } catch (e) {
        router.push('/categories/studio');
      }
    };

    if (router.query.id) {
      fetchData();
    }
  }, [router]);

  useEffect(() => {
    setContent(<>{<AdminCardsContainer updateCardsOnDelete={deleteCard} updateCards={updateCards} refreshCards={addCard} cards={cards} categoryId={Number(id)} />}</>);
  }, [cards]);

  useEffect(() => {
    setDidMount(true);
  }, []);

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
      {content}
    </Layout>
  );
};

export default AdminCategoryPage;
