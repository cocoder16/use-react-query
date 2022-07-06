import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { usersKeys, useGetUser } from "src/query/users";

function User() {
  const [userId, setUserId] = useState<number>(1);
  const { isLoading, isError, data: user, error } = useGetUser(userId);
  const queryClient = useQueryClient();

  useEffect(() => {
    console.log("users: ", queryClient.getQueryData(usersKeys.all()));
    console.log("users, 1: ", queryClient.getQueryData(usersKeys.one(1)));
    console.log("users, 2: ", queryClient.getQueryData(usersKeys.one(2)));
  }, [queryClient, user]);

  const fetchFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
  };

  return (
    <div>
      <select onChange={fetchFilter}>
        <option value="1" defaultChecked>
          1
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <div>{user?.email}</div>
    </div>
  );
}

export default User;
