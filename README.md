# Complaint Management System

This project consists of a backend API and a frontend application.

## Database Architecture

The application uses a PostgreSQL database with the following schema:

```
┌─────────────────────────────────────┐
│              Complaints             │
├─────────────┬───────────────────────┤
│ int         │ complaint_id     [PK] │
│ varchar     │ customer_email        │
│ text        │ description           │
│ varchar     │ status                │
│ date        │ due_date              │
│ int         │ assigned_staff_id[FK] │
└─────────────┴───────────────────────┘
                        │
                        │ (Many-to-One)
                        ▼
┌─────────────────────────────────────┐
│               Staff                 │
├─────────────┬───────────────────────┤
│ int         │ staff_id         [PK] │
│ varchar     │ name                  │
│ varchar     │ email                 │
│ varchar     │ password_hash         │
│ timestamp   │ created_at            │
└─────────────┴───────────────────────┘
                        │
                        │ (One-to-Many)
                        ▼
┌─────────────────────────────────────┐
│               Notes                 │
├─────────────┬───────────────────────┤
│ int         │ note_id          [PK] │
│ text        │ content               │
│ timestamp   │ created_at            │
│ int         │ complaint_id     [FK] │
│ int         │ staff_id         [FK] │
└─────────────┴───────────────────────┘
```

**Relationships:**
- One Staff member can be assigned to many Complaints
- One Complaint can have many Notes
- One Staff member can create many Notes

## Backend Setup

### 1. Navigate to Backend Directory

```bash
cd backend
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/macOS:**
```bash
source venv/bin/activate
```

### 4. Install Requirements

```bash
pip install -r requirements.txt
```

### 5. Environment Configuration

Create a `.env` file in the `backend` directory with the following content:

```properties
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=complaint_db
DATABASE_URL="postgresql://postgres:password@localhost:5432/complaint_db"
```

### 6. Start Docker Services

```bash
docker-compose up -d --build
```

### 7. Generate Prisma Client

```bash
prisma generate
```

### 8. Deploy Database Tables

```bash
prisma db push
```

### 9. Run the Backend Application

```bash
python main.py
```

### 10. Create User for Frontend Login

To be able to login in the frontend, you need to create a user first:

1. Go to `http://localhost:8000/docs`
2. Navigate to the **Auth** section
3. Click on `/register`
4. Click **"Try it out"**
5. Paste the following JSON in the request body:

```json
{
  "email": "admin@gmail.com",
  "password": "123",
  "name": "Prueba"
}
```

6. Click **"Execute"**
7. The response should return status code **200**
---
## Frontend Setup

### 1. Navigate to Frontend Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm i
```

### 3. Environment Configuration

Create a `.env` file in the `frontend` directory with the following content:

```properties
NEXT_PUBLIC_API_URL="http://localhost:8000/apiv1"
```

### 4. Run the Frontend Application

```bash
npm run dev
```

### 5. Login
To be able to login, you must login with:
```
email: admin@gmail.com
password: 123
```

## Notes

- Make sure Docker is installed and running on your system
- Ensure PostgreSQL port 5432 is available
- Keep the virtual environment activated while running the backend
- The backend should be running before starting the frontend
- Use the created user credentials at the backend section to login in the frontend

## Technical Decisions & Trade-offs

### Navigation:
I used next/navigation for programmatic navigation in client components, and next/link for declarative links on pages that were already being rendered. Both are native to Next.js and designed to work with the App Router.

### Database:
I chose Prisma because it allows me to define models in a modular way, without the need to manually add new fields.

### Design:
While I would have liked to add more styling, my main focus is backend development, so I kept the UI relatively simple.

### Authentication:
Although authentication wasn't explicitly required, I implemented a basic login system. I consider login to be one of the most fundamental features to account for when building applications, especially from a security perspective.

Initially, I thought about removing it since it interfered with SSR.

However, I decided to keep it and resolve the issues because I believe its inclusion adds value, even if it wasn't part of the requirements.
