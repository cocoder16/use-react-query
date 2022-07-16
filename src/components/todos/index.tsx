import { useGetToDos } from "src/query/todos";

function ToDos() {
  const { isLoading, isError, error, data: todos } = useGetToDos();

  return (
    <ul>
      {todos?.map(todo => (
        <li key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
          {todo.content}
        </li>
      ))}
    </ul>
  );
}

export default ToDos;
