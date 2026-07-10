# Project & Chat APIs Documentation

## Architecture & Security Overview
The Project and Chat modules use a heavily validated and secure architecture.
- **Authorization**: All endpoints in this module are protected by the JWT `authMiddleware`. Requests missing a valid `Authorization: Bearer <token>` header will receive a `401 Unauthorized` response.
- **Resource Ownership**: The Service layer strictly enforces that a user can only perform actions (Read, Update, Delete) on Projects they own. Accessing a project owned by another user throws a `403 Forbidden` error.

---

## MongoDB Collections Schema

### Project Collection
- `title` (String, required)
- `domain` (String, required)
- `description` (String, required) - Maps to "idea"
- `level` (String) - Enum: Beginner, Intermediate, Advanced
- `team` (String) - e.g., "Individual", "2 Members"
- `status` (String) - Enum: Planning, In Progress, Completed
- `owner` (ObjectId) - Reference to User collection
- **AI Extensions**: `idea`, `requirements`, `preferredTech`, `projectType`, `expectedDuration`, `additionalRequirements`

### Chat Collection
- `projectId` (ObjectId) - Reference to Project
- `userId` (ObjectId) - Reference to User
- `sender` (String) - Enum: 'user', 'ai'
- `message` (String, required)
- `timestamp` (Date) - Defaults to `Date.now`

---

## 1. Project Endpoints

### Create Project
- **Method**: `POST`
- **URL**: `/api/v1/projects`
- **Payload Example**:
  ```json
  {
    "title": "Smart Attendance System",
    "domain": "Artificial Intelligence",
    "level": "Intermediate",
    "team": "Individual",
    "description": "Face recognition attendance system"
  }
  ```
- **Response**: `201 Created` with project object.

### Get All User Projects
- **Method**: `GET`
- **URL**: `/api/v1/projects`
- **Response**: `200 OK` with array of projects owned by the user.

### Get Specific Project
- **Method**: `GET`
- **URL**: `/api/v1/projects/:id`
- **Response**: `200 OK` with project object.

### Update Project
- **Method**: `PUT`
- **URL**: `/api/v1/projects/:id`
- **Payload Example**:
  ```json
  {
    "status": "In Progress"
  }
  ```
- **Response**: `200 OK` with updated project object.

### Delete Project
- **Method**: `DELETE`
- **URL**: `/api/v1/projects/:id`
- **Response**: `200 OK` with success message.

---

## 2. Chat Endpoints

### Post Message
- **Method**: `POST`
- **URL**: `/api/v1/chat/:projectId`
- **Payload Example**:
  ```json
  {
    "message": "Generate a database schema for my project.",
    "sender": "user"
  }
  ```
- **Response**: `201 Created` with chat message object.

### Get Chat History
- **Method**: `GET`
- **URL**: `/api/v1/chat/:projectId`
- **Response**: `200 OK` with array of chat history objects for the project.

### Clear Chat History
- **Method**: `DELETE`
- **URL**: `/api/v1/chat/:projectId`
- **Response**: `200 OK` with success message.

---

## Frontend Integration Guide
Currently, the React frontend relies heavily on `localStorage` to manage project state. To connect to this backend:

1. **`pages/NewProject.jsx`**: Replace `localStorage.setItem` inside `handleGenerate()` with an Axios/Fetch `POST` request to `/api/v1/projects`, including the JWT in the headers.
2. **`pages/Dashboard.jsx`**: Replace reading `localStorage.getItem("projects")` inside the `useEffect` with a `GET` request to `/api/v1/projects`.
3. **`pages/ProjectDashboard.jsx` & `Requirements.jsx`**: Read the `currentProject` by executing a `GET` to `/api/v1/projects/:id`.

**Mismatches Handled**:
The backend schema has been deliberately crafted to consume and return `domain`, `description`, `team`, and `level` so that the frontend requires virtually zero structural alterations to its React components.
