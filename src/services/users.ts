import axios from "axios";

export const getUsers = (page: number) => axios.get(`https://reqres.in/api/users?page=${page}`);

export const getUser = (id: number) => axios.get(`https://reqres.in/api/users/${id}`);
