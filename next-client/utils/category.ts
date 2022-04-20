import axios from 'axios';

export type Category = {
  id: number;
  name: string;
  link: string;
  cards?: Card[];
};

export type Card = {
  id: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
};

const getAllCategories = async (): Promise<Category[]> => {
  const { data: categories } = await axios.get<Category[]>(`${process.env.NEXT_PUBLIC_HOST}/api/categories`);
  return categories;
};

const getCategoryById = async (id: number): Promise<Category> => {
  const { data: category } = await axios.get<Category>(`${process.env.NEXT_PUBLIC_HOST}/api/categories/${id}`);
  return category;
};

const getCategoryPaths = async () => {
  const ids = (await getAllCategories()).map(category => category.id);

  return ids.map(id => {
    return {
      params: {
        id: id.toString()
      }
    };
  });
};

export { getAllCategories, getCategoryPaths, getCategoryById };
