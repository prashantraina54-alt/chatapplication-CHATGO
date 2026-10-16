# ChatGo — Real-Time Chat Application

A full-stack real-time chat application built using the MERN stack and Socket.io. It supports secure authentication, real-time messaging, media uploads, and responsive UI.

---

## Features

* JWT-based authentication (login and registration)
* Real-time one-to-one messaging using Socket.io
* Online and offline user status
* Live typing indicators
* Image upload via Cloudinary
* Responsive design for mobile and desktop
* State management using Redux Toolkit

---

## Tech Stack

Frontend:

* React.js
* Redux Toolkit
* Tailwind CSS
* Vite

Backend:

* Node.js
* Express.js

Database:

* MongoDB (Mongoose)

Real-time Communication:

* Socket.io

Media Storage:

* Cloudinary

---

## Project Structure

```id="6flv3s"
chatapplication-CHATGO/
│
├── backend/
├── frontend/
└── README.md
```

---

## Installation and Setup

### 1. Clone the repository

```id="3h4m9h"
git clone https://github.com/prashantraina54-alt/chatapplication-CHATGO.git
cd chatapplication-CHATGO
```

---

### 2. Backend setup

```id="r2txxv"
cd backend
npm install
```

Create a `.env` file inside the backend folder:

```id="1y5j1r"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Run backend:

```id="e3gm9z"
npm run dev
```

---

### 3. Frontend setup

Open a new terminal:

```id="n7p4cm"
cd frontend
npm install
npm run dev
```

Frontend runs on:

```id="g9x0e8"
http://localhost:5173
```

Backend runs on:

```id="t4v6f2"
http://localhost:5000
```

---

## Environment Variables

* MONGO_URI: MongoDB connection string
* JWT_SECRET: Secret key for authentication
* CLOUDINARY credentials: Required for image upload

---

## Future Improvements

* Group chat functionality
* Message delivery and read status
* Notifications system
* File sharing support

---

## Author

Prashant Kumar

---

## License

This project is for educational purposes.
