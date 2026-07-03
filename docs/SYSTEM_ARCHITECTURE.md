# 🏛️ System Architecture

# AI Academic Project Mentor

**Version:** 1.0

---

# 1. Overview

AI Academic Project Mentor follows a modular, scalable Multi-Agent Architecture designed to guide students from project ideation to project implementation.

The system consists of five major layers:

- Presentation Layer
- Application Layer
- AI Layer
- Data Layer
- AI Model Layer

Each layer has clearly defined responsibilities, making the system modular, maintainable, and easy to extend.

---

# 2. High-Level Architecture

```
+---------------------------+
|     Student (User)        |
+---------------------------+
            │
            ▼
+---------------------------+
|   Presentation Layer      |
| (React Frontend)          |
+---------------------------+
            │
            ▼
+---------------------------+
|   Application Layer       |
| (Node.js + Express API)   |
+---------------------------+
            │
            ▼
+---------------------------+
|       AI Layer            |
|  AI Orchestrator          |
|  Multi-Agent Pipeline     |
|  Blueprint Assembly       |
+---------------------------+
            │
            ▼
+---------------------------+
|       Data Layer          |
|     MongoDB Database      |
+---------------------------+
            │
            ▼
+---------------------------+
|     AI Model Layer        |
|      Ollama + LLM         |
+---------------------------+
```

---

# 3. Architecture Layers

---

## 3.1 Presentation Layer

Technology

- React
- Vite

Responsibilities

- User Interface
- Student Registration
- Login
- Student Profile
- Skill Assessment
- Project Requirement Collection
- Project Dashboard
- Mentor Chat Interface

---

## 3.2 Application Layer

Technology

- Node.js
- Express.js

Responsibilities

- Authentication
- REST APIs
- Business Logic
- Session Management
- Request Validation
- Communication with AI Layer
- Communication with Database

---

## 3.3 AI Layer

The AI Layer is the intelligence of the application.

It consists of:

### AI Orchestrator

Responsibilities

- Receive student requests
- Decide workflow execution
- Invoke AI agents
- Manage agent communication
- Collect outputs
- Trigger Blueprint Assembly

---

### Core AI Agents

1. Idea Analyzer
2. Blueprint Generator
3. Technology Recommendation
4. Database Design
5. Roadmap Planner
6. Learning Coach
7. Academic Mentor

Each agent has a single responsibility.

---

### Blueprint Assembly Engine

The Blueprint Assembly Engine combines outputs from all specialized agents into a single structured Project Blueprint.

It is a system component, **not an AI agent**.

---

## 3.4 Data Layer

Technology

MongoDB

Responsibilities

Store

- User Accounts
- Student Profiles
- Skill Assessments
- Project Requirements
- Generated Blueprints
- Learning Roadmaps
- Chat History

---

## 3.5 AI Model Layer

Technology

Ollama

Responsibilities

- Execute LLM
- Generate AI responses
- Perform reasoning
- Understand prompts

CrewAI coordinates communication between the AI Orchestrator and the language model.

---

# 4. Request Flow

The application supports two workflows.

---

## Workflow 1 — Automatic Blueprint Generation

Student

↓

Register/Login

↓

Complete Profile

↓

Skill Assessment

↓

Project Requirements

↓

Submit Project Idea

↓

AI Orchestrator

↓

Idea Analyzer

↓

Blueprint Generator

↓

Technology Recommendation

↓

Database Design

↓

Roadmap Planner

↓

Learning Coach

↓

Blueprint Assembly

↓

Project Dashboard

---

## Workflow 2 — Continuous Mentoring

Student

↓

Project Dashboard

↓

Academic Mentor

↓

AI Orchestrator

↓

Required Specialized Agent(s)

↓

Academic Mentor

↓

Student

Unlike the initial workflow, only the relevant AI agent(s) are invoked based on the student's query.

---

# 5. Project Dashboard

The Project Dashboard acts as the central workspace for the student.

It provides access to:

- Project Blueprint
- Technology Stack
- Database Design
- Development Roadmap
- Learning Plan
- Mentor Chat

Future versions may include:

- Progress Tracking
- Project Files
- Documentation
- Presentation Generator

---

# 6. Design Principles

The architecture follows the following principles:

- Layered Architecture
- Modular Design
- Separation of Concerns
- Single Responsibility Principle
- Scalability
- Reusability
- Maintainability

---

# 7. Scalability

The architecture supports adding new AI agents without modifying existing components.

Future agents include:

- Feasibility Analyzer
- Architecture Designer
- Documentation Generator
- Presentation Advisor
- Code Reviewer
- Career Advisor
- Deployment Advisor

---

# 8. Future Enhancements

Future versions may support:

- Voice-to-Voice Conversations
- Document Upload
- Code Generation
- Real-Time Collaboration
- Cloud Deployment
- Multi-Language Support

---

# Version

Current Version: **v1.0**
