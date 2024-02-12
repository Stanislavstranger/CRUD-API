import 'dotenv/config';
import 'colors';
import { createServer } from 'http';
import { parse } from 'url';
import {
	handleCreateUser,
	handleDeleteUser,
	handleGetUserById,
	handleGetUsers,
	handleUpdateUser
} from './src/controllers/userController/userController';

const server = createServer((req, res) => {
	const url = parse(req.url as string, true);
	const { pathname, query } = url;

	if (pathname === '/api/users' && req.method === 'GET') {
		handleGetUsers(req, res);
	} else if (pathname === '/api/users' && req.method === 'POST') {
		let data = '';
		req.on('data', (chunk) => {
			data += chunk;
		});
		req.on('end', () => {
			try {
				const userData = JSON.parse(data);
				handleCreateUser(req, res, userData);
			} catch (error) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'Bad Request' }));
			}
		});
	} else if (pathname === '/api/users' && req.method === 'PUT') {
		let data = '';
		req.on('data', (chunk) => {
			data += chunk;
		});
		req.on('end', () => {
			try {
				const userData = JSON.parse(data);
				handleUpdateUser(req, res, query.userId as string, userData);
			} catch (error) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'Bad Request' }));
			}
		});
	} else if (pathname === '/api/users' && req.method === 'DELETE') {
		handleDeleteUser(req, res, query.userId as string);
		// eslint-disable-next-line no-dupe-else-if
	} else if (pathname === '/api/users' && req.method === 'GET' && query.userId) {
		handleGetUserById(req, res, query.userId as string);
	} else {
		res.writeHead(404, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify({ message: 'Not found' }));
	}
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.blue.inverse);
});
