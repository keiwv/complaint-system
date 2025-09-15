# Backend

## Setup and Execution Instructions

### 1. Create Virtual Environment

```bash
python -m venv venv
```

### 2. Activate Virtual Environment

**Windows:**
```bash
venv\Scripts\activate
```

**Linux/macOS:**
```bash
source venv/bin/activate
```

### 3. Install Requirements

```bash
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory with the following content:

```properties
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
POSTGRES_DB=complaint_db
DATABASE_URL="postgresql://postgres:password@localhost:5432/complaint_db"
```

### 5. Start Docker Services

```bash
docker-compose up -d --build
```

### 6. Generate Prisma Client

```bash
prisma generate
```

### 7. Deploy Database Tables

```bash
prisma db push
```

### 8. Run the Application

```bash
python main.py
```

### 9. Create User for Frontend Login

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
  "name": "Test"
}
```

6. Click **"Execute"**
7. The response should return status code **200**

Now you can use these credentials to login in the frontend.

## Notes

- Make sure Docker is installed and running on your system
- Ensure PostgreSQL port 5432 is available
- Keep the virtual environment activated while running the application
