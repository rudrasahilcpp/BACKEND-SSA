# BackendSSA

A robust, production-ready backend API built with **Node.js**, **Express**, and **MongoDB** (Mongoose). Designed for real-world applications, this project demonstrates advanced backend engineering concepts, security best practices, and scalable architecture—ideal for showcasing your skills to recruiters and landing a backend developer role or internship.

---

## 🚀 Features & Highlights

- **User Authentication & Authorization**
  - Secure JWT-based authentication (stateless sessions)
  - Password hashing with bcrypt (industry standard)
  - Protected routes and role-based access
- **RESTful API Design**
  - Modular route/controller structure
  - CRUD operations for users, contacts, and alerts
- **Alert System**
  - Send alerts to specific contacts or all contacts
  - Location-aware alerts (latitude/longitude support)
  - Alert status management (active/resolved)
- **Contact Management**
  - User-specific contact lists
  - Secure CRUD operations with ownership checks
- **Profile Management**
  - Secure user profile retrieval (no password exposure)
- **Security Best Practices**
  - Environment variable management with dotenv
  - Input validation and error handling
  - JWT secret and DB credentials never hardcoded
- **Scalable & Maintainable Codebase**
  - MVC architecture (Models, Controllers, Routes)
  - Modular middleware for authentication
  - Clean, readable code with comments

---

## 🛠️ Tech Stack

- **Node.js** (ES Modules)
- **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **bcrypt** for password security
- **dotenv** for environment management

---

## 📦 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd BACKEND-SSA
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Configure environment variables:**
   Create a `.env` file in the root directory:
   ```env
   CONNECTION_STRING=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```
4. **Start the server:**
   ```bash
   node server.js
   ```
   The server runs on [http://localhost:3000](http://localhost:3000)

---

## 🔒 API Endpoints

### User
- `POST /api/user/register` — Register a new user
- `POST /api/user/login` — Login and receive JWT
- `GET /api/user/profile` — Get user profile (JWT required)

### Contact (JWT required)
- `GET /api/contact/` — List all contacts
- `POST /api/contact/` — Create a new contact
- `PUT /api/contact/` — Update a contact (stub)
- `DELETE /api/contact/:id` — Delete a contact

### Alert (JWT required)
- `GET /api/alert/` — Get all alerts for user or contacts
- `POST /api/alert/` — Create a new alert (with optional location)
- `PUT /api/alert/:id` — Update alert status

---

## 🧠 Advanced Concepts & Why Recruiters Will Love This

- **JWT Authentication:** Secure, stateless, scalable session management.
- **Password Hashing:** bcrypt with salt for strong password security.
- **Ownership & Authorization:** Only owners can modify/delete their contacts/alerts.
- **Location-aware Alerts:** Demonstrates geospatial data handling.
- **MVC Structure:** Clean separation of concerns for maintainability.
- **Error Handling:** Consistent, informative error responses.
- **Environment Security:** No secrets in code, all sensitive data in `.env`.
- **Scalability:** Easily extendable for new features (e.g., roles, notifications).

---

## 📚 File Structure

```
BACKEND-SSA/
├── config/            # DB connection logic
├── controllers/       # Business logic for each resource
├── middleware/        # Auth middleware (JWT)
├── models/            # Mongoose schemas
├── routes/            # Express route definitions
├── server.js          # App entry point
├── .env               # Environment variables (not committed)
```

---

## 📝 Example .env

```
CONNECTION_STRING=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

---

## 📬 Contact
Feel free to reach out if you have questions or want to collaborate! 
