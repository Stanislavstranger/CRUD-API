import { ServerResponse, IncomingMessage } from 'http';
import { getUsers } from '../../service/userService';

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
