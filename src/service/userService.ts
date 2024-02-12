import { User, createUserData } from "../models/user";


let users: User[] = [
  {
    id: '1',
    username: 'Stas',
    age: 36,
    hobbies: []
  },
  {
    id: '2',
    username: 'Alina',
    age: 33,
    hobbies: []
  },

];

export const getUsers = async (): Promise<User[]> => {
  return users;
};

export const getUserById = async (userId: string): Promise<User | undefined> => {
  return users.find(user => user.id === userId);
};

export const createUser = async (userData: User): Promise<User> => {
  const newUser = createUserData(userData.username, userData.age, userData.hobbies);
  users.push(newUser);
  return newUser;
};

export const updateUser = async (userId: string, userData: User): Promise<User | undefined> => {
  const index = users.findIndex(user => user.id === userId);
  if (index === -1) return undefined;
  const updatedUser = { ...userData, id: userId };
  users[index] = updatedUser;
  return updatedUser;
};

export const deleteUserById = async (userId: string): Promise<boolean> => {
  const initialLength = users.length;
  users = users.filter(user => user.id !== userId);
  return users.length !== initialLength;
};
