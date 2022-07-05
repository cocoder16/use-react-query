import axios from "axios";

export const getUsers = () => axios.get("https://reqres.in/api/users?page=2");

export const getUserById = (id: number) => axios.get(`https://reqres.in/api/users/${id}`);
