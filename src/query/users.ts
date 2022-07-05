import { useQuery } from "react-query";

import { getUsers, getUserById } from "src/services/users";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type Users = ReadonlyArray<User>;

const userKeys = {
  all: () => ["users"],
  one: (id: number) => [...userKeys.all(), id],
};

export const useGetUsers = () => {
  return useQuery<Users, Error>(userKeys.all(), async () => {
    const {
      data: { data },
    } = await getUsers();
    return data;
  });
};

export const useGetUserById = (id: number) => {
  return useQuery<User, Error>(userKeys.one(id), async () => {
    const {
      data: { data },
    } = await getUserById(id);
    return data;
  });
};
