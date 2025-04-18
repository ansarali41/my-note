# My Notes App

A full-stack note-taking application with a React frontend and Node.js backend.

## Project Structure

```
.
├── backend/            # Node.js Express backend
│   ├── src/            # Backend source code
│   │   ├── app.js      # Express app setup
│   │   ├── config/     # Configuration files
│   │   ├── controllers/# API controllers
│   │   ├── middleware/ # Express middleware
│   │   ├── models/     # Database models
│   │   └── routes/     # API routes
│   ├── package.json    # Backend dependencies
│   └── server.js       # Server entry point
│
└── frontend/           # React frontend (Vite)
    ├── src/            # Frontend source code
    │   ├── components/ # React components
    │   ├── assets/     # Static assets
    │   ├── App.jsx     # Main React component
    │   └── main.jsx    # Frontend entry point
    ├── package.json    # Frontend dependencies
    └── index.html      # HTML entry point
```

## Prerequisites

-   Node.js (v14 or later)
-   npm or yarn

## Getting Started

### Backend Setup

1. Navigate to the backend directory:

    ```
    cd backend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start the development server:
    ```
    npm start
    ```

The backend server will run on http://localhost:3000 by default.

### Frontend Setup

1. Navigate to the frontend directory:

    ```
    cd frontend
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start the development server:
    ```
    npm run dev
    ```

The frontend development server will run on http://localhost:5173 by default.

## Features

-   Create, read, update, and delete notes
-   User authentication
-   Responsive design

## Technologies

### Backend

-   Node.js
-   Express.js
-   SQLite database

### Frontend

-   React
-   Vite
-   CSS

## Git Setup

The project includes a .gitignore file that excludes:

-   Node modules
-   Environment variables
-   Log files
-   Build directories
-   Database files

## License

[MIT](https://choosealicense.com/licenses/mit/)
