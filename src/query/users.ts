import { useQuery, useInfiniteQuery } from "react-query";

import { getUsers, getUser } from "src/services/users";

type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
};

type InfiniteUsers = {
  page: number;
  total_pages: number;
  total: number;
  per_page: number;
  data: User[];
  support: {
    text: string;
    url: string;
  };
};

export const usersKeys = {
  all: () => ["users"],
  page: (page: number) => [...usersKeys.all(), "page", page],
  one: (id: number) => [...usersKeys.all(), "id", id],
};

export const useGetUsersByPage = (page: number = 1) => {
  return useQuery<User[], Error>(usersKeys.page(page), async () => {
    const {
      data: { data },
    } = await getUsers(page);
    return data;
  });
};

export const useGetInfiniteUsers = () => {
  return useInfiniteQuery<InfiniteUsers, Error>(
    usersKeys.all(),
    async ({ pageParam = 1 }) => {
      console.log("pageParam: ", pageParam);
      const { data } = await getUsers(pageParam);
      return data; // page에 대한 정보가 있어야 next page를 패치할 수 있다.
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        // lastPage에는 fetch callback의 리턴값이 전달됨
        // allPage에는 배열안에 지금까지 불러온 데이터를 계속 축적하는 형태 [[data], [data1], .......]
        const nextPage = lastPage.page >= lastPage.total_pages ? undefined : lastPage.page + 1;
        return nextPage;
      },
    },
  );
};

export const useGetUser = (id: number) => {
  return useQuery<User, Error>(
    usersKeys.one(id),
    async () => {
      const {
        data: { data },
      } = await getUser(id);
      return data;
    },
    {
      enabled: !!id, // id가 있어야만 쿼리 실행을 함 dependent query
    },
  );
};
