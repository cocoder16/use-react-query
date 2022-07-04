import { useEffect } from "react";
import { useQueryClient } from "react-query";

import { useGetUsers } from "src/services/users";

function List() {
  const { isLoading, isError, data: users, error } = useGetUsers(); // error관리포인트
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("users: ", queryClient.getQueryData(["users"]));
    console.log("users, 0: ", queryClient.getQueryData(["users", 0])); // 없는 키, 0이 키 자체지 인덱스를 의미하진 않음
  }, [queryClient, users]);

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
    </div>
  );
}

export default List;
