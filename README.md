# CRUD API Application

## Installation

### Clone the repository:

```bash
git clone https://github.com/Stanislavstranger/CRUD-API.git
```

### Navigate to the project directory:

```bash
cd CRUD-API
```

### Install dependencies:

```bash
npm install
```

## Running the Application

### Development Mode:

#### Start the application in development mode using ts-node-dev:

```bash
npm run start:dev
```

### Production Mode:

#### Build the application and then run it in production mode:

```bash
npm run start:prod
```

## Running the Application

### Once the application is running, you can use the following endpoints:

  - `GET /api/users` - get all users
  - `GET /api/users/{userId}` - get the user by id (ex. “/users/123”)
  - `POST /api/users` - create a new user
  - `PUT /api/users/{userId}` - update user by id (ex. “/users/123”)
  - `DELETE /api/users/{userId}` - delete user by id (ex. “/users/123”)

### Example of work:

![bandicam 2024-02-13 01-04-12-046](https://github.com/Stanislavstranger/CRUD-API/assets/119806888/1dd6ef20-aff9-4a29-a5fd-4654793dcc00)

## Testing the API

### You can test the API using tools like Postman or by automated tests.

## Horizontal Scaling

### To start multiple instances of the application with a load balancer:

```bash
npm run start:multi
```

This command will start multiple instances of the application using the Node.js Cluster API, with a load balancer that distributes requests across them.
