# Backend - E-Commerce Website (Node.js + Express + MySQL)

This is the backend for the MERN + MySQL E-Commerce project.  
It handles user authentication, product APIs, cart functionality, and payment logic (upcoming).

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL (with mysql2 package)
- JWT Authentication
- REST APIs
- Role-based access control
- Email/OTP support (coming soon)

---

## 🚀 How to Run

### 1. Install dependencies
```bash
npm install


2. Create .env file in backend root

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret


3. Start the server

npm run dev



📁 Folder Structure

backend/
├── config/
├── controllers/
├── models/
├── routes/
├── middlewares/
├── utils/
└── server.js


🔒 Notes

Make sure MySQL server is running.
Use tools like Postman to test API endpoints during development.


