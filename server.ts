import 'dotenv/config';
import 'colors';
import { createServer } from 'http';
import { parse } from 'url';
import { deleteUserById, getUsers } from './src/service/userService';

const server = createServer((req, res) => {
	const url = parse(req.url as string, true);
	const { pathname, query } = url;
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.blue
		.inverse);
});

console.log(getUsers());
console.log(deleteUserById('2'));
console.log(getUsers());