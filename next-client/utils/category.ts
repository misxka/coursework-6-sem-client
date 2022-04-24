import axios, { AxiosResponse } from 'axios';

export type Category = {
  id: number;
  name: string;
  cards?: Card[];
};

export type Card = {
  id: number;
  word: string;
  translation: string;
  image: string;
  audio: string;
};

export type CategoryUpdateRequest = {
  name: string;
};

export type CategoryUpdateResponse = {
  id: number;
  name: string;
} & CategoryDeleteResponse;

export type CategoryDeleteResponse = {
  status: number;
  message: string;
};

export type CategoryCreateResponse = {
  category: Category;
} & CategoryDeleteResponse;

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

const updateCategory = async (id: number, name: string): Promise<CategoryUpdateResponse> => {
  const { data } = await axios.patch<CategoryUpdateRequest, AxiosResponse<CategoryUpdateResponse>>(
    `${process.env.NEXT_PUBLIC_HOST}/api/categories/${id}`,
    {
      name
    },
    {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    }
  );
  return data;
};

const deleteCategory = async (id: number): Promise<CategoryDeleteResponse> => {
  const { data: deleteResult } = await axios.delete<CategoryDeleteResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/categories/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return deleteResult;
};

const createCategory = async (name: string): Promise<CategoryCreateResponse> => {
  const { data } = await axios.post<CategoryCreateResponse>(
    `${process.env.NEXT_PUBLIC_HOST}/api/categories/`,
    {
      name
    },
    {
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    }
  );
  return data;
};

export { getAllCategories, getCategoryPaths, getCategoryById, updateCategory, deleteCategory, createCategory };
