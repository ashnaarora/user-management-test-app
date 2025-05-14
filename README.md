# User Management System

A full-stack user management web application featuring:
- **Frontend:** React + TypeScript (user-management-portal)
- **Backend:** Node.js/Express (services/user-ms)
- **Database:** MongoDB
- **Dockerized** for easy local development and deployment

## Features
- View and add users
- Responsive UI with Material-UI
- API validation and error handling
- Toast notifications for user actions
- Unit and integration tests for backend

## Project Structure
```
├── user-management-portal/   # React frontend
├── services/
│   └── user-ms/              # Express backend
├── docker-compose.yml        # Orchestrates frontend, backend, and MongoDB
└── README.md                 # Project documentation
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

### Local Development (without Docker)

#### 1. Start MongoDB
You need a running MongoDB instance. You can use Docker:
```bash
docker run -d -p 27017:27017 --name user-mongo mongo
```

#### 2. Start Backend
```bash
cd services/user-ms
npm install
npm start
```
Backend runs on [http://localhost:3001](http://localhost:3001)

#### 3. Start Frontend
```bash
cd user-management-portal
npm install
npm start
```
Frontend runs on [http://localhost:3000](http://localhost:3000)

### Running with Docker Compose
To run the entire stack (frontend, backend, MongoDB) in Docker:
```bash
docker-compose up --build
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:3001](http://localhost:3001)
- MongoDB: [mongodb://mongo:27017](mongodb://mongo:27017)

## API Endpoints
- `GET /api/users` - List all users
- `POST /api/users` - Add a new user

## Testing

### Backend
```bash
cd services/user-ms
npm test
```

### Frontend
```bash
cd user-management-portal
npm test
```

## Environment Variables
- Backend: `MONGO_URI` (can be set in Docker Compose or as an env var)
- Frontend: API base URL can be set in `src/api/user-api.ts`