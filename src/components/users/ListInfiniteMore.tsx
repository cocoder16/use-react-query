import { useGetInfiniteUsers } from "src/query/users";

function ListInfiniteMore() {
  const { isLoading, isError, error, data: users, hasNextPage, fetchNextPage } = useGetInfiniteUsers();

  const loadMore = () => {
    console.log("hasNextPage: ", hasNextPage);
    if (hasNextPage) {
      fetchNextPage();
    }
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <ul>{users?.pages?.map(page => page?.data?.map(user => <li key={user.id}>{user.email}</li>))}</ul>
      <button onClick={loadMore}>&#62;</button>
    </div>
  );
}

export default ListInfiniteMore;
