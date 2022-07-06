import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { useGetUsersByPage, usersKeys } from "src/query/users";

function ListPage() {
  const [page, setPage] = useState<number>(1);
  const { isLoading, isError, error, data: users } = useGetUsersByPage(page); // error관리포인트
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("users: ", queryClient.getQueryData(usersKeys.all()));
    console.log("users, 0: ", queryClient.getQueryData(usersKeys.one(0))); // 없는 키, 0이 키 자체지 인덱스를 의미하진 않음
  }, [queryClient, users]);

  const goPreviousPage = () => {
    setPage(page - 1);
  };

  const goNextPage = () => {
    setPage(page + 1);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <ul>
        {users?.map(user => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
      {page > 1 && <button onClick={goPreviousPage}>&#60;</button>}
      {page}
      {page < 2 && <button onClick={goNextPage}>&#62;</button>}
    </div>
  );
}

export default ListPage;
