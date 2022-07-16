import axios from "axios";

export const getTodos = () => axios.get(`http://localhost:3000/api/todos`);
