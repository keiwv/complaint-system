# SkillUpLeader

This project consists of a backend API and a frontend application.

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

### 7. Run the Backend Application

```bash
python main.py
```

### 8. Create User for Frontend Login

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
