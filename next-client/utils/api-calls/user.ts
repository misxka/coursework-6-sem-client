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

export type UpdateResponse = {
  user: IUser;
} & DeleteResponse;

const getUsersByPageAndSize = async (page: number, size: number, field: string, direction: boolean) => {
  const { data } = await axios.get<IUsersPagingResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/users`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
    params: {
      page,
      size,
      field,
      direction
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

const patchUser = async (id: number | undefined, field: string, value: string) => {
  const { data: updateResult } = await axios.patch<UpdateResponse>(
    `${process.env.NEXT_PUBLIC_HOST}/api/users/${id}`,
    [
      {
        op: 'replace',
        path: `/${field}`,
        value: value
      }
    ],
    {
      headers: {
        'Content-Type': 'application/json-patch+json',
        Authorization: `${localStorage.getItem('token')}`
      }
    }
  );
  return updateResult;
};

export { getUsersByPageAndSize, deleteUser, patchUser };
