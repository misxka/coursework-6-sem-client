import axios from 'axios';

export type Card = {
  id: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
};

export type BaseResponse = {
  status: number;
  message: string;
};

export type CardCreateRequest = {
  data: any;
};

export type CardCreateResponse = {
  card: Card;
} & BaseResponse;

const getAllCardsByCategory = async (categoryId: number): Promise<Card[]> => {
  const { data: cards } = await axios.get<Card[]>(`${process.env.NEXT_PUBLIC_HOST}/api/cards/category/${categoryId}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return cards;
};

const getCardById = async (cardId: number): Promise<Card> => {
  const { data: card } = await axios.get<Card>(`${process.env.NEXT_PUBLIC_HOST}/api/cards/${cardId}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return card;
};

const createCard = async (formData: any): Promise<CardCreateResponse> => {
  const { data } = await axios({
    method: 'POST',
    url: `${process.env.NEXT_PUBLIC_HOST}/api/cards/`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `${localStorage.getItem('token')}` }
  });

  return data;
};

const deleteCard = async (id: number): Promise<BaseResponse> => {
  const { data: deleteResult } = await axios.delete<BaseResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/cards/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return deleteResult;
};

const updateCard = async (formData: any): Promise<CardCreateResponse> => {
  const { data } = await axios({
    method: 'PUT',
    url: `${process.env.NEXT_PUBLIC_HOST}/api/cards/`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `${localStorage.getItem('token')}` }
  });

  return data;
};

export { getAllCardsByCategory, createCard, deleteCard, updateCard, getCardById };
