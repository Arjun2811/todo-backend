# To-Do App – Backend (Node.js + Express)

This is the backend of a full-stack To-Do List application built using Node.js, Express.js, and MongoDB. It powers a React.js frontend and is deployed on Render.

---

## Backend API
[Deployed Backend on Render](https://todo-backend-c53w.onrender.com/api)

---

## Features

- Register new users with secure password hashing
- Login with email & password validation
- Save user-specific tasks
- View all tasks (filtered by userId)
- Delete tasks
- RESTful API structure
- Connected to MongoDB Atlas for data storage
- Supports CORS requests from frontend (Vercel)

---

## Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- bcryptjs
- dotenv
- Render (deployment)

---

---

## API Endpoints

| Method | Endpoint               | Description                 |
|--------|------------------------|-----------------------------|
| GET    | `/api/tasks`           | Get tasks by `userId` query |
| POST   | `/api/register`        | Register a new user         |
| POST   | `/api/login`           | Log in an existing user     |
| POST   | `/api/tasks`           | Add a new task              |
| DELETE | `/api/tasks/:id`       | Delete a task by ID         |

---

##  How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/Arjun2811/todo-backend.git
cd todo-backend

## 2. Install Dependencies
npm install

## 3. Start the server

npm run dev

## 4.Then visit:

http://localhost:5050/api/ping
