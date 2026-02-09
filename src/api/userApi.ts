import axios from "axios";
import { User } from "../types/User";

const API_URL = "https://67e3e1e42ae442db76d2035d.mockapi.io/register/user";

export const getUsers = () => axios.get<User[]>(API_URL);

export const createUser = (user: User) =>
  axios.post(API_URL, user);

export const updateUser = (id: number, user: User) =>
  axios.put(`${API_URL}/${id}`, user);

export const deleteUser = (id: number) =>
  axios.delete(`${API_URL}/${id}`);
