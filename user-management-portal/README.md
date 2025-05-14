# User Management Portal (Frontend)

This is the frontend for the User Management System, built with React and TypeScript. It allows users to view and add user records. The frontend communicates with a Node.js/Express backend and uses MongoDB for data persistence. The entire stack is Dockerized for easy deployment.

## Features
- View a list of users in a responsive table
- Add new users with validation
- Toast notifications for success and error events
- Modern UI using Material-UI (MUI)
- Fully Dockerized for production


## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Local Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

> **Note:** For local development, ensure the backend is running at [http://localhost:3001](http://localhost:3001) or update the API base URL in `src/api/user-api.ts` as needed.

### Running with Docker

The frontend is set up to run in Docker and is orchestrated via `docker-compose` at the project root. To build and run the entire stack (frontend, backend, MongoDB):

```bash
docker-compose up --build
```

The frontend will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure
- `src/components/` - React components (forms, tables, etc.)
- `src/api/` - API utility functions
- `src/styles.scss` - Global styles

## Environment Variables
- API base URL can be configured in `src/api/user-api.ts` for local or Dockerized environments.

## Learn More
- [Material-UI Documentation](https://mui.com/)
- [React Documentation](https://reactjs.org/)
