import axios from "axios";
import { User } from "../types/User";

const API_URL = "http://localhost:3001/users";

export const getUsers = () => axios.get<User[]>(API_URL);

export const createUser = (user: User) =>
  axios.post(API_URL, user);

export const updateUser = (id: number, user: User) =>
  axios.put(`${API_URL}/${id}`, user);

export const deleteUser = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
