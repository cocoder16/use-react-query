import { useGetTodos } from "src/query/todos";

function ToDos() {
  const { isLoading, isError, error, data: todos } = useGetTodos();

  return (
    <div>
      <ul>
        {todos?.map(todo => (
          <li key={todo.id} style={{ textDecoration: todo.done ? "line-through" : "none" }}>
            {todo.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDos;
