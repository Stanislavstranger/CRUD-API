import 'dotenv/config';
import 'colors';
import { createServer } from 'http';
import { parse } from 'url';
import {
	handleCreateUser,
	handleGetUserById,
	handleGetUsers
} from './src/controllers/userController/userController';

const server = createServer((req, res) => {
	const url = parse(req.url as string, true);
	const { pathname, query } = url;
	console.log(url);

	if (pathname === '/api/users' && req.method === 'GET') {
		handleGetUsers(req, res);
	} else if (pathname === '/api/users' && req.method === 'POST') {
		let data = '';
		req.on('data', (chunk) => {
			data += chunk;
		});
		req.on('end', () => {
			const userData = JSON.parse(data);
			handleCreateUser(req, res, userData);
		});
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
