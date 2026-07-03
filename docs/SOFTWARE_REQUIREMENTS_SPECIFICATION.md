# 📄 Software Requirements Specification (SRS)

# AI Academic Project Mentor

**Version:** 1.0

**Project Type:** Multi-Agent AI Academic Mentoring Platform

---

# 1. Introduction

## 1.1 Purpose

The purpose of AI Academic Project Mentor is to assist students in transforming software project ideas into structured implementation plans using a collaborative Multi-Agent AI system.

The platform automatically analyzes project ideas, generates a project blueprint, recommends suitable technologies, designs databases, creates implementation roadmaps, and provides continuous mentoring throughout the software development lifecycle.

---

## 1.2 Scope

The system provides:

- Student Registration & Login
- Student Profile Management
- Skill Assessment
- Project Requirement Collection
- Project Idea Submission
- Automatic Multi-Agent Blueprint Generation
- Continuous AI Mentoring
- Project Dashboard

The system supports both text and voice interactions.

---

## 1.3 Intended Users

Primary Users

- Engineering Students
- College Students
- Beginners in Software Development
- Academic Project Teams

Future Users

- Faculty Mentors
- Educational Institutions
- Hackathon Participants

---

# 2. System Overview

The application consists of:

- Web Frontend
- Backend API
- MongoDB Database
- CrewAI Multi-Agent System
- Ollama LLM
- Voice Processing Module (Future Enhancement)

---

# 3. Functional Requirements

## FR-1 User Authentication

The system shall allow users to:

- Register
- Login
- Logout

---

## FR-2 Student Profile

The system shall allow users to:

- Edit Profile
- Save Skills
- Save Interests
- Save Academic Information

---

## FR-3 Skill Assessment

The system shall provide a questionnaire to determine the student's:

- Programming Knowledge
- Framework Experience
- AI Knowledge
- Confidence Level

---

## FR-4 Requirement Collection

The system shall collect:

- Project Category
- Project Goals
- Preferred Technologies
- Additional Requirements

---

## FR-5 Project Idea Submission

The student shall submit a project idea using:

- Text
- Voice (Future)

---

## FR-6 Automatic Multi-Agent Pipeline

After project submission, the system shall automatically execute:

1. Idea Analyzer
2. Blueprint Generator
3. Technology Advisor
4. Database Designer
5. Roadmap Planner
6. Learning Coach

The outputs from these agents shall be merged into a single Project Blueprint.

---

## FR-7 Project Dashboard

The dashboard shall display:

- Blueprint
- Technology Stack
- Database Design
- Roadmap
- Learning Plan

---

## FR-8 Academic Mentor

The system shall provide continuous mentoring after blueprint generation.

Students can ask project-related questions at any time.

The AI Orchestrator will intelligently invoke the appropriate specialized agent(s) based on the student's query instead of always executing the full pipeline.

---

# 4. Non-Functional Requirements

## Performance

- Fast response time
- Efficient agent execution

---

## Security

- Secure Authentication
- JWT Authorization
- Protected User Data

---

## Scalability

The architecture shall support adding new AI agents without modifying the existing pipeline.

---

## Availability

The application should remain available during normal usage.

---

## Maintainability

Each AI agent shall have a single responsibility.

---

## Usability

The interface should be beginner-friendly and responsive.

---

# 5. User Workflow

```
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

Automatic Multi-Agent Pipeline

↓

Project Blueprint

↓

Project Dashboard

↓

Continuous AI Mentoring
```

---

# 6. AI Workflow

## Initial Blueprint Generation

The AI Orchestrator executes the complete pipeline.

```
Idea Analyzer

↓

Blueprint Generator

↓

Technology Advisor

↓

Database Designer

↓

Roadmap Planner

↓

Learning Coach

↓

Blueprint Assembly

↓

Academic Mentor
```

---

## Continuous Mentoring

The AI Orchestrator dynamically selects only the required specialized agent(s) based on the student's query.

Examples:

- Technology questions → Technology Advisor
- Database questions → Database Designer
- Learning guidance → Learning Coach

---

# 7. Project Modules

## Authentication Module

- Register
- Login

---

## Student Module

- Profile
- Skill Assessment

---

## Project Module

- Requirement Collection
- Idea Submission
- Dashboard

---

## AI Module

- AI Orchestrator
- Multi-Agent Pipeline
- Academic Mentor

---

# 8. Assumptions

- Users have internet access.
- Users provide sufficient project details.
- Ollama is available for local AI execution during development.

---

# 9. Constraints

- Voice support may be implemented in a later milestone.
- Initial implementation focuses on the core 7-agent architecture.
- Some advanced AI capabilities may depend on available hardware.

---

# 10. Success Criteria

The project will be considered successful if it can:

- Register and authenticate students.
- Generate a complete project blueprint from a project idea.
- Recommend technologies.
- Produce database suggestions.
- Create an implementation roadmap.
- Provide continuous AI mentoring.
- Demonstrate a functional Level-1 Multi-Agent workflow.

---

# 11. Future Scope

Future versions may include:

- Feasibility Analysis
- Architecture Generator
- Documentation Generator
- Presentation Assistant
- Code Review
- Career Mentor
- Deployment Advisor
- Voice-to-Voice AI Conversation

---

# Version

Current Version: **v1.0**
