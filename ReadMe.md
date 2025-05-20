# Test Project Documentation

Welcome to the documentation for my test project! This document outlines the system design, database schema, API endpoints, and some thoughts on the frontend and integration. The goal is to provide a clear overview for anyone working on or reviewing this project.

---

## System Design

### 1. Database Design  
### 2. API Design  
### 3. Frontend Design  
### 4. REST API Integration with Frontend

---

## Database Design of the Project

### Entities in the Website

1. **Institute** – Represents the organization or school, which houses employees and manages subjects.
2. **Trainers** – Employees who teach subjects and topics.
3. **Subject** – The courses or subjects offered by the institute.
4. **Students** – The primary users who will interact with the system (not yet modeled in code).
5. **Topic** – Specific topics included within a subject.

### Table Design of Entities

#### 1. Subjects
- Institute ID (foreign key)
- Name
- ID

#### 2. Trainer
- Name
- Institute ID (foreign key)
- Email
- Password
- Salary
- Subject ID (foreign key)
- Topics (Array to store the topics)

---

## Deriving Relations in the Entities

- **Trainer → Subjects:** Many-to-Many (a trainer can teach multiple subjects, and a subject can have multiple trainers).  
  *Note: Currently, the model uses a one-to-many via `subject_id`, but this can be extended to true many-to-many with a join table if needed.*
- **Trainer → Institute:** Many-to-One (each trainer belongs to one institute).
- **Subject → Institute:** Many-to-One (each subject belongs to one institute).
- **Topic → Subject:** Many-to-One (each topic belongs to one subject).
- **Trainer → Topic:** Optional Many-to-One (a trainer may be assigned to a topic).

---

## API Design

Here are the main API requirements and their routes:

### 1. Add a New Trainer

- **Route:** `/api/v1/trainer/new`
- **Model:** `trainer.model.ts`
- **Required Data:** Name, email, password

### 2. Get the List of All Trainers

- **Route:** `/api/v1/trainer/all`
- **Role Required:** Admin
- **Model:** `trainer.model.ts`

### 3. Remove a Specific Trainer

- **Route (self-delete):** `/api/v1/trainer/delete`
- **Route (admin):** `/api/v1/trainer/delete/:id`
- **Note:** ID is required for admin deletion

### 4. Get Trainer by ID

- **Route:** `/api/v1/trainer/:id`
- **Model:** `trainer.model.ts`
- **Role Required:** Admin

### 5. Get Trainers by Subject

- **Route:** `/api/v1/trainer/:subject`
- **Model:** `subject.model.ts`
- **Role Required:** Trainer or Admin

### 6. Add a New Subject

- **Route:** `/api/v1/subject/new`
- **Model:** `subject.model.ts`
- **Role Required:** Admin

### 7. List All Subjects in an Institute

- **Route:** `/api/v1/institute/subject/:id`
- **Model:** `subject.model.ts`
- **Role Required:** Any

### 8. List Subjects with Trainers Teaching Each Topic

- **Route:** `/api/v1/subject/:id`
- **Models:** `subject.model.ts`, `trainer.model.ts`
- **Note:** Requires a join operation with the Trainer table
- **Role Required:** Any

---

## Frontend Design

The frontend is designed to be clean and intuitive, making it easy for both admins and trainers to use. Here are some of the main features:

- **Admin Dashboard:** Allows admins to manage institutes, trainers, and subjects.
- **Trainer Portal:** Trainers can view their assigned subjects and topics, and manage their profiles.
- **Student Interface:** (Planned for the future) Students will be able to browse subjects, topics, and trainers.

The frontend communicates with the backend using REST APIs, ensuring a smooth and responsive user experience.

---

## REST API Integration with Frontend

The frontend uses standard HTTP methods (GET, POST, DELETE, etc.) to interact with the backend. Authentication and role-based access control (RBAC) are planned to ensure data security and proper access levels for admins, trainers, and eventually students.

---

## Notes & Future Improvements

- **RBAC:** Implementing role-based access control is important for data security and abstraction.
- **Many-to-Many Relationships:** For trainers and subjects, a join table can be introduced for more flexibility in the future.
- **Student Entity:** The student model and related endpoints are planned for future development.
- **Testing:** Comprehensive unit and integration tests will be added to ensure reliability.

---

## Frontend Pages and Components

### Pages

1. **Registration Page for Trainer:** Allows new trainers to register.
2. **All Trainers Page:** Displays a list of all trainers.
3. **Trainer Profile Page:** Shows details for a specific trainer.
4. **Trainers by Subject Page:** Lets users view trainers for a specific subject.
5. **Add New Subject Page:** Admins can add new subjects.
6. **All Subjects Page:** Lists all subjects in the system.
7. **Subjects with Trainers and Topics Page:** Shows subjects along with the trainers teaching each topic.
8. **Home Page:** The landing page for the application.

### Components

1. **Navbar:** Provides easy navigation to all pages, so users don't have to enter routes manually.
2. *More components for the future*