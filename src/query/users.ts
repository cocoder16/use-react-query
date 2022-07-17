import { useQuery, useInfiniteQuery, useMutation, useQueryClient } from "react-query";

import { getUsers, getUser, postMember } from "src/services/users";

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
        const nextPage: number | undefined = lastPage.page >= lastPage.total_pages ? undefined : lastPage.page + 1;
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

export const usePostMember = () => {
  const queryClient = useQueryClient();

  return useMutation((member: Member) => postMember(member), {
    onMutate: async variables => {
      // mutation 실행 전에 실행
      // Cancel current queries for the users
      console.log("before: ", queryClient.getQueryData(usersKeys.page(1)));

      await queryClient.cancelQueries(usersKeys.page(1));

      // snapshow previous user
      const previousUsers = queryClient.getQueryData(usersKeys.page(1));

      // Create optimistic user
      const optimisticUser: User = {
        id: new Date().getTime(),
        email: "abc@gmail.com",
        first_name: variables.name,
        last_name: variables.job,
        avatar: "abcde_url",
      };

      // Add optimistic user to users
      queryClient.setQueryData(usersKeys.page(1), (oldData: any) => {
        console.log("### oldData: ", oldData);
        return [...oldData, optimisticUser];
      });

      console.log("after: ", queryClient.getQueryData(usersKeys.page(1)));

      // Return context with the optimistic user
      return { previousUsers, optimisticUser };
    },
    onSuccess: (result, variables, context) => {
      // mutation 실행 성공 후 실행
      // Replace optimistic user in the users with the result
      console.log("### context: ", context); // onMutate return값
      console.log("### result: ", result); // api response

      // queryClient.setQueryData(usersKeys.page(1), (oldData: any) => {
      //   console.log("### oldData onSuccess: ", oldData);
      //   return oldData.map((user: User) => (user.id === context?.optimisticUser.id ? result : user));
      // });

      // queryClient.invalidateQueries(usersKeys.page(1)); // invalidation하면 refetch를 한다.
    },
    onError: (error, variables, context) => {
      // mutation 실행 실패 후 실행
      // rollback query
      queryClient.setQueryData(usersKeys.page(1), (oldData: any) => context?.previousUsers);
    },
  });
};
