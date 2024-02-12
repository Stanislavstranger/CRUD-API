import { ServerResponse, IncomingMessage } from 'http';
import { getUsers, getUserById, createUser as createNewUser } from '../../service/userService';
import { User } from '../../models/user';

const sendResponse = (res: ServerResponse, statusCode: number, data: any) => {
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
		const newUser = await createNewUser(userData);
		sendResponse(res, 201, newUser);
	} catch (error) {
		sendResponse(res, 404, { message: 'Bad Request' });
	}
};
