import axios from 'axios';

import IUser from '../interfaces/IUser';

const getUserInfo = async (token: string): Promise<IUser> => {
  const { data: user } = await axios.get<IUser>(`${process.env.NEXT_PUBLIC_HOST}/api/auth/user-info`, {
    headers: {
      Authorization: token
    }
  });
  return user;
};

export { getUserInfo };
