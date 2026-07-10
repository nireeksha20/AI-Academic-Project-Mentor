# Table of Contents
1. [Executive Summary](#executive-summary)
2. [Project Overview](#project-overview)
3. [Folder Structure](#folder-structure)
4. [Architecture](#architecture)
5. [Frontend](#frontend)
6. [Backend](#backend)
7. [AI System](#ai-system)
8. [Database](#database)
9. [Authentication](#authentication)
10. [APIs](#apis)
11. [Data Flow](#data-flow)
12. [Folder Responsibilities](#folder-responsibilities)
13. [Component Responsibilities](#component-responsibilities)
14. [Workflows](#workflows)
15. [Technology Stack](#technology-stack)
16. [Security](#security)
17. [Scalability](#scalability)
18. [Missing Features](#missing-features)
19. [Future Improvements](#future-improvements)
20. [Development Guidelines](#development-guidelines)
21. [Coding Standards](#coding-standards)
22. [Installation Guide](#installation-guide)
23. [Environment Setup](#environment-setup)
24. [Running the Project](#running-the-project)
25. [Contribution Workflow](#contribution-workflow)
26. [Git Branch Strategy](#git-branch-strategy)
27. [Deployment](#deployment)
28. [Known Issues](#known-issues)
29. [Conclusion](#conclusion)

---

# Executive Summary
**AI Academic Project Mentor** is a visionary platform designed to guide students in converting rough project ideas into well-structured software blueprints. It serves as an academic mentor throughout the project lifecycle. Currently, the project represents **Milestone 1**, featuring a fully functional frontend that mocks backend and AI workflows using local storage, setting the stage for future integration with a multi-agent AI pipeline and a Node.js/MongoDB backend.

---

# Project Overview
1. **Project Purpose**: To transform student project ideas into structured software blueprints and provide continuous academic mentoring.
2. **Project Vision**: To become the definitive AI-powered platform for academic software project planning, acting as an automated mentor that guides students from idea conception to deployment.
3. **Business Problem**: Students often have innovative ideas but lack the architectural and planning knowledge to execute them effectively.
4. **Target Users**: University students, academic teams, and software development learners.
5. **Core Features**: 
   - *Implemented*: User Profile & Skill Assessment, Project Idea Submission, Mocked Blueprint Generation, Dashboard Tracking.
   - *Planned*: Actual AI Pipeline (CrewAI, Ollama), Document Generation, Faculty Dashboard, Backend API execution.
6. **System Modules**: 
   - Frontend (React SPA)
   - Backend (Node/Express - Planned)
   - Database (MongoDB - Planned)
   - AI Pipeline (CrewAI/Ollama - Planned)

---

# Folder Structure
```text
AI-Academic-Project-Mentor/
│
├── frontend/                 # Frontend React Application
│   ├── public/               # Static assets
│   ├── src/                  # React source code
│   │   ├── components/       # Reusable UI elements (auth, common, dashboard, landing, project)
│   │   ├── context/          # React Context (AuthContext)
│   │   ├── layouts/          # Page wrappers (DashboardLayout, MainLayout)
│   │   ├── pages/            # View components (Dashboard, Login, NewProject, etc.)
│   │   ├── routes/           # Routing configuration (AppRoutes, ProtectedRoute)
│   │   ├── services/         # API integration logic
│   │   ├── styles/           # CSS modules/files
│   │   ├── utils/            # Helper functions, constants, validators
│   │   ├── App.jsx           # Root application component
│   │   ├── main.jsx          # Entry point
│   │   └── index.css         # Global Tailwind styles
│   ├── package.json          # Frontend dependencies
│   └── vite.config.js        # Vite bundler config
│
├── backend/                  # Backend Node.js Server (Planned/Stubs)
│   ├── config/               # DB and environment configuration
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Express middlewares (auth, error handling)
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   └── services/             # Business logic layer
│
├── ai/                       # AI Pipeline & Multi-Agent System (Planned/Stubs)
│   ├── agents/               # CrewAI Agent definitions
│   ├── prompts/              # System & User LLM prompts
│   └── workflows/            # Pipeline execution flows
│
├── database/                 # Database structure (Planned/Stubs)
│   └── schemas/              # Mock schemas or migrations
│
├── assets/                   # Global media assets
├── diagrams/                 # Architecture and workflow diagrams
├── docs/                     # Project documentation
└── resources/                # External learning and reference resources
```

---

# Architecture
The overall architecture follows a standard **MERN + AI** stack.
Currently, the system is executing in a **Frontend-Only Mock State** where the React frontend relies entirely on browser `localStorage` for state persistence and mocked AI generation. 

**Target Architecture:**
```
[React Vite Frontend] <---> [Express Node Backend] <---> [MongoDB]
                                      |
                                      v
                                [AI Engine (CrewAI/Ollama)]
```

---

# Frontend
The frontend is built using **React** and **Vite**. Styling is handled by **Tailwind CSS**. It uses `react-router-dom` for navigation and `lucide-react` for iconography.
- **State Management**: Handled via React Hooks (`useState`, `useEffect`) and browser `localStorage` to mock backend persistence. `AuthContext.jsx` exists as a stub for future centralized auth state.
- **Routing**: `AppRoutes.jsx` defines endpoints like `/`, `/login`, `/dashboard`, `/new-project`, etc. `ProtectedRoute.jsx` acts as a guard.

---

# Backend
*(Status: Partially Implemented / Stubbed)*
The `backend` directory contains standard Express.js folder structures (`controllers`, `routes`, `models`, `services`, `middleware`), but all folders currently only contain a `.gitkeep` file. 
**Future Workflow**: The backend will manage User profiles, Projects, and interface with the AI module to request generation tasks.

---

# AI System
*(Status: Planned)*
The AI directory is structured to hold `agents`, `prompts`, and `workflows`. Currently, they contain `.gitkeep`.
**Planned Pipeline**:
1. **Idea Analyzer**: Evaluates clarity.
2. **Feasibility Analysis Agent**: Checks technical limits.
3. **Scope Definition Agent**: Bounds the project.
4. **Technology Recommendation Agent**: Selects the tech stack.
5. **Milestone & Timeline Planning Agent**: Creates roadmap.
6. **Blueprint Assembly Engine**: Compiles the final document.
7. **Academic Mentor**: Interacts with the user.

---

# Database
*(Status: Planned)*
MongoDB will be used. Currently, the application uses `localStorage` for:
- `profile`: Stores user demographic and technical skills.
- `projects`: Array of user-created project objects.
- `currentProject`: The project currently being viewed or generated.

**Future Collections & Relationships**:
- **Users**: (Primary Key: `_id`, Fields: `name`, `email`, `password`, `skills`, `role`).
- **Projects**: (Primary Key: `_id`, References: `ownerId` -> `Users._id`, Fields: `title`, `domain`, `description`, `status`).

---

# Authentication
**Current Implementation**:
- **Registration**: Captures data in `RegisterForm.jsx` and saves to `localStorage('profile')`.
- **Login**: `LoginForm.jsx` validates input email against `localStorage('profile').email` (Passwords are mocked). It sets `localStorage('isLoggedIn') = "true"`.
- **Flow**: User -> Login Form -> LocalStorage Validation -> Dashboard.

**Future Implementation**:
- JWT-based authentication via the Node.js backend. `authService.js` and `api.js` are stubbed in the frontend for future axios integration.

---

# APIs
*(Status: Discovered - Planned, currently mocked in UI)*
No actual HTTP APIs are functioning currently. The planned endpoints correspond to the stubbed frontend services (`authService.js`, `projectService.js`):
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/projects` (Create project & trigger AI)
- `GET /api/projects` (Fetch user projects)
- `GET /api/projects/:id/requirements` (Fetch generated blueprint)

---

# Data Flow
**Current Mocked Data Flow**:
1. **User input** in forms (`NewProject.jsx`, `LoginForm.jsx`).
2. Component handles `onChange` and updates local React state.
3. On Submit, the component writes/reads a serialized JSON string to `localStorage`.
4. Subsequent pages (`Dashboard.jsx`, `Requirements.jsx`) use `useEffect` to read `localStorage` and hydrate their initial state.

---

# Folder Responsibilities
- **`frontend/src/pages`**: Top-level route components representing complete screen views.
- **`frontend/src/components`**: Smaller, reusable building blocks (e.g., `LoginForm`, `StatCard`).
- **`backend/controllers`**: (Planned) Handles HTTP request/response logic.
- **`backend/services`**: (Planned) Core business logic, calling DB models or AI tools.
- **`ai/agents`**: (Planned) Configuration and prompts for individual CrewAI actors.

---

# Component Responsibilities
- **`AppRoutes.jsx`**: The central router orchestrating screen rendering based on URL.
- **`Dashboard.jsx`**: Displays a summary of projects, stats, and a sidebar. Reads user context from localStorage.
- **`NewProject.jsx`**: Form to submit a project idea. Simulates an AI generation delay using `setTimeout`.
- **`Requirements.jsx`**: Displays the mock "Blueprint" with hardcoded functional requirements, architecture, and DB collections depending on the submitted project.
- **`ProjectDashboard.jsx`**: Shows project progress, roadmaps, milestones, and mocked AI suggestions.

---

# Workflows

## 1. Authentication Workflow
**User opens website** -> Clicks "Login" -> Enters credentials -> `LoginForm.jsx` checks `localStorage('profile')` -> Sets `isLoggedIn = true` -> Redirects to Dashboard.

## 2. Project Creation & AI Pipeline Workflow
**Dashboard** -> Clicks "New Project" -> Fills `NewProject.jsx` (Title, Domain, Desc) -> Clicks "Generate AI Blueprint" -> Show Loading State -> Saves project to `localStorage('projects')` -> Redirects to `Requirements.jsx` -> Views AI Blueprint (Mocked) -> Navigates to `ProjectDashboard.jsx` to view roadmap.

## 3. Profile Management Workflow
**Dashboard** -> Clicks "Profile" -> Loads `Profile.jsx` -> Populates from `localStorage` -> User toggles "Edit" -> Modifies fields -> Clicks "Save" -> Writes back to `localStorage`.

---

# Technology Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React, React Router.
- **Backend**: Node.js, Express.js (Stubbed).
- **Database**: MongoDB (Stubbed).
- **AI Framework**: CrewAI, Ollama (Planned).

---

# Security
- **Implemented**: None beyond basic client-side form validation.
- **Planned**: 
  - JWT token-based authentication.
  - Express rate-limiting and helmet middleware.
  - Password hashing (bcrypt) in the DB.
  - Sanitization of user input before sending to LLM.

---

# Scalability
- **Frontend**: Vite ensures fast builds. Component-driven architecture allows horizontal UI expansion.
- **Planned Backend**: Separating the Node.js API from the AI execution engine will be crucial. AI tasks (which are long-running) should ideally run in a background worker queue (e.g., Redis/Bull/Celery) rather than blocking HTTP requests.

---

# Missing Features
- **Backend API Server**: The Express server is entirely unwritten (only folders exist).
- **Database Connection**: MongoDB schemas and connection logic are missing.
- **Actual AI Generation**: The blueprint generated in `Requirements.jsx` is hardcoded UI layout. Real CrewAI integration is required.
- **Authentication Context**: `AuthContext.jsx` is empty. 

---

# Future Improvements
- **Milestone 2**: Build backend REST API and MongoDB integration. Migrate data persistence from `localStorage` to the database.
- **Milestone 3**: Develop CrewAI agents in Python or JS, containerize them, and expose them to the Node.js backend to generate actual dynamic blueprints.
- **Milestone 4**: Faculty dashboard for oversight, WebSockets for real-time AI Chat mentoring.

---

# Development Guidelines
- Always design components defensively, assuming data might not yet be loaded.
- Keep components modular. If a page gets too large (like `NewProject.jsx`), extract form groups into `src/components/project/`.
- Never commit real API keys or DB URIs.

---

# Coding Standards
- Use ES6+ syntax and hooks.
- Use `lucide-react` for all iconography to maintain aesthetic consistency.
- Stick to Tailwind utility classes; avoid raw CSS unless absolutely necessary (in `index.css`).
- Prettier and ESLint should be used (`eslint.config.js` exists).

---

# Installation Guide
1. Clone the repository.
2. Navigate to frontend: `cd frontend`
3. Install dependencies: `npm install`
4. *(Future)* Navigate to backend: `cd backend` and `npm install`

---

# Environment Setup
Currently, no environment variables are needed for the frontend.
*(Future)*:
Create a `.env` in `backend/` with:
```
PORT=5000
MONGO_URI=your_db_connection_string
JWT_SECRET=your_secret_key
LLM_API_KEY=your_key
```

---

# Running the Project
**Frontend**:
```bash
cd frontend
npm run dev
```
The app will run on `http://localhost:5173`.

**Backend** (Planned):
```bash
cd backend
npm run dev
```

---

# Contribution Workflow
1. Fork the repository.
2. Clone the fork locally.
3. Ensure you are on `main` and run `git pull`.
4. Create a feature branch: `git checkout -b feature/your-feature`.
5. Write code, following coding standards.
6. Commit changes: `git commit -m "Add your feature"`.
7. Push to your fork: `git push origin feature/your-feature`.
8. Create a Pull Request against the main repository.

---

# Git Branch Strategy
- `main`: Production-ready, stable code.
- `develop`: Integration branch for ongoing milestones.
- `feature/*`: Specific UI components or AI agents (e.g., `feature/idea-agent`).
- `bugfix/*`: Fixes for identified issues.

---

# Deployment
*(Status: Planned)*
- **Frontend**: Can be deployed seamlessly on Vercel or Netlify via Vite build (`npm run build`).
- **Backend/AI**: Should be containerized via Docker and deployed to platforms like AWS (EC2/ECS), Render, or DigitalOcean, ensuring the AI environment has necessary computing resources.

---

# Known Issues
- Page refreshes on routes like `/project-dashboard` without a project created will result in a "Loading..." screen indefinitely due to missing `localStorage` items.
- The `Login` validation strictly checks against the single most recently registered profile in `localStorage` rather than a list of users.

---

# Conclusion
The AI Academic Project Mentor is currently a well-structured frontend prototype demonstrating the user journey for Milestone 1. The React architecture is highly modular and prepared for integration with the upcoming backend and multi-agent AI services. By replacing the `localStorage` mocks with real API calls, the system will easily transition into a fully functional product.
