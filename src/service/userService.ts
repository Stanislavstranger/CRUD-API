import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user';

let users: User[] = [];

export const getUsers = async (): Promise<User[]> => {
	return users;
};

export const getUserById = async (userId: string): Promise<User | undefined> => {
	return users.find((user) => user.id === userId);
};

export const createUser = async (userData: User): Promise<User> => {
	const newUser = { ...userData, id: uuidv4() };
	users.push(newUser);
	return newUser;
};

export const updateUser = async (userId: string, userData: User): Promise<User | undefined> => {
	const index = users.findIndex((user) => user.id === userId);
	if (index === -1) return undefined;
	const updatedUser = { ...userData, id: userId };
	users[index] = updatedUser;
	return updatedUser;
};

export const deleteUserById = async (userId: string): Promise<boolean> => {
	const initialLength = users.length;
	users = users.filter((user) => user.id !== userId);
	return users.length !== initialLength;
};
