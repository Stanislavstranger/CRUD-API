import 'dotenv/config';
import 'colors';
import { createServer } from 'http';
import { parse } from 'url';

const server = createServer((req, res) => {
	const url = parse(req.url as string, true);
	const { pathname, query } = url;
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.blue
  .inverse);
});
