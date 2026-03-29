# FixThatError Backend System

Backend API for "FixThatError", an article-based error-fix website.

## Tech Stack
- Node.js
- Express.js
- MongoDB & Mongoose
- JWT Authentication

## Setup

1.  **Install Dependencies**
    ```bash
    cd backend
    npm install
    ```

2.  **Environment Variables**
    Create a `.env` file in the `backend` directory (copy from `.env` template if needed) and set your MongoDB URI and JWT Secret.
    ```env
    PORT=5000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

3.  **Seed Data** (Optional)
    Populate the database with an initial admin user and sample data.
    ```bash
    npm run seed
    ```
    *Default Admin:* `username: admin`, `password: password123`

4.  **Run Server**
    ```bash
    npm run dev
    ```
    Server will run on `http://localhost:5000`.

## API Endpoints

### Public APIs
- `GET /api/public/categories`: Get all visible categories
- `GET /api/public/errors`: Get all visible error articles
- `GET /api/public/errors/:slug`: Get single article
- `GET /api/public/pages/:slug`: Get single page

### Admin APIs (Require `Authorization: Bearer <token>`)
#### Auth
- `POST /api/auth/login`: Login as admin

#### Manage Categories
- `GET /api/categories`: Get all
- `POST /api/categories`: Create
- `PUT /api/categories/:id`: Update
- `DELETE /api/categories/:id`: Delete

#### Manage Articles
- `GET /api/articles`: Get all
- `POST /api/articles`: Create
- `PUT /api/articles/:id`: Update
- `DELETE /api/articles/:id`: Delete
- `POST /api/articles/bulk`: Upload CSV (Key: `file`)

#### Manage Pages
- `GET /api/pages`: Get all
- `POST /api/pages`: Create
- `PUT /api/pages/:id`: Update
- `DELETE /api/pages/:id`: Delete
