# TaskFlow – Full Stack Task Management Dashboard

TaskFlow is a full-stack task management web application inspired by platforms like Jira, Trello, and Asana.

It allows users to create, manage, track, and organize tasks through a clean and modern dashboard, while also providing an Admin Panel to manage users and monitor all tasks in the system.

---

## Features

### User Features
- User Registration & Login
- Protected Dashboard
- Create / Edit / Delete Tasks
- Search Tasks
- Filter by Status & Priority
- Task Statistics
- Due Date Tracking
- Analytics Dashboard
- Toast Notifications
- Confirmation Modals

### Admin Features
- Admin-only Protected Routes
- Admin Dashboard
- View All Users
- View All Tasks
- System Statistics
- Change User Role
- Delete Users
- Prevent Admin Self Delete

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- Role-based Authorization

---

## Project Structure

```bash
backend/
frontend/
README.md
```

---

## API Endpoints

### User Routes
- `POST /api/v1/users/register`
- `POST /api/v1/users/login`
- `GET /api/v1/users/current-user`

### Task Routes
- `POST /api/v1/tasks`
- `GET /api/v1/tasks`
- `GET /api/v1/tasks/:id`
- `PUT /api/v1/tasks/:id`
- `DELETE /api/v1/tasks/:id`
- `GET /api/v1/tasks/stats`

### Admin Routes
- `GET /api/v1/admin/stats`
- `GET /api/v1/admin/users`
- `GET /api/v1/admin/tasks`
- `PATCH /api/v1/admin/users/:id/role`
- `DELETE /api/v1/admin/users/:id`

---

## Learning Outcomes

This project helped me improve in:

- Full Stack Development
- REST API Design
- Authentication & Authorization
- Protected Routing
- MongoDB Schema Design
- Tailwind Dashboard UI
- Role-based Access Control
- Admin Panel Development

---

## Future Improvements

- Drag & Drop Kanban Board
- Team Collaboration
- Task Comments
- Notifications
- Dark Mode
- Profile Settings
- Forgot Password
- Production Deployment



## Run Locally

### 1. Clone the repository
```bash
git clone <your-repo-link>
```

### 2. Go to project folder
```bash
cd TaskFlow
```

### 3. Install dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

### 4. Setup environment variables

Create a `.env` file inside backend:

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY=1d
CORS_ORIGIN=http://localhost:5173
```

### 5. Start backend
```bash
npm run dev
```

### 6. Start frontend
```bash
npm run dev
```

### 7. Open app
```bash
http://localhost:5173
```