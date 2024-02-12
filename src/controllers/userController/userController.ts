import { ServerResponse, IncomingMessage } from 'http';
import { User } from '../../models/user';
import {
	getUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUserById
} from '../../service/userService';

const sendResponse = (res: ServerResponse, statusCode: number, data: User[] | User | object) => {
	res.writeHead(statusCode, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify(data));
};

export const handleGetUsers = async (req: IncomingMessage, res: ServerResponse) => {
	try {
		const users = await getUsers();
		sendResponse(res, 200, users);
	} catch (error) {
		sendResponse(res, 500, { message: 'Internal Server Error' });
	}
};

export const handleGetUserById = async (
	req: IncomingMessage,
	res: ServerResponse,
	userId: string
) => {
	try {
		const user = await getUserById(userId);
		if (!user) {
			sendResponse(res, 404, { message: 'User not found' });
			return;
		}
		sendResponse(res, 200, user);
	} catch (error) {
		sendResponse(res, 500, { message: 'Internal Server Error' });
	}
};

export const handleCreateUser = async (
	req: IncomingMessage,
	res: ServerResponse,
	userData: User
) => {
	try {
		const newUser = await createUser(userData);
		sendResponse(res, 201, newUser);
	} catch (error) {
		sendResponse(res, 400, { message: 'Bad Request' });
	}
};

export const handleUpdateUser = async (
	req: IncomingMessage,
	res: ServerResponse,
	userId: string,
	userData: User
) => {
	try {
		const updatedUser = await updateUser(userId, userData);
		if (!updatedUser) {
			sendResponse(res, 404, { message: 'User not found' });
			return;
		}
		sendResponse(res, 200, updatedUser);
	} catch (error) {
		sendResponse(res, 400, { message: 'Bad Request' });
	}
};

export const handleDeleteUser = async (
	req: IncomingMessage,
	res: ServerResponse,
	userId: string
) => {
	try {
		const success = await deleteUserById(userId);
		if (!success) {
			sendResponse(res, 404, { message: 'User not found' });
			return;
		}
		sendResponse(res, 204, {});
	} catch (error) {
		sendResponse(res, 400, { message: 'Bad Request' });
	}
};
