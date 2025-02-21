To-Do List API with Authentication
A simple To-Do List API built with Node.js, Express.js, MongoDB, and JWT authentication. This API allows users to register, log in, and manage their to-do tasks (Create, Read, Update, Delete) securely.
---------------------------------------------------------------------------------------------------------------
🚀 Features
✅ User authentication (Register/Login) with JWT
✅ Secure password hashing using bcrypt
✅ CRUD operations for managing to-do tasks
✅ Mark tasks as completed and archive/delete them
✅ Express middleware for authentication & error handling
✅ Clean and structured RESTful API
---------------------------------------------------------------------------------------------------------------
📌 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB with Mongoose
Authentication: JWT (JSON Web Tokens), bcrypt
Middleware: express-async-handler, cookie-parser
---------------------------------------------------------------------------------------------------------------
🛠 Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/Mohamed-Waliid/To-do-list.git
cd todo-api

2️⃣ Install Dependencies
npm install

3️⃣ Set Up Environment Variables
Create a .env file in the root directory and add:
PORT= your Port number
MONGO_URI= your_mongodb_connection_string
JWT_SECRET= your_secret_key
CORS= your_cors

4️⃣ Start the Server
npm start
---------------------------------------------------------------------------------------------------------------
🔑 API Endpoints

Auth Routes:
Method	                Endpoint	                 Description	                          Auth Required
POST	                /auth/register	             Register a new user	                  ❌ No
POST	                /auth/login	                 Login user & get JWT	                  ❌ No
POST	                /auth/logout	             Logout & clear token	                  ✅ Yes

To-Do Routes:
Method	                Endpoint	                 Description	                          Auth Required
GET	                    /todo	                     Get all user’s to-dos	                  ✅ Yes
POST	                /todo/create	             Create a new to-do	                      ✅ Yes
PUT	                    /todo/:id	                 Update a to-do by ID	                  ✅ Yes
PUT	                    /todo/:id/complete	         Mark as completed	                      ✅ Yes
DELETE	                /todo/:id	                 Delete a to-do by ID	                  ✅ Yes
---------------------------------------------------------------------------------------------------------------
📌 Example Request: Create a To-Do

POST /todo/create
Headers:
  Authorization: Bearer <your_token>
  
Body:
{
  "title": "Learn Express.js",
  "description": "Understand routing, middleware, and error handling."
}
---------------------------------------------------------------------------------------------------------------
🛡 Security Best Practices
✅ Use environment variables for sensitive data such as (JWT_SECRET, MONGO_URI)
✅ Hash passwords before storing them using bcrypt
✅ Validate input data before saving to the database
✅ Use JWT for authentication and protect routes with middleware

