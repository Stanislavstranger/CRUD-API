import 'dotenv/config';
import 'colors';
import http from 'http';
import { parse } from 'url';
import { validate as isUuid } from 'uuid';
import { v4 as uuidv4 } from 'uuid';
import users from './src/data/users';
import { User } from './src/models/user';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
	const reqUrl = parse(req.url || '', true);
	const userId = reqUrl.pathname?.split('/')[3];

	if (req.method === 'GET' && reqUrl.pathname === '/api/users') {
		res.writeHead(200, { 'Content-Type': 'application/json' });
		res.end(JSON.stringify(users));
		return;
	}

	if (req.method === 'GET' && reqUrl.pathname?.startsWith('/api/users/')) {
		if (!isUuid(userId || '')) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Invalid userId' }));
			return;
		}

		const user = users.find((user) => user.id === userId);

		if (user) {
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(user));
		} else {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User not found' }));
		}
		return;
	}

	if (req.method === 'POST' && reqUrl.pathname === '/api/users') {
		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const user: Partial<User> = JSON.parse(body);
			if (!user.username || !user.age || !user.hobbies) {
				res.writeHead(400, { 'Content-Type': 'application/json' });
				res.end(JSON.stringify({ message: 'Request body does not contain required fields' }));
				return;
			}
			const newUser: User = {
				id: uuidv4(),
				username: user.username,
				age: user.age,
				hobbies: user.hobbies
			};
			users.push(newUser);
			res.writeHead(201, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(newUser));
		});
		return;
	}

	if (req.method === 'PUT' && reqUrl.pathname?.startsWith('/api/users/')) {
		if (!isUuid(userId || '')) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Invalid userId' }));
			return;
		}

		const userIndex = users.findIndex((user) => user.id === userId);

		if (userIndex === -1) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User not found' }));
			return;
		}

		let body = '';
		req.on('data', (chunk) => {
			body += chunk.toString();
		});
		req.on('end', () => {
			const updatedUser: Partial<User> = JSON.parse(body);
			users[userIndex] = { ...users[userIndex], ...updatedUser };
			res.writeHead(200, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify(users[userIndex]));
		});
		return;
	}

	if (req.method === 'DELETE' && reqUrl.pathname?.startsWith('/api/users/')) {
		if (!isUuid(userId || '')) {
			res.writeHead(400, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'Invalid userId' }));
			return;
		}

		const userIndex = users.findIndex((user) => user.id === userId);

		if (userIndex === -1) {
			res.writeHead(404, { 'Content-Type': 'application/json' });
			res.end(JSON.stringify({ message: 'User not found' }));
			return;
		}

		users.splice(userIndex, 1);
		res.writeHead(204);
		res.end();
		return;
	}

	res.writeHead(404, { 'Content-Type': 'application/json' });
	res.end(JSON.stringify({ message: 'Not found' }));
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.blue.inverse);
});
