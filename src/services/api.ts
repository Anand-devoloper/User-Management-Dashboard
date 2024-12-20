
import { User } from "../types/User";

let users: User[] = [
  { id: 1, name: "Anand", email: "anand@gmail.com", role: "Admin" },
  { id: 2, name: "Kishore", email: "kishore@gmail.com", role: "User" },
];

export const getUsers = async (): Promise<User[]> => users;

export const addUser = async (user: User): Promise<void> => {
  users.push({ ...user, id: users.length + 1 });
};

export const updateUser = async (id: number, updatedUser: User): Promise<void> => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) users[index] = { ...updatedUser, id };
};

export const deleteUser = async (id: number): Promise<void> => {
  users = users.filter((user) => user.id !== id);
};
