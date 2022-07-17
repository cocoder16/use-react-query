import axios from "axios";

export const getTodos = () =>
  axios({
    method: "get",
    url: `http://localhost:3000/api/todos`,
  });
