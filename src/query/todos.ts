import { useQuery } from "react-query";

import { getTodos } from "src/services/todos";

export const todosKeys = {
  all: () => ["todos"],
};

export const initialData = {
  all: [
    {
      id: 0,
      content: "js",
      done: true,
    },
    {
      id: 1,
      content: "css",
      done: false,
    },
  ],
};

export const useGetTodos = () => {
  return useQuery<ToDo[], Error>(
    todosKeys.all(),
    async () => {
      const {
        data: { data },
      } = await getTodos();
      return data;
    },
    {
      initialData: initialData.all,
    },
  );
};
