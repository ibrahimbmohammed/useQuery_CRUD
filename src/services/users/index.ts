import { Api } from '@libs/api';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import type { User } from '@types';

export const getUsers = async () => {
  const res = await Api.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return res;
};

export const postUser = async (data: User) => {
  const res = await Api.post<User>('https://jsonplaceholder.typicode.com/users', data);
  return res;
};
export const editUser = async (data: User) => {
  const res = await Api.put<User>(`https://jsonplaceholder.typicode.com/users/${data.id}`, data);
  return res;
};
export const deleteUser = async (data: number | User) => {
  await Api.delete<User>(`https://jsonplaceholder.typicode.com/users/${data}`);
  return { data };
};

export const useGetUser = () => {
  return useQuery('users', getUsers);
};

export const useAddUser = () => {
  const queryClient = useQueryClient();
  return useMutation(postUser, {
    onSuccess: (data) => {
      const newUser: User = {
        id: (Math.random() * 101) | 11,
        name: data.name,
        username: data.username,
        phone: data.phone,
        email: data.email,
      };
      queryClient.setQueryData<User[]>('users', (oldQueryData) => {
        return [...(oldQueryData as User[]), newUser];
      });
    },
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  return useMutation(editUser, {
    onSuccess: (data) => {
      const newUser = {
        ...data,
      };
      queryClient.setQueryData<User[] | undefined>('users', (oldQueryData) => {
        const filterd = oldQueryData?.filter(({ id }) => id !== data.id);
        return [newUser, ...(filterd as User[])];
      });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteUser, {
    onSuccess: (data) => {
      const newUser = {
        ...data,
      };
      queryClient.setQueryData<User[] | undefined>('users', (oldQueryData) => {
        const filterd = oldQueryData?.filter(
          ({ id }) => id !== (newUser.data as unknown as number),
        );
        return [...(filterd as User[])];
      });
    },
  });
};
