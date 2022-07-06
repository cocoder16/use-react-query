import ListPage from "src/components/users/ListPage";
import ListInfiniteMore from "src/components/users/ListInfiniteMore";
import User from "src/components/users/User";

function Users() {
  return (
    <div>
      <ListPage />
      <ListInfiniteMore />
      <User />
    </div>
  );
}

export default Users;
