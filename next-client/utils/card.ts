import axios from 'axios';

export type Card = {
  id: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
};

const getAllCardsByCategory = async (categoryId: number): Promise<Card[]> => {
  const { data: cards } = await axios.get<Card[]>(`${process.env.NEXT_PUBLIC_HOST}/api/cards/${categoryId}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return cards;
};

export { getAllCardsByCategory };
