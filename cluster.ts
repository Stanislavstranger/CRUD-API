import 'dotenv/config';
import 'colors';
import http from 'http';
import { parse } from 'url';
import os from 'os';
import cluster from 'cluster';
import {
	handleGetUsers,
	handleGetUserById,
	handleCreateUser,
	handleUpdateUser,
	handleDeleteUser,
	sendResponse
} from './src/controllers/userController/userController';

if (cluster.isMaster) {
	const cpuCount = os.cpus().length;
	for (let i = 0; i < cpuCount; i += 1) {
		cluster.fork();
	}

	cluster.on('exit', (worker) => {
		console.log(`Worker ${worker.id} has exited`.blue.inverse);
		cluster.fork();
	});
} else {
	if (cluster.worker) {
		const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
			const reqUrl = parse(req.url || '', true);
			const userId = reqUrl.pathname?.split('/')[3];

			if (req.method === 'GET' && reqUrl.pathname === '/api/users') {
				handleGetUsers(req, res);
				return;
			}

			if (req.method === 'GET' && reqUrl.pathname?.startsWith('/api/users/')) {
				handleGetUserById(req, res, userId || '');
				return;
			}

			if (req.method === 'POST' && reqUrl.pathname === '/api/users') {
				let body = '';
				req.on('data', (chunk) => {
					body += chunk.toString();
				});
				req.on('end', () => {
					try {
						handleCreateUser(req, res, JSON.parse(body));
					} catch (error) {
						sendResponse(res, 400, { message: 'Invalid JSON format' });
						return;
					}
				});
				return;
			}

			if (req.method === 'PUT' && reqUrl.pathname?.startsWith('/api/users/')) {
				let body = '';
				req.on('data', (chunk) => {
					body += chunk.toString();
				});
				req.on('end', () => {
					try {
						handleUpdateUser(req, res, userId || '', JSON.parse(body));
					} catch (error) {
						sendResponse(res, 400, { message: 'Invalid JSON format' });
						return;
					}
				});
				return;
			}

			if (req.method === 'DELETE' && reqUrl.pathname?.startsWith('/api/users/')) {
				handleDeleteUser(req, res, userId || '');
				return;
			}

			sendResponse(res, 404, { message: 'Enter the correct path' });
		});

		const PORT = parseInt(process.env.PORT || '5000') + cluster.worker.id;

		server.listen(PORT, () => {
			console.log(`Worker ${cluster.worker!.id} running on port ${PORT}`.blue.inverse);
		});
	}
}
