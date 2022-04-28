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

export interface FilterRequest {
  login: string;
  email: string;
  fullname: string;
  role: string;
  page: number;
  size: number;
  field: string;
  direction: boolean;
}

export interface YearStatsResponse {
  yearStats: {
    student: number[];
    teacher: number[];
    admin: number[];
  };
}

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

const getUsersFiltered = async (request: FilterRequest) => {
  const { login, email, fullname, role, page, size, field, direction } = request;

  const { data } = await axios.get<IUsersPagingResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/users/filter`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
    params: {
      login,
      email,
      fullname,
      role,
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

const getStats = async (role: string) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/users/stats`, {
    headers: { Authorization: `${localStorage.getItem('token')}` },
    params: {
      role
    }
  });
  return data;
};

const getYearStats = async () => {
  const { data } = await axios.get<YearStatsResponse>(`${process.env.NEXT_PUBLIC_HOST}/api/users/year-stats`, {
    headers: { Authorization: `${localStorage.getItem('token')}` }
  });
  return data;
};

export { getUsersByPageAndSize, deleteUser, patchUser, getUsersFiltered, getStats, getYearStats };
