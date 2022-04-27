import axios from 'axios';

export interface IGroup {
  id: number;
  name: string;
  teacher: IUser;
}

export interface IUser {
  id: number;
  login: string;
  email: string;
  fullname: string;
  role: string;
  groups: [];
}

export interface IUsersPagingResponse {
  content: [IUser];
  first: boolean;
  last: boolean;
  size: number;
  totalPages: number;
  empty: boolean;
}

export type DeleteResponse = {
  status: number;
  message: string;
};

const getUsersByPageAndSize = async (page: number, size: number) => {
  const { data } = await axios.get<IUsersPagingResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/users`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
    params: {
      page,
      size
    }
  });
  return data;
};

const deleteUser = async (id?: number) => {
  const { data: deleteResult } = await axios.delete<DeleteResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/users/${id}`, {
    headers: {
      Authorization: `${localStorage.getItem('token')}`
    }
  });
  return deleteResult;
};

export { getUsersByPageAndSize, deleteUser };
