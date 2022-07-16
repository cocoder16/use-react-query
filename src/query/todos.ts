import { useQuery } from "react-query";

import { getTodos } from "src/services/todos";

type ToDo = {
  id: number;
  content: string;
  done: boolean;
};

const initialData = [
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
];

export const todosKeys = {
  all: () => ["todos"],
};

export const useGetToDos = () => {
  return useQuery<ToDo[], Error>(
    todosKeys.all(),
    async () => {
      const {
        data: { data },
      } = await getTodos();
      return data;
    },
    {
      initialData,
    },
  );
};
