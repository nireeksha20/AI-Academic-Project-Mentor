# 🗄️ Database Design

# AI Academic Project Mentor

**Version:** 1.0

---

# 1. Overview

AI Academic Project Mentor uses **MongoDB**, a NoSQL document-oriented database, to store user information, project data, AI-generated outputs, and mentoring conversations.

The database follows MongoDB best practices by embedding one-to-one relationships and referencing one-to-many relationships.

---

# 2. Database Collections

The system contains **three primary collections**:

- Users
- Projects
- Chats

This design keeps the database simple, scalable, and aligned with the Multi-Agent Architecture.

---

# 3. Collection Design

## 3.1 Users Collection

Stores authentication information along with the student's profile and skill assessment.

### Fields

- \_id
- name
- email
- password

### Embedded Profile

- college
- department
- year
- skills[]
- interests[]

### Embedded Skill Assessment

- programmingKnowledge
- frameworkExperience
- aiKnowledge
- confidenceLevel
- completedAt

### Metadata

- createdAt
- updatedAt

---

## 3.2 Projects Collection

Stores all information related to a student's project.

Each project belongs to one user.

### Fields

- \_id
- userId
- title
- idea

### Embedded Requirements

- category
- preferredTech
- projectType
- expectedDuration
- teamSize
- additionalRequirements

### AI Generated Outputs

- blueprint
- technologyRecommendation
- databaseDesign
- roadmap
- learningPlan

### Project Status

- status
- createdAt
- updatedAt

---

## 3.3 Chats Collection

Stores conversation history between the student and the Academic Mentor.

### Fields

- \_id
- projectId
- userId
- sender
- message
- timestamp

---

# 4. Collection Relationships

```
Users (1)
     │
     │
     ├───────────────┐
     │               │
     ▼               ▼
Projects (Many)   Chats (Many)
     │
     │
     ▼
Project Dashboard
```

---

# 5. AI Data Ownership

Each specialized AI agent is responsible for generating and updating a specific section of the Project document.

| AI Agent                        | Updates                   |
| ------------------------------- | ------------------------- |
| Idea Analyzer                   | Project Idea Context      |
| Blueprint Generator             | Blueprint                 |
| Technology Recommendation Agent | Technology Recommendation |
| Database Design Agent           | Database Design           |
| Roadmap Planning Agent          | Roadmap                   |
| Learning Coach Agent            | Learning Plan             |
| Academic Mentor Agent           | Chat History              |

---

# 6. Project Dashboard

The Project Dashboard is **not a separate database collection**.

It is a user interface that displays information stored inside the Project document.

The dashboard includes:

- Project Blueprint
- Technology Recommendation
- Database Design
- Development Roadmap
- Learning Plan
- Mentor Chat

---

# 7. Design Decisions

### Embedded Documents

The following data is embedded because it has a one-to-one relationship with the user:

- Profile
- Skill Assessment

### Referenced Documents

The following data is stored separately because one user can have multiple projects and conversations:

- Projects
- Chats

This approach reduces database lookups while maintaining scalability.

---

# 8. Future Enhancements

Future versions may include:

- File Uploads
- Project Version History
- Team Collaboration
- Notifications
- Documentation Versions
- Presentation History

---

# Version

Current Version: **v1.0**
