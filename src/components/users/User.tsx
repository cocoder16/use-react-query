import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";

import { useGetUserById } from "src/services/users";

function User() {
  const [userId, setUserId] = useState<number>(1);
  const { isLoading, isError, data: user, error } = useGetUserById(userId);
  const queryClient = useQueryClient();

  const fetchFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(Number(value));
  };

  useEffect(() => {
    console.log("users: ", queryClient.getQueryData(["users"]));
    console.log("users, 1: ", queryClient.getQueryData(["users", 1]));
    console.log("users, 2: ", queryClient.getQueryData(["users", 2]));
  }, [queryClient, user]);

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
